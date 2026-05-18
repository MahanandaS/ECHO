# ECHO

ECHO is a modern blogging web application built using React, Vite, Tailwind CSS, and Firebase.

The platform allows users to create and explore posts through a clean and responsive interface. The project is deployed on Vercel and focuses on a fast frontend experience with scalable architecture for future backend enhancements.

Tech Stack
React
Vite
Tailwind CSS
Firebase
React Router DOM
Vercel
Features
blog posting
Responsive UI
Client-side routing
Firebase configuration support
Fast deployment with Vercel
Modern component-based frontend architecture

## Run The Project

Install dependencies:

```bash
npm install
```

If you are continuing from an older Echo install, make sure Framer Motion is installed:

```bash
npm install framer-motion
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```bash
http://localhost:5173
```

Build for production:

```bash
npm run build
```

Avoid running `npm audit fix --force` on this project. It can upgrade Vite across major versions and create plugin compatibility warnings. If that already happened, run:

```bash
npm install vite@5.4.21 --save-dev
npm run dev
```

## What Was Built First

1. React + Vite project files were created at the project root.
2. Tailwind CSS is wired through `tailwind.config.js`, `postcss.config.js`, and `src/styles.css`.
3. The requested folder structure is in `src/`.
4. A reusable app layout and animated navbar were created in `src/layouts/AppLayout.jsx`.
5. The modern landing page is in `src/pages/LandingPage.jsx`.
6. Supporting feed, create, detail, and explore pages are already scaffolded and working through local state.

## Where To Edit

- `src/pages/LandingPage.jsx`: hero section, featured blogs, trending categories.
- `src/layouts/AppLayout.jsx`: navbar, mobile menu, floating create button.
- `src/pages/CreatePostPage.jsx`: cinematic heading prompt, writing form, image preview, publish button.
- `src/pages/HomeFeedPage.jsx`: search, category filters, blog grid.
- `src/pages/BlogDetailPage.jsx`: full post reading view.
- `src/pages/ExplorePage.jsx`: category cards.
- `src/data/seedPosts.js`: starter posts and categories.
- `src/styles.css`: global Tailwind import, dark theme, shared visual helpers.

## Test Each Step

After installing dependencies:

1. Run `npm run dev`.
2. Visit `/` and check the landing page hero, navbar, featured posts, and categories.
3. Visit `/create`, enter a heading, content, optional image, and category.
4. Click `Publish locally`.
5. Confirm the new post opens immediately on its detail page.
6. Visit `/feed` and confirm the post appears at the top.
7. Try search and category filtering.
8. Resize the browser to verify the mobile navbar and floating create button.

## Beginner-Friendly Notes

The app keeps anonymous posts in `usePosts()` with `useState` and `localStorage`. There are no pre-existing blogs in the anonymous version.

When you are ready for the next build step, improve the writing experience first: autosave to `localStorage`, markdown preview, draft state, and richer editor controls all fit the current architecture without adding a backend.
