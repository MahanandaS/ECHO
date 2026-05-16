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
      <section className="page-shell py-16">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 flex items-center gap-2 text-xs tracking-widest text-echo-light/50">
            <Compass className="h-4 w-4" />
            EXPLORE
          </p>
          <h1 className="font-serif-display text-5xl md:text-6xl text-echo-light">
            Browse by Category
          </h1>
          <p className="mt-4 text-lg text-echo-light/70 font-serif-text">
            Discover essays organized by mood, topic, and interest.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = posts.filter((post) => post.category === category).length;
            return (
              <Link
                key={category}
                to="/feed"
                className="border border-echo-light/10 p-6 hover:border-echo-light/30 transition group"
              >
                <p className="text-xs font-serif-text tracking-wider text-echo-light/50 mb-4">
                  {count} {count === 1 ? 'essay' : 'essays'}
                </p>
                <h2 className="font-serif-display text-2xl text-echo-light mb-3 group-hover:text-echo-light/90 transition">
                  {category}
                </h2>
                <p className="text-echo-light/65 font-serif-text text-sm leading-relaxed">
                  {categoryDescriptions[category] || `Essays and reflections about ${category.toLowerCase()}.`}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
