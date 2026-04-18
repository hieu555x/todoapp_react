# Cài Đặt & Hướng Dẫn

## Yêu Cầu Cấu Hình Supabase

### 1. Tạo Dự Án Supabase

1. Truy cập [supabase.com](https://supabase.com)
2. Tạo dự án mới
3. Lấy thông tin:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` hoặc `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### 2. Tạo Schema Database

Chạy SQL sau trong Supabase SQL Editor:

```sql
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
```

### 3. Cấu Hình Biến Môi Trường

Tạo file `.env.local` trong thư mục gốc:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

Hoặc sử dụng:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Cài Đặt Dependencies

```bash
npm install
```

### 5. Chạy Ứng Dụng

```bash
npm start
```

## Các Tính Năng

✅ **Đăng Ký & Đăng Nhập** - Xác thực qua Supabase Auth  
✅ **Quản Lý Todo** - Tạo, cập nhật, xóa công việc  
✅ **Phân Loại Todo** - Lọc (Tất cả, Đang làm, Hoàn thành)  
✅ **Giao Diện Material You** - Hỗ trợ Dark/Light theme  
✅ **Quản Lý Phiên Đăng Nhập** - Đăng xuất từ Todo Screen

## Cấu Trúc Ứng Dụng

```
src/
├── data/
│   ├── container/          # Dependency Injection
│   └── repositories/       # Supabase Integration
├── domain/
│   ├── entities/           # Data Models
│   ├── repositories/       # Repository Interfaces
│   └── usecases/           # Business Logic
├── infrastructure/
│   └── supabase/           # Supabase Client
└── presentation/
    ├── hooks/              # View Models
    ├── screens/            # UI Screens
    └── theme/              # Material You Theme
```
