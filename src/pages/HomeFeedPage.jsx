import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import PageTransition from '../components/PageTransition.jsx';
import GrainOverlay from '../components/GrainOverlay.jsx';
import PremiumEssayCard from '../components/PremiumEssayCard.jsx';
import PremiumCategoryPill from '../components/PremiumCategoryPill.jsx';
import { categories } from '../data/seedPosts.js';

export default function HomeFeedPage({ posts }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery = `${post.title} ${post.excerpt} ${post.content}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === 'All' || post.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, posts, query]);

  return (
    <PageTransition>
      <GrainOverlay />
      
      <section className="page-shell py-20 md:py-24">
        <div className="mb-16">
          <p className="text-xs tracking-widest text-echo-light/50 mb-4">
            ESSAYS
          </p>
          <h1 className="font-serif-display text-5xl md:text-6xl text-echo-light mb-8">
            All Essays
          </h1>
          
          <label className="flex items-center gap-3 border-b border-echo-light/20 pb-4 mb-8">
            <Search className="h-5 w-5 text-echo-light/50" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search essays..."
              className="flex-1 bg-transparent text-echo-light placeholder:text-echo-light/40 outline-none font-serif-text"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            {['All', ...categories].map((item) => (
              <PremiumCategoryPill key={item} active={category === item} onClick={() => setCategory(item)}>
                {item}
              </PremiumCategoryPill>
            ))}
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid auto-rows-fr gap-16 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PremiumEssayCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="glass-panel grid min-h-80 place-items-center rounded-sm p-10 text-center">
            <div>
              <p className="font-serif-display text-3xl text-echo-light">
                {posts.length === 0 ? 'The silence awaits' : 'No echoes match your search'}
              </p>
              <p className="mt-3 text-echo-light/60 font-serif-text">
                {posts.length === 0
                  ? 'Be the first to share your thoughts here.'
                  : 'Try exploring a different category or search term.'}
              </p>
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
