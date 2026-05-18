import { Link } from 'react-router-dom';
import { getCoverImage } from '../utils/categoryCovers.js';

export default function BlogCard({ post, large = false }) {
  const coverImage = getCoverImage(post.category, post.image);

  return (
    <div className="group overflow-hidden transition duration-300 hover:opacity-90">
      <Link to={`/post/${post.id}`} className="block">
        <div className="relative mb-4 overflow-hidden">
          <div className={`relative overflow-hidden ${large ? 'h-96' : 'h-72'}`}>
            <img
              src={coverImage}
              alt=""
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute right-4 top-4 bg-echo-dark/50 px-3 py-1 text-xs tracking-wider text-echo-light backdrop-blur">
            {post.category}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-echo-light/30 font-serif-display text-xs text-echo-light">
              {post.authorInitials || post.author?.charAt(0) || 'E'}
            </div>
            <div className="min-w-0">
              <p className="truncate font-serif-text text-sm text-echo-light">
                {post.author || 'Echo'}
              </p>
              <p className="truncate font-serif-text text-xs text-echo-light/60">{post.readTime}</p>
            </div>
          </div>

          <h3 className="font-serif-display text-2xl leading-tight text-echo-light">{post.title}</h3>

          <p className="line-clamp-2 font-serif-text text-echo-light/80">{post.excerpt}</p>

          <div className="pt-2 font-serif-text text-sm text-echo-light transition hover:text-echo-light/80">
            Read Essay →
          </div>
        </div>
      </Link>
    </div>
  );
}
