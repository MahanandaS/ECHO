import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GrainOverlay from '../components/GrainOverlay.jsx';
import PageTransition from '../components/PageTransition.jsx';
import PremiumCategoryPill from '../components/PremiumCategoryPill.jsx';
import PremiumEssayCard from '../components/PremiumEssayCard.jsx';
import { categories } from '../data/seedPosts.js';

export default function ExplorePage({ posts }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const initialCategory = searchParams.get('category') || 'All';
  const [category, setCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : 'All',
  );

  useEffect(() => {
    const param = searchParams.get('category');
    if (param && categories.includes(param)) {
      setCategory(param);
    }
  }, [searchParams]);

  const setCategoryFilter = (value) => {
    setCategory(value);
    if (value === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const haystack = `${post.title} ${post.excerpt} ${post.content} ${post.author}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesCategory = category === 'All' || post.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, posts, query]);

  return (
    <PageTransition>
      <GrainOverlay />

      <section className="page-shell-wide py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <p className="font-sans text-xs tracking-[0.35em] text-echo-body">EXPLORE</p>
          <h1 className="mt-4 font-serif-display text-5xl text-echo-heading md:text-6xl lg:text-7xl">
            Essays
          </h1>
          <p className="mt-5 font-sans text-lg leading-relaxed text-echo-body">
            Search and wander through long-form writing on mind, culture, and the art of living.
          </p>
        </motion.div>

        <div className="sticky top-[4.5rem] z-30 -mx-4 mb-12 border-b border-white/[0.08] bg-black/80 px-4 py-6 backdrop-blur-md md:top-[4.5rem]">
          <label className="mb-6 flex items-center gap-3 border-b border-white/15 pb-4">
            <Search className="h-5 w-5 shrink-0 text-echo-body" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search essays, authors, ideas..."
              className="w-full bg-transparent font-sans text-echo-heading outline-none placeholder:text-echo-body/60"
            />
          </label>

          <div className="category-scroll flex gap-2 overflow-x-auto pb-1">
            {['All', ...categories].map((item) => (
              <PremiumCategoryPill
                key={item}
                active={category === item}
                onClick={() => setCategoryFilter(item)}
              >
                {item}
              </PremiumCategoryPill>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key={`${category}-${query}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid auto-rows-fr gap-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPosts.map((post, index) => (
                <PremiumEssayCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel grid min-h-80 place-items-center rounded-2xl p-12 text-center"
            >
              <div>
                <p className="font-serif-display text-3xl text-echo-heading">
                  {posts.length === 0
                    ? 'The silence is waiting.'
                    : 'No echoes match your search.'}
                </p>
                <p className="mt-3 font-sans text-echo-body">
                  {posts.length === 0
                    ? 'Be the first to leave a thought behind.'
                    : 'Try another category or a gentler phrase.'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageTransition>
  );
}
