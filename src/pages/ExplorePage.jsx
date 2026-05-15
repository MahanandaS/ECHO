import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import { categories } from '../data/seedPosts.js';

const categoryDescriptions = {
  Psychology: 'Thoughts on behavior, emotions, habits, healing, and the inner life.',
  Life: 'Everyday reflections, personal growth, routines, and the art of living well.',
  Technology: 'Modern tools, AI, software, digital culture, and the future of work.',
  Philosophy: 'Questions about meaning, ethics, ambition, identity, and enough.',
  Health: 'Wellness, movement, rest, mental clarity, and sustainable energy.',
  Creativity: 'Writing, making, imagination, creative blocks, and artistic process.',
  Relationships: 'Connection, communication, friendship, love, family, and boundaries.',
  Travel: 'Places, journeys, city notes, slow travel, and the feeling of elsewhere.',
  Productivity: 'Focus, systems, planning, momentum, and better ways to use attention.',
  Culture: 'Media, communities, trends, taste, and how people shape the world together.',
  Ideas: 'Loose sparks, essays, observations, and thoughts that do not fit one box.',
  Design: 'Interfaces, visual systems, product craft, typography, and experience.',
  Startup: 'Building, shipping, founder notes, teams, strategy, and early-stage lessons.',
  Writing: 'Drafts, essays, journaling, publishing, voice, and the writing life.',
  Education: 'Learning, teaching, curiosity, skills, and better ways to understand.',
  Finance: 'Money, independence, work, investing habits, and practical decisions.',
  Science: 'Discovery, research, nature, space, and the wonder of how things work.',
};

export default function ExplorePage({ posts }) {
  return (
    <PageTransition>
      <section className="page-shell py-14">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#4ecdc4]">
            <Compass className="h-4 w-4" />
            Explore
          </p>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl">
            Browse by mood, topic, and intent.
          </h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = posts.filter((post) => post.category === category).length;
            return (
              <Link
                key={category}
                to="/feed"
                className="glass-panel group rounded-[30px] p-6 transition hover:-translate-y-1 hover:border-white/24"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/38">
                  {count} {count === 1 ? 'post' : 'posts'}
                </p>
                <h2 className="mt-8 text-3xl font-semibold text-white">{category}</h2>
                <p className="mt-4 text-white/55">
                  {categoryDescriptions[category] || `Stories and essays about ${category.toLowerCase()}.`}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
