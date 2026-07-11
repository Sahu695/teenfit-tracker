# Teenfit Tracker — setup guide

This is a real, working Next.js project. Follow these steps in order in VS Code.

## 1. Create your project and copy these files in

```bash
npx create-next-app@latest teenfit-tracker
```

Answer the prompts: TypeScript = Yes, Tailwind = your choice (this app doesn't
use it, plain inline styles are used throughout), App Router = Yes, `src/`
directory = No (these files assume no `src/` folder), import alias = keep the
default `@/*`.

Then copy every file from this folder into your new `teenfit-tracker` project,
keeping the same folder structure (so `app/dashboard/page.tsx` stays at
`app/dashboard/page.tsx`, etc). Overwrite the default `app/page.tsx`,
`app/layout.tsx`, and `app/globals.css` that `create-next-app` generated.

## 2. Install dependencies

```bash
cd teenfit-tracker
npm install @supabase/supabase-js @supabase/ssr lucide-react recharts
```

## 3. Set up Supabase

You already have a project called "TeenFit Tracker" in Supabase.

1. Open it, go to the **SQL Editor**, paste in the contents of `supabase/schema.sql`
   from this folder, and run it. This creates your `profiles` and `weight_logs`
   tables with privacy rules (Row Level Security) so users can only ever see
   their own data.
2. Go to **Settings → API Keys**. Copy your **Project URL**, your
   **publishable** key (or `anon` key if you're on the legacy tab), and your
   **secret** key (or `service_role` key if legacy).
3. Go to **Authentication → URL Configuration** and make sure your site URL
   and redirect URLs are set (for local dev, `http://localhost:3000` works;
   you'll add your live Vercel URL here later too).

## 4. Set up your local environment file

Copy `.env.local.example` to a new file called `.env.local` in your project
root, and fill in the values you just copied from Supabase. Also add an
Anthropic API key (from console.anthropic.com) for the AI coach feature.

`.env.local` should never be committed to GitHub — `create-next-app` already
adds it to `.gitignore` by default, but it's worth double-checking.

## 5. Run it locally

```bash
npm run dev
```

Open `http://localhost:3000`. You should be redirected to `/login`. Click
"Sign up", create an account with your email, check your email for the
confirmation link (Supabase sends this automatically), click it, and you
should land on your dashboard.

## 6. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
```

Create a new repository on github.com (don't initialize it with a README —
you already have one), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/teenfit-tracker.git
git branch -M main
git push -u origin main
```

## 7. Deploy on Vercel

1. Go to vercel.com, sign up/log in with your GitHub account (this is free).
2. Click "Add New Project", select your `teenfit-tracker` repo.
3. Before deploying, add your environment variables: click "Environment
   Variables" and add the same four values from your `.env.local` file
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
   `SUPABASE_SECRET_KEY`, `ANTHROPIC_API_KEY`).
4. Click Deploy. After a minute or two you'll get a live URL like
   `teenfit-tracker.vercel.app`.
5. Go back to Supabase → Authentication → URL Configuration, and add your new
   Vercel URL to the allowed redirect URLs (otherwise email confirmation
   links won't work in production).

Your app is now live and anyone can sign up and use it. Every future
`git push` to your `main` branch automatically redeploys it.

## What's different from the prototype

- Real accounts, not a fake login screen — Supabase handles signup, login,
  and email confirmation.
- Real data — workout selection and weight logs are saved to Postgres, not
  just kept in memory.
- The AI coach calls a secure server route (`app/api/coach/route.ts`) instead
  of calling Anthropic directly from the browser, so your API key is never
  exposed.
- Row Level Security in `supabase/schema.sql` makes sure each user can only
  ever read or write their own rows — this is what makes the "private to each
  user" requirement actually real, not just a UI illusion.

## If something breaks

- **"Invalid API key" from Supabase**: double check you copied the
  publishable/anon key, not the secret/service_role key, into the
  `NEXT_PUBLIC_` variable.
- **Stuck on a redirect loop to /login**: usually means the email wasn't
  confirmed yet, or the Supabase URL Configuration doesn't include your
  current URL (localhost or Vercel) in the allowed redirect list.
- **AI coach says "offline"**: check that `ANTHROPIC_API_KEY` is set correctly
  in both `.env.local` (for local dev) and Vercel's environment variables
  (for production) — these are separate and don't share automatically.
