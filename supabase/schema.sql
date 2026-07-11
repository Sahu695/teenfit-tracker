-- Run this in the Supabase SQL Editor (your "TeenFit Tracker" project)
-- This sets up: a profile per user, weight log history, and privacy rules
-- so every user can only ever see their own data.

-- One row per user, holding app state that isn't a list (streak, selected plan, units)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null default 'Athlete',
  units text not null default 'lb' check (units in ('lb', 'kg')),
  streak int not null default 0,
  last_workout_date date,
  selected_plan_id text,
  selected_plan_location text check (selected_plan_location in ('gym', 'home')),
  created_at timestamptz not null default now()
);

-- One row per weight entry, many per user
create table if not exists weight_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  weight numeric not null check (weight > 0),
  logged_at date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists weight_logs_user_id_idx on weight_logs (user_id, logged_at);

-- Turn on Row Level Security -- without this, RLS is OFF and any row is
-- readable/writable by anyone with the anon key, which is not what we want.
alter table profiles enable row level security;
alter table weight_logs enable row level security;

-- A user may only see/edit their OWN profile row
drop policy if exists "Users manage their own profile" on profiles;
create policy "Users manage their own profile"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- A user may only see/edit their OWN weight log rows
drop policy if exists "Users manage their own weight logs" on weight_logs;
create policy "Users manage their own weight logs"
  on weight_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Automatically create a profile row whenever someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'Athlete'));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
