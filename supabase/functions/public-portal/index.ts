// Deploy with: supabase functions deploy public-portal
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY stay only in this Edge Function.
import { createClient } from 'npm:@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Content-Type': 'application/json',
};
const hash = async (value: string) => {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
};

Deno.serve(async request => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const token = new URL(request.url).searchParams.get('token') || '';
  if (!/^[A-Za-z0-9_-]{32,}$/.test(token)) return new Response(JSON.stringify({ error: 'Link inválido.' }), { status: 400, headers: cors });
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data, error } = await admin.from('client_portals')
    .select('id, public_payload, expires_at, active, accepted_at')
    .eq('token_hash', await hash(token)).maybeSingle();
  if (error || !data || !data.active || new Date(data.expires_at) < new Date()) {
    return new Response(JSON.stringify({ error: 'Link inválido ou expirado.' }), { status: 404, headers: cors });
  }
  if (request.method === 'POST') {
    const { data: updated } = await admin.from('client_portals').update({ accepted_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', data.id).select('accepted_at').single();
    return new Response(JSON.stringify({ portal: data.public_payload, acceptedAt: updated?.accepted_at || data.accepted_at }), { headers: cors });
  }
  return new Response(JSON.stringify({ portal: data.public_payload, acceptedAt: data.accepted_at }), { headers: cors });
});
