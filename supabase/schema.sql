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

alter table public.loans add column if not exists interest_rate numeric not null default 0;
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
