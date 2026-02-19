# Flappy Bird Clone

A modern, responsive clone of the classic Flappy Bird game built with React, TypeScript, and Tailwind CSS. This project features user authentication, persistent high scores, and a customizable profile system using Supabase.

![Flappy Bird Preview](https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/og.jpg) <!-- Replace with actual screenshot if available -->

## Features

- **Classic Gameplay**: faithful recreation of the original mechanics.
- **User Authentication**: Sign up and login to save your progress.
- **Global Leaderboard**: Compete with other players for the highest score.
- **User Profiles**: Customize your profile with an avatar.
- **Responsive Design**: Playable on desktop and mobile devices.
- **Dark/Light Mode**: (If applicable, or remove).

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase (Auth & Database)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/flappy-bird-clone.git
   cd flappy-bird-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Database Setup

Run the following SQL in your Supabase SQL Editor to set up the necessary tables:

```sql
-- Create profiles table
create table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  avatar_url text,
  high_score integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy this app is to use [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Go to Vercel and sign up/login.
3. Click **"Add New..."** -> **"Project"**.
4. Import your GitHub repository.
5. In the **"Environment Variables"** section, add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6. Click **"Deploy"**.

Your game will be live in minutes!

### Docker (Optional)

If you prefer to containerize the application, you can use the provided functionality. _Note: For a static frontend app like this, Docker is usually overkill compared to Vercel/Netlify._

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
