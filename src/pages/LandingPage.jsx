import { ArrowRight, PenLine, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import { categories } from '../data/seedPosts.js';

export default function LandingPage({ posts }) {
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 2);

  return (
    <PageTransition>
      <section className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0" />
        <div className="page-shell relative grid min-h-[calc(100vh-80px)] items-center gap-12 py-16 lg:grid-cols-[1.03fr_0.97fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/72 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#4ecdc4]" />
              Write, publish, and browse locally
            </div>
            <h1 className="text-balance text-6xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">
              Echo
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-white/64">
              A cinematic writing room for thoughts, essays, journals, and ideas
              that deserve a beautiful first draft.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/create"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:scale-[1.03]"
              >
                Start writing
                <PenLine className="h-5 w-5" />
              </Link>
              <Link
                to="/feed"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-7 py-4 font-semibold text-white transition hover:border-white/24"
              >
                Browse posts
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[34px] p-4">
            <div className="overflow-hidden rounded-[26px] bg-[#0d0d10]">
              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
                alt=""
                className="h-80 w-full object-cover"
              />
              <div className="p-6">
                <div className="mb-5 flex items-center gap-2 text-sm text-white/54">
                  <span className="h-2 w-2 rounded-full bg-[#4ecdc4]" />
                  Drafting now
                </div>
                <h2 className="text-3xl font-semibold leading-tight text-white">
                  What's your heading?
                </h2>
                <p className="mt-4 text-white/58">
                  Echo starts every post by asking for the idea first, then gives
                  the rest of the page room to unfold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#4ecdc4]">
              <TrendingUp className="h-4 w-4" />
              Featured blogs
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-white">Editorial picks</h2>
          </div>
          <Link to="/feed" className="text-sm font-semibold text-white/68 hover:text-white">
            View all posts
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="glass-panel rounded-[32px] p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Trending categories</h2>
            <Link to="/explore" className="text-sm font-semibold text-white/58 hover:text-white">
              Explore
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                to="/explore"
                className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white/72 transition hover:-translate-y-0.5 hover:border-white/24 hover:text-white"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
