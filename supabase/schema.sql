-- Enable UUID generator if not available
create extension if not exists pgcrypto;

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) > 0),
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_todos_user_created_at
  on public.todos (user_id, created_at desc);

alter table public.todos enable row level security;

drop policy if exists "Users can read own todos" on public.todos;
create policy "Users can read own todos"
  on public.todos
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own todos" on public.todos;
create policy "Users can insert own todos"
  on public.todos
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own todos" on public.todos;
create policy "Users can update own todos"
  on public.todos
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own todos" on public.todos;
create policy "Users can delete own todos"
  on public.todos
  for delete
  using (auth.uid() = user_id);
