-- ================================
--  CATEGORIES
-- ================================
insert into
  public.categories (name)
values
  ('Food'),
  ('Clothes'),
  ('Books'),
  ('Furniture'),
  ('Electronics') on conflict (name) do nothing;