import { ArrowDown, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard.jsx';
import PageTransition from '../components/PageTransition.jsx';

export default function LandingPage({ posts }) {
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 4);

  return (
    <PageTransition>
      {/* Cover Section */}
      <section className="page-shell relative flex min-h-screen flex-col items-center justify-center py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 text-sm tracking-widest text-echo-light/60">
            WELCOME
          </div>
          <h1 className="font-serif-display text-6xl md:text-8xl leading-tight text-echo-light mb-6">
            Echo
          </h1>
          <p className="font-serif-text text-2xl md:text-3xl text-echo-light/80 mb-12 italic">
            Thoughts in Motion
          </p>
          <p className="font-serif-text text-lg text-echo-light/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            A contemplative space for writers, artists, and thinkers. Share your explorations of the human experience, the natural world, and the ideas that move you.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              to="/feed"
              className="font-serif-text inline-flex items-center justify-center gap-2 border border-echo-light text-echo-light px-8 py-3 hover:bg-echo-light hover:text-echo-dark transition"
            >
              Explore Essays
            </Link>
            <Link
              to="/create"
              className="font-serif-text inline-flex items-center justify-center gap-2 bg-echo-light text-echo-dark px-8 py-3 hover:bg-echo-cream transition"
            >
              Begin Writing
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-5 w-5 text-echo-light/40" />
        </div>
      </section>

      {/* Elegant divider */}
      <div className="elegant-divider"></div>

      {/* Featured Posts Section */}
      <section className="page-shell pb-24">
        <div className="mb-20">
          <h2 className="font-serif-display text-6xl md:text-7xl text-echo-light mb-12">
            Latest Essays
          </h2>
          <p className="font-serif-text text-lg text-echo-light/70 max-w-2xl">
            Discover contemplative pieces exploring beauty, nature, memory, and the human experience.
          </p>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid gap-12 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="glass-panel grid min-h-80 place-items-center rounded-sm p-10 text-center">
            <div>
              <p className="font-serif-display text-3xl text-echo-light">
                No essays yet
              </p>
              <p className="mt-3 text-echo-light/60 font-serif-text">
                Be the first to share your thoughts.
              </p>
              <Link
                to="/create"
                className="font-serif-text mt-8 inline-flex items-center justify-center gap-2 bg-echo-light text-echo-dark px-8 py-3 hover:bg-echo-cream transition"
              >
                Write Your Essay
              </Link>
            </div>
          </div>
        )}

        {featuredPosts.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/feed"
              className="font-serif-text text-echo-light/70 hover:text-echo-light transition border-b border-echo-light/30 hover:border-echo-light pb-1"
            >
              View All Essays →
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-echo-light/10 bg-echo-dark/30 py-16">
        <div className="page-shell">
          <div className="flex flex-col md:flex-row items-start justify-between">
            {/* Social Links */}
            <div className="mb-8 md:mb-0">
              <div className="flex gap-6 items-center">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-echo-light hover:text-echo-light/60 transition"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-echo-light hover:text-echo-light/60 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-echo-light hover:text-echo-light/60 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex flex-col gap-4 text-center md:text-right">
              <p className="font-serif-text text-sm text-echo-light/70">
                © 2026 Echo. All rights reserved.
              </p>
              <div className="flex gap-6 justify-center md:justify-end text-sm font-serif-text">
                <Link to="/" className="text-echo-light/70 hover:text-echo-light transition">
                  Privacy
                </Link>
                <Link to="/" className="text-echo-light/70 hover:text-echo-light transition">
                  Terms
                </Link>
                <Link to="/" className="text-echo-light/70 hover:text-echo-light transition">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
}
