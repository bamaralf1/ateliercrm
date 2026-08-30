-- Atelier CRM: dados privados do artista e portais públicos de prazo limitado.
-- Aplique esta migration pelo Supabase CLI/SQL Editor; nunca exponha uma secret key no navegador.
create table if not exists public.crm_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.crm_snapshots enable row level security;
revoke all on public.crm_snapshots from anon, authenticated;
grant select, insert, update, delete on public.crm_snapshots to authenticated;

create policy "Artist reads own snapshot" on public.crm_snapshots for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Artist creates own snapshot" on public.crm_snapshots for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Artist updates own snapshot" on public.crm_snapshots for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Artist deletes own snapshot" on public.crm_snapshots for delete to authenticated
  using ((select auth.uid()) = user_id);

create table if not exists public.client_portals (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references auth.users(id) on delete cascade,
  token_hash text not null unique,
  public_payload jsonb not null,
  active boolean not null default true,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_portals_artist_id_idx on public.client_portals (artist_id);
create index if not exists client_portals_expires_at_idx on public.client_portals (expires_at);
alter table public.client_portals enable row level security;
revoke all on public.client_portals from anon, authenticated;
grant select, insert, update, delete on public.client_portals to authenticated;
create policy "Artist manages own portals" on public.client_portals for select to authenticated
  using ((select auth.uid()) = artist_id);
create policy "Artist creates own portals" on public.client_portals for insert to authenticated
  with check ((select auth.uid()) = artist_id);
create policy "Artist updates own portals" on public.client_portals for update to authenticated
  using ((select auth.uid()) = artist_id) with check ((select auth.uid()) = artist_id);
create policy "Artist deletes own portals" on public.client_portals for delete to authenticated
  using ((select auth.uid()) = artist_id);
