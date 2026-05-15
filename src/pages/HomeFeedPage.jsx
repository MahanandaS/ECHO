import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import BlogCard from '../components/BlogCard.jsx';
import CategoryPill from '../components/CategoryPill.jsx';
import PageTransition from '../components/PageTransition.jsx';
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
      <section className="page-shell py-14">
        <div className="mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#ff6b6b]">
              Home feed
            </p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Fresh echoes from the room.
            </h1>
          </div>
          <label className="flex h-14 min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 text-white/65 md:w-80">
            <Search className="h-5 w-5 shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search stories"
              className="w-full bg-transparent text-white outline-none placeholder:text-white/36"
            />
          </label>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {['All', ...categories].map((item) => (
            <CategoryPill key={item} active={category === item} onClick={() => setCategory(item)}>
              {item}
            </CategoryPill>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} large={index === 0} />
            ))}
          </div>
        ) : (
          <div className="glass-panel grid min-h-80 place-items-center rounded-[32px] p-10 text-center">
            <div>
              <p className="text-2xl font-semibold text-white">No posts found</p>
              <p className="mt-3 text-white/58">Try a different search or category.</p>
            </div>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
