import { ArrowRight, PenLine, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import { categories } from '../data/seedPosts.js';

export default function LandingPage({ posts }) {
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 2);

  return (
    <PageTransition>
      <section className="relative overflow-hidden pt-12">
        <div className="page-shell relative min-h-[calc(100vh-96px)] py-10">
          <div className="webcore-frame scanlines mx-auto max-w-4xl overflow-hidden rounded-sm p-3">
            <div className="grid gap-2">
              <div className="webcore-panel static-surface overflow-hidden rounded-sm p-3">
                  <div className="grid min-h-44 items-end rounded-sm border border-white/70 bg-black p-5 md:min-h-52">
                    <div>
                      <p className="font-web mb-3 text-xs uppercase tracking-[0.34em] text-white/58">
                        blogging platform / share stories / create account
                      </p>
                      <h1 className="font-web text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white md:text-7xl">
                        BLOG
                      </h1>
                      <p className="font-display mt-3 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-5xl">
                        Write, edit, and share your stories.
                      </p>
                    </div>
                  </div>
              </div>

              <div className="webcore-strip font-web flex items-center justify-between gap-4 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
                <span>site created :: after midnight</span>
                <span className="hidden sm:inline">status :: active</span>
                <span>entries :: {posts.length}</span>
              </div>

              <div className="grid gap-2 lg:grid-cols-[190px_1fr_160px]">
                <aside className="webcore-panel rounded-sm p-3">
                  <span className="webcore-label">about blog</span>
                  <div className="font-web mt-4 grid gap-2 text-sm font-bold uppercase text-white">
                    <Link to="/feed" className="border border-white/20 bg-white/5 px-2 py-2 hover:bg-white hover:text-black">
                      homepage
                    </Link>
                    <Link to="/create" className="border border-white/20 bg-white/5 px-2 py-2 hover:bg-white hover:text-black">
                      write
                    </Link>
                    <Link to="/explore" className="border border-white/20 bg-white/5 px-2 py-2 hover:bg-white hover:text-black">
                      categories
                    </Link>
                  </div>

                  <span className="webcore-label mt-5">web shit</span>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {['anon', 'diary', 'tech', 'life'].map((item) => (
                      <span
                        key={item}
                        className="font-web border border-white/30 bg-black px-2 py-1 text-center text-xs uppercase text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </aside>

                <div className="grid gap-2">
                  <div className="webcore-panel rounded-sm p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="webcore-label">prepare 4 truth</span>
                      <Sparkles className="h-4 w-4 text-white/60" />
                    </div>
                    <p className="font-web text-sm leading-7 text-white/72">
                      Welcome to our blogging platform. Share your thoughts, ideas, stories,
                      and experiences with our community. Write freely, edit anytime, and
                      connect with other writers.
                    </p>
                  </div>

                  <div className="webcore-panel rounded-sm bg-white p-5 text-center text-black">
                    <p className="font-web text-xs uppercase tracking-[0.22em] text-black/60">
                      create account / edit posts / manage your blog
                    </p>
                    <p className="font-web mt-3 text-sm">
                      sign up, write your story, edit it, share it, and build your presence.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      to="/create"
                      className="font-web inline-flex items-center justify-center gap-3 border-2 border-white bg-white px-5 py-4 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
                    >
                      Write your story
                      <PenLine className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/feed"
                      className="font-web inline-flex items-center justify-center gap-3 border-2 border-white bg-black px-5 py-4 text-sm font-black uppercase text-white transition hover:bg-white hover:text-black"
                    >
                      Browse entries
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <aside className="webcore-panel rounded-sm p-3">
                  <span className="webcore-label">to do list</span>
                  <div className="font-web mt-4 space-y-3 text-xs uppercase leading-5 text-white/70">
                    <p className="border border-white/20 bg-white/5 p-2">write the thing</p>
                    <p className="border border-white/20 bg-white/5 p-2">do not sign it</p>
                    <p className="border border-white/20 bg-white/5 p-2">share your thoughts</p>
                  </div>

                  <span className="webcore-label mt-5">webring</span>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {categories.slice(0, 6).map((category) => (
                      <span
                        key={category}
                        className="font-web border border-white/25 bg-white/5 px-2 py-1 text-center text-[10px] uppercase text-white/62"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-web mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-white/50">
              <TrendingUp className="h-4 w-4" />
              recent posts
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white">
              Latest from the blog
            </h2>
          </div>
          <Link to="/feed" className="font-web text-xs font-bold uppercase tracking-[0.18em] text-white/58 hover:text-white">
            View all
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="webcore-frame grid min-h-64 place-items-center rounded-sm p-8 text-center">
            <div className="max-w-xl">
              <p className="font-web text-3xl font-black uppercase text-white">
                No posts yet
              </p>
              <p className="mt-4 text-white/58">
                Be the first to write and share a story with our community.
              </p>
              <Link
                to="/create"
                className="font-web mt-6 inline-flex items-center justify-center gap-3 border-2 border-white bg-white px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
              >
                Write your story
                <PenLine className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
