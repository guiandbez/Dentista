-- Execute no SQL Editor do Supabase.
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null default '',
 phone text default '',
 email text default '',
 role text not null default 'client' check (role in ('client','admin')),
 created_at timestamptz not null default now()
);

create table if not exists public.procedures (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 description text default '',
 price numeric(10,2) not null,
 active boolean not null default true
);

create table if not exists public.appointments (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 date date not null,
 time time not null,
 status text not null default 'pending' check(status in ('pending','confirmed','cancelled','completed')),
 total numeric(10,2) not null default 0,
 clinic_message text,
 created_at timestamptz not null default now()
);

create table if not exists public.appointment_items (
 id uuid primary key default gen_random_uuid(),
 appointment_id uuid not null references public.appointments(id) on delete cascade,
 procedure_id uuid references public.procedures(id),
 procedure_name text not null,
 price numeric(10,2) not null
);

alter table public.profiles enable row level security;
alter table public.procedures enable row level security;
alter table public.appointments enable row level security;
alter table public.appointment_items enable row level security;

create policy "profiles own read" on public.profiles for select using (auth.uid()=id or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
create policy "profiles own insert" on public.profiles for insert with check (auth.uid()=id);
create policy "profiles own update" on public.profiles for update using (auth.uid()=id or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));

create policy "procedures public read" on public.procedures for select using (active=true or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
create policy "procedures admin write" on public.procedures for all using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));

create policy "appointments client read" on public.appointments for select using (user_id=auth.uid() or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
create policy "appointments client insert" on public.appointments for insert with check (user_id=auth.uid());
create policy "appointments admin update" on public.appointments for update using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));

create policy "items client read" on public.appointment_items for select using (
 exists(select 1 from public.appointments a where a.id=appointment_id and (a.user_id=auth.uid() or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')))
);
create policy "items client insert" on public.appointment_items for insert with check (
 exists(select 1 from public.appointments a where a.id=appointment_id and a.user_id=auth.uid())
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
 insert into public.profiles(id,full_name,phone,email,role)
 values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),coalesce(new.raw_user_meta_data->>'phone',''),new.email,'client')
 on conflict(id) do update set full_name=excluded.full_name,phone=excluded.phone,email=excluded.email;
 return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

insert into public.procedures(name,description,price) values
('Avaliação odontológica','Consulta inicial e plano de tratamento',150),
('Limpeza dental','Profilaxia e orientação de higiene',180),
('Clareamento','Avaliação + planejamento do clareamento',900),
('Restauração','Restauração estética em resina',280),
on conflict do nothing;

-- Depois de criar a conta da dentista no site, transforme-a em administradora:
-- update public.profiles set role='admin' where email='EMAIL_DA_DENTISTA';
