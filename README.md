# Raffie Portfolio CMS

Full-stack portfolio website and editable admin CMS for Raffie Arfa Nugraha.

## Setup Steps

1. Clone repo and install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
3. Fill all values in `.env.local`.
4. Supabase setup:
   - Create a project at https://supabase.com
   - Open `Settings -> Database -> URI`
   - Copy URI into `DATABASE_URL`
5. Cloudinary setup:
   - Create account at https://cloudinary.com
   - Copy `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`
6. Push schema to Supabase:
   ```bash
   npx prisma db push
   ```
7. Seed initial data:
   ```bash
   npx prisma db seed
   ```
8. Run dev server:
   ```bash
   npm run dev
   ```
9. Open `http://localhost:3000`.

## Admin Access

- URL: `http://localhost:3000/secret-admin`
- Production URL: `https://yourdomain.com/secret-admin`
- Password comes from `ADMIN_PASSWORD` in `.env.local`
- Default is `raffie123` (change before production)

## Deploy to Netlify

1. Push source code to GitHub.
2. In Netlify, click `Add New Site -> Import from GitHub`.
3. Build command is read from `netlify.toml`.
4. Set all environment variables in Netlify:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `ADMIN_PASSWORD`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
5. Deploy.

## Admin Features

- Edit hero portrait, headline, quote, bio, service tags, and trusted bar labels
- Add, edit, delete, and drag-reorder content cards
- Upload hero and card images via Cloudinary signed upload
- Toggle card visibility (`is_visible`) without deleting
- Open preview mode with hidden content using `/?preview=true`
- Manage contact information from dashboard
- View media usage in media library

## Tech Stack

- Next.js App Router + TypeScript (strict)
- Tailwind CSS
- Prisma ORM + Supabase PostgreSQL
- NextAuth Credentials auth
- Cloudinary signed image upload
- Framer Motion animations
- dnd-kit drag-and-drop for reordering cards
