# DevTok Companion

A SaaS platform designed for developer content creators on TikTok. Help developers share code snippets and manage supplementary content alongside their short-form videos.

## 🚀 Features

- **Code Snippet Hosting**: Create and share beautifully formatted code snippets with syntax highlighting
- **Mobile-First Design**: Optimized viewing experience for TikTok users on mobile devices
- **Analytics Dashboard**: Track views, engagement, and performance metrics
- **TikTok Integration**: Link snippets directly to your TikTok videos
- **QR Code Generation**: Easy sharing through QR codes in your videos
- **Freemium Model**: Free tier with upgrade options for advanced features

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with TypeScript, React, Tailwind CSS
- **Backend**: Next.js App Router API routes
- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js (planned)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with Lucide React icons
- **Code Highlighting**: React Syntax Highlighter

## 🏗 Project Structure

```
src/
├── app/
│   ├── api/snippets/          # API routes for snippet management
│   ├── dashboard/             # User dashboard
│   ├── s/[slug]/             # Public snippet viewing pages
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── lib/
│   └── db.ts                 # Database connection
└── prisma/
    ├── schema.prisma         # Database schema
    └── migrations/           # Database migrations
```

## 🎯 Key Pages

- `/` - Landing page with features and pricing
- `/dashboard` - User dashboard for managing snippets
- `/s/[slug]` - Public snippet viewing page
- `/api/snippets` - REST API for snippet operations

## 💾 Database Schema

- **Users**: Creator profiles with subscription tiers
- **Snippets**: Code snippets with metadata and analytics
- **Analytics**: View tracking and engagement metrics
- **Accounts/Sessions**: NextAuth.js authentication tables

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Set up your environment variables in `.env`:

```env
DATABASE_URL="file:./dev.db"
```

Initialize the database:

```bash
npx prisma migrate dev --name init
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Usage

### For Content Creators:

1. Sign up for a free account
2. Create code snippets from your TikTok videos
3. Share the generated links in your TikTok bio
4. Track engagement through the analytics dashboard

### For Viewers:

1. Click snippet links from creator TikTok profiles
2. View beautifully formatted code with syntax highlighting
3. Copy code with one click
4. Follow links back to the original TikTok video

## 🎨 Design Principles

- **Mobile-First**: Optimized for TikTok's mobile audience
- **Developer-Friendly**: Clean, readable code presentation
- **Fast Loading**: Optimized for quick access from social media
- **Dark Mode**: Code-friendly dark theme by default

## 📈 Monetization Model

- **Free Tier**: 5 snippets, basic analytics
- **Pro Tier ($12/month)**: Unlimited snippets, advanced analytics, custom branding
- **Team Tier ($49/month)**: Team collaboration, white-label options, API access

## 🚢 Deployment

The easiest way to deploy is using [Vercel Platform](https://vercel.com):

```bash
npm run build
```

For production, update your database to PostgreSQL and configure environment variables accordingly.

## 🔧 Development

This project is built with modern web technologies and follows Next.js best practices:

- TypeScript for type safety
- Prisma for database operations
- Tailwind CSS for styling
- App Router for file-based routing
- API routes for backend functionality

## 🔧 Environment Setup

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Fill in your Auth0 credentials from your Auth0 dashboard

3. Set up the database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## 🔑 Required Environment Variables

- `AUTH0_*` - Auth0 authentication configuration
- `DATABASE_URL` - Database connection string
- `STRIPE_*` - Payment processing (for pro features)

## 📋 Todo

- [ ] Implement NextAuth.js authentication
- [ ] Add Stripe integration for subscriptions
- [ ] Create user onboarding flow
- [ ] Add snippet editing functionality
- [ ] Implement team collaboration features
- [ ] Add custom domain support
- [ ] Create mobile app with Expo
- [ ] Add TikTok API integration

## 📄 License

Built for the 36-hour vibe coding challenge. Open source and ready for the developer creator community.

---

**DevTok Companion** - Bridging the gap between TikTok videos and the code that powers them.
