create table if not exists public.loans (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null references auth.users(id) on delete cascade,
	principal numeric not null,
	interest_rate numeric not null,
	term_months integer not null,
	monthly_payment numeric not null,
	total_interest numeric not null,
	total_repayment numeric not null,
	created_at timestamptz not null default now()
);

create table if not exists public.profiles (
	id uuid primary key references auth.users(id) on delete cascade,
	email text,
	full_name text,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
	on public.profiles for select
	using ((select auth.uid()) = id);

drop policy if exists "Users can create their own profile" on public.profiles;
create policy "Users can create their own profile"
	on public.profiles for insert
	with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
	on public.profiles for update
	using ((select auth.uid()) = id)
	with check ((select auth.uid()) = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
	insert into public.profiles (id, email)
	values (new.id, new.email)
	on conflict (id) do nothing;
	return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
	after insert on auth.users
	for each row execute procedure public.handle_new_user();

alter table public.loans add column if not exists interest_rate numeric not null default 0;
alter table public.loans add column if not exists principal numeric not null default 0;
alter table public.loans add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table public.loans add column if not exists term_months integer not null default 0;
alter table public.loans add column if not exists monthly_payment numeric not null default 0;
alter table public.loans add column if not exists total_interest numeric not null default 0;
alter table public.loans add column if not exists total_repayment numeric not null default 0;
alter table public.loans add column if not exists created_at timestamptz not null default now();

alter table public.loans enable row level security;

drop policy if exists "Users can view their own loans" on public.loans;
create policy "Users can view their own loans"
	on public.loans for select
	using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own loans" on public.loans;
create policy "Users can create their own loans"
	on public.loans for insert
	with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own loans" on public.loans;
create policy "Users can delete their own loans"
	on public.loans for delete
	using ((select auth.uid()) = user_id);
