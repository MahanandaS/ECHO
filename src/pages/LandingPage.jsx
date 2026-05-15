import { ArrowRight, PenLine, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import { categories } from '../data/seedPosts.js';

export default function LandingPage({ posts }) {
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 2);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="page-shell py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-web mb-4 text-xs font-black uppercase tracking-[0.34em] text-white/50">
            Welcome to blog
          </p>
          <h1 className="font-web text-balance text-6xl font-black uppercase leading-[0.95] tracking-[-0.08em] text-white md:text-8xl">
            Write Your Stories
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-white/70">
            Share your thoughts, ideas, and experiences with our blogging community. Write freely, edit anytime, and connect with other writers.
          </p>
          
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <Link
              to="/create"
              className="font-web inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-8 py-4 text-sm font-black uppercase text-black transition hover:scale-105"
            >
              <PenLine className="h-5 w-5" />
              Start Writing
            </Link>
            <Link
              to="/feed"
              className="font-web inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-sm font-black uppercase text-white transition hover:bg-white hover:text-black"
            >
              Browse Stories
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="page-shell">
        <div className="mb-20 rounded-[32px] border border-white/10 bg-white/[0.05] px-8 py-12 md:flex md:items-center md:justify-between">
          <div className="mb-8 md:mb-0">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">Platform Stats</p>
            <p className="mt-2 text-4xl font-black text-white">{posts.length}</p>
            <p className="text-white/60">Stories published</p>
          </div>
          <div className="border-l border-white/10 pl-8 md:border-l md:pl-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">Get Started</p>
            <p className="mt-3 max-w-sm text-white/70">
              Create an account in seconds and start sharing your stories with our growing community of writers.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="page-shell pb-20">
        <div className="mb-12">
          <p className="font-web mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-white/50">
            <TrendingUp className="h-4 w-4" />
            Recent posts
          </p>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="font-display text-4xl font-semibold text-white">
              Latest from the blog
            </h2>
            <Link to="/feed" className="font-web text-xs font-bold uppercase tracking-[0.18em] text-white/60 hover:text-white">
              View all stories →
            </Link>
          </div>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-12 text-center">
            <p className="text-3xl font-bold text-white">No stories yet</p>
            <p className="mt-4 text-white/60">
              Be the first to write and share a story.
            </p>
            <Link
              to="/create"
              className="font-web mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-black uppercase text-black transition hover:scale-105"
            >
              <PenLine className="h-4 w-4" />
              Write your first story
            </Link>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
