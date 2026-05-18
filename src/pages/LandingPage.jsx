import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FeaturedEssayCard from '../components/FeaturedEssayCard.jsx';
import GrainOverlay from '../components/GrainOverlay.jsx';
import PageTransition from '../components/PageTransition.jsx';
import PremiumEssayCard from '../components/PremiumEssayCard.jsx';
import { categories } from '../data/seedPosts.js';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export default function LandingPage({ posts }) {
  const featured = posts.find((p) => p.featured) || posts[0];
  const latest = posts.filter((p) => p.id !== featured?.id).slice(0, 6);

  return (
    <PageTransition>
      <GrainOverlay />

      <section className="page-shell relative flex min-h-[92vh] flex-col items-center justify-center py-24 text-center md:py-32">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7 }}
          className="mb-4 font-sans text-xs tracking-[0.35em] text-echo-body"
        >
          EDITORIAL
        </motion.p>
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-display text-6xl text-echo-heading md:text-8xl lg:text-9xl"
        >
          Echo
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 font-serif-text text-2xl italic text-echo-heading/90 md:text-3xl"
        >
          Thoughts in Motion
        </motion.p>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-echo-body md:text-lg"
        >
          A contemplative space for essays on philosophy, psychology, creativity, and the quiet
          architecture of a life examined.
        </motion.p>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Link to="/explore" className="btn-primary">
            Explore Essays
          </Link>
          <Link to="/create" className="btn-secondary">
            Begin Writing
          </Link>
        </motion.div>
      </section>

      {featured && (
        <section className="page-shell-wide pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="font-sans text-xs tracking-[0.3em] text-echo-body">FEATURED ESSAY</p>
            <h2 className="mt-3 font-serif-display text-4xl text-echo-heading md:text-5xl">
              Editor&apos;s pick
            </h2>
          </motion.div>
          <FeaturedEssayCard post={featured} />
        </section>
      )}

      <section className="page-shell pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="font-sans text-xs tracking-[0.3em] text-echo-body">BROWSE</p>
          <h2 className="mt-3 font-serif-display text-3xl text-echo-heading md:text-4xl">
            Categories
          </h2>
        </motion.div>
        <div className="category-scroll flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/explore?category=${encodeURIComponent(category)}`}
              className="shrink-0 rounded-full border border-white/15 px-4 py-2 font-sans text-xs tracking-wide text-echo-body transition hover:border-white/30 hover:text-echo-heading"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="page-shell-wide pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-sans text-xs tracking-[0.3em] text-echo-body">LATEST</p>
            <h2 className="mt-3 font-serif-display text-4xl text-echo-heading md:text-5xl">
              Recent essays
            </h2>
          </div>
          <Link
            to="/explore"
            className="font-sans text-sm text-echo-body transition hover:text-echo-heading"
          >
            View all →
          </Link>
        </motion.div>

        {latest.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post, index) => (
              <PremiumEssayCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="glass-panel grid min-h-72 place-items-center rounded-2xl p-12 text-center">
            <div>
              <p className="font-serif-display text-3xl text-echo-heading">The silence is waiting.</p>
              <p className="mt-3 font-sans text-echo-body">
                Be the first to leave a thought behind.
              </p>
              <Link to="/create" className="btn-primary mt-8">
                Begin Writing
              </Link>
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
