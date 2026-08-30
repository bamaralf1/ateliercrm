import { semCredenciais } from './secure-storage';

/** Cliente REST mínimo. A chave publicável pode ficar no frontend; a secret key nunca. */
export class RemoteSync {
  constructor(private dataStore: any) {}

  private get config() { return this.dataStore.dados.config || {}; }
  configurado() { return Boolean(this.config.supabaseUrl && this.config.supabasePublishableKey); }
  private headers() {
    const key = this.config.supabasePublishableKey || '';
    const token = this.config.syncSupabaseAccessToken || key;
    return { apikey: key, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  }

  async salvarSnapshot(): Promise<void> {
    if (!this.configurado() || !this.config.syncSupabaseUserId) throw new Error('Entre na sincronização remota antes de enviar dados.');
    const url = `${this.config.supabaseUrl.replace(/\/$/, '')}/rest/v1/crm_snapshots?on_conflict=user_id`;
    const res = await fetch(url, { method: 'POST', headers: { ...this.headers(), Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ user_id: this.config.syncSupabaseUserId, payload: semCredenciais(this.dataStore.dados), updated_at: new Date().toISOString() }) });
    if (!res.ok) throw new Error(`Sincronização remota falhou (${res.status}).`);
  }

  async carregarPortal(token: string): Promise<any> {
    if (!this.configurado()) throw new Error('Portal remoto não configurado pelo artista.');
    const url = `${this.config.supabaseUrl.replace(/\/$/, '')}/functions/v1/public-portal?token=${encodeURIComponent(token)}`;
    const res = await fetch(url, { headers: this.headers() });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || 'Link inválido ou expirado.');
    return body;
  }
}
