import { Link } from 'react-router-dom';

export default function BlogCard({ post, large = false }) {
  const isAdmin = post.ownerId === 'admin-owner';

  return (
    <Link
      to={`/post/${post.id}`}
      className="group block overflow-hidden transition duration-300 hover:opacity-90"
    >
      <div className="relative overflow-hidden mb-4">
        <div className={`relative overflow-hidden ${large ? 'h-96' : 'h-72'}`}>
          <img
            src={post.image}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-4 right-4 text-xs tracking-wider text-echo-light/70 bg-echo-dark/70 px-3 py-1 backdrop-blur">
          {post.category}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-echo-light/20 flex items-center justify-center text-xs font-serif-display text-echo-light">
            {post.authorInitials || post.author?.charAt(0) || 'E'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm text-echo-light/80 font-serif-text">
              {post.author || 'Echo'}
            </p>
            <p className="truncate text-xs text-echo-light/50 font-serif-text">{post.readTime}</p>
          </div>
        </div>
        
        <h3 className="font-serif-display text-2xl leading-tight text-echo-light">
          {post.title}
        </h3>
        
        <p className="font-serif-text line-clamp-2 text-echo-light/70">
          {post.excerpt}
        </p>
        
        <div className="pt-2 text-echo-light/60 hover:text-echo-light transition text-sm font-serif-text">
          Explore Deeper →
        </div>
      </div>
    </Link>
  );
}
