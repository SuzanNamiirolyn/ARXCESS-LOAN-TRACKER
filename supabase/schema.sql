create table public.loans (
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

alter table public.loans enable row level security;

create policy "Users can view their own loans"
	on public.loans for select
	using ((select auth.uid()) = user_id);

create policy "Users can create their own loans"
	on public.loans for insert
	with check ((select auth.uid()) = user_id);

create policy "Users can delete their own loans"
	on public.loans for delete
	using ((select auth.uid()) = user_id);
