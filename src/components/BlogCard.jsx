import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogCard({ post, large = false }) {
  const isAdmin = post.ownerId === 'admin-owner';

  return (
    <div className={`card-enter transition duration-300 hover:-translate-y-1.5 ${large ? 'md:col-span-2' : ''}`}>
      <Link
        to={`/post/${post.id}`}
        className={`webcore-panel group relative block overflow-hidden rounded-sm transition duration-300 hover:border-white ${
          large ? 'md:col-span-2' : ''
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.13),transparent_18rem)] opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className={`relative overflow-hidden ${large ? 'h-[360px]' : 'h-60'}`}>
          <img
            src={post.image}
            alt=""
            className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-transparent" />
          <div className="font-web absolute left-5 top-5 border border-white bg-black px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-black/20 backdrop-blur-md">
            {post.category}
          </div>
          {isAdmin && (
            <div className="font-web absolute right-5 top-5 border border-amber-400/50 bg-gradient-to-r from-amber-900/80 to-amber-800/80 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-amber-200 shadow-lg shadow-black/20 backdrop-blur-md">
              Admin
            </div>
          )}
        </div>
        <div className="relative p-6">
          <div className="font-web mb-4 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-white/45">
            <span>{post.readTime}</span>
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`font-web grid h-9 w-9 place-items-center border text-xs font-black ${
                isAdmin
                  ? 'border-amber-400/50 bg-gradient-to-br from-amber-400 to-amber-600 text-black'
                  : 'border-white bg-white text-black'
              }`}
            >
              {post.authorInitials || post.author?.charAt(0) || 'G'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white/82">
                {post.author || 'Guest Writer'}
              </p>
              <p className="truncate text-xs text-white/42">{post.authorBio || 'Blog writer'}</p>
            </div>
          </div>
          <h3 className="font-web text-balance text-2xl font-black uppercase leading-tight text-white">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/62">{post.excerpt}</p>
        </div>
      </Link>
    </div>
  );
}
