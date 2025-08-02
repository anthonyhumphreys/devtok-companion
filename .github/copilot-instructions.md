# DevTok Companion - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

DevTok Companion is a SaaS platform designed for developer content creators on TikTok. It helps them share code snippets and manage supplementary content alongside their short-form videos.

## Tech Stack

- **Frontend**: Next.js 15+ with TypeScript, React, Tailwind CSS
- **Backend**: Next.js App Router API routes
- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with shadcn/ui components
- **Code Highlighting**: Prism.js or highlight.js

## Key Features to Implement

1. **Code Snippet Hosting**: Create, edit, and share formatted code snippets
2. **Link Generation**: Generate shareable links for TikTok bio integration
3. **User Authentication**: Freemium model with subscription tiers
4. **Analytics Dashboard**: Track snippet views and engagement
5. **Mobile Responsive**: Optimized for mobile viewers from TikTok
6. **QR Code Generation**: For easy sharing in videos
7. **Custom Branding**: Creator branding on snippet pages

## Architecture Guidelines

- Use App Router with server components where possible
- Implement API routes for backend functionality
- Follow REST API conventions for external integrations
- Use TypeScript strictly with proper type definitions
- Implement proper error handling and loading states
- Follow responsive-first design principles

## Database Schema Considerations

- Users (creators) with subscription tiers
- Code snippets with metadata (language, views, etc.)
- Analytics tracking for engagement metrics
- Subscription and payment tracking

## UI/UX Principles

- Clean, developer-friendly interface
- Fast loading times for mobile users
- Easy code copying functionality
- Minimal, distraction-free snippet pages
- Dark mode support for code readability

## Security & Performance

- Implement rate limiting for API endpoints
- Sanitize user input for code snippets
- Optimize for Core Web Vitals
- Use proper caching strategies
- Implement proper authentication guards
