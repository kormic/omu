-- USERS TABLE (Profiles)
create table public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    name text not null,
    role text check (role in ('giver', 'taker')) not null,
    created_at timestamp default now()
);

-- CATEGORIES TABLE
create table public.categories (
    id serial primary key,
    name text unique not null
);

-- DONATIONS TABLE
create table public.donations (
    id uuid primary key default gen_random_uuid(),
    giver_id uuid references public.users(id) on delete cascade,
    title text not null,
    description text,
    category_id int references public.categories(id),
    location_name text,
    latitude double precision,
    longitude double precision,
    image_url text,
    is_available boolean default true,
    created_at timestamp default now()
);
