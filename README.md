# Echo

Echo is a frontend-only blogging website built with React, Vite, Tailwind CSS, React Router, and local React state.

There is no backend, authentication, database, or API layer. Posts are created and rendered locally in the UI for the current browser session.

## Run The Project

Install dependencies:

```bash
npm install
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

The app keeps posts in `usePosts()` with `useState`, so refreshing the browser resets back to the seed posts. That is intentional for this frontend-only phase.

When you are ready for the next build step, improve the writing experience first: autosave to `localStorage`, markdown preview, draft state, and richer editor controls all fit the current architecture without adding a backend.
