import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogCard({ post, large = false }) {
  return (
    <Link
      to={`/post/${post.id}`}
      className={`group block overflow-hidden rounded-[28px] glass-panel transition duration-300 hover:-translate-y-1 hover:border-white/25 ${
        large ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${large ? 'h-[360px]' : 'h-56'}`}>
        <img
          src={post.image}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-white/45">
          <span>{post.readTime}</span>
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-black text-black">
            {post.authorInitials || post.author?.charAt(0) || 'G'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white/82">
              {post.author || 'Guest Writer'}
            </p>
            <p className="truncate text-xs text-white/42">{post.authorBio || 'Writer on Echo'}</p>
          </div>
        </div>
        <h3 className="text-balance text-2xl font-semibold leading-tight text-white">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/62">{post.excerpt}</p>
      </div>
    </Link>
  );
}
