import { Link } from 'react-router-dom';
import { getCoverImage } from '../utils/categoryCovers.js';
import LikeCommentSection from './LikeCommentSection.jsx';

export default function BlogCard({ post, large = false, showLikeComment = false, onLike, onComment }) {
  const isAdmin = post.ownerId === 'admin-owner';
  const coverImage = getCoverImage(post.category, post.image);

  return (
    <div className="group overflow-hidden transition duration-300 hover:opacity-90">
      <Link to={`/post/${post.id}`} className="block">
        <div className="relative overflow-hidden mb-4">
          <div className={`relative overflow-hidden ${large ? 'h-96' : 'h-72'}`}>
            <img
              src={coverImage}
              alt=""
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-4 right-4 text-xs tracking-wider text-echo-light bg-echo-dark/50 px-3 py-1 backdrop-blur">
            {post.category}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-echo-light/30 flex items-center justify-center text-xs font-serif-display text-echo-light">
              {post.authorInitials || post.author?.charAt(0) || 'E'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm text-echo-light font-serif-text">
                {post.author || 'Echo'}
              </p>
              <p className="truncate text-xs text-echo-light/60 font-serif-text">{post.readTime}</p>
            </div>
          </div>
          
          <h3 className="font-serif-display text-2xl leading-tight text-echo-light">
            {post.title}
          </h3>
          
          <p className="font-serif-text line-clamp-2 text-echo-light/80">
            {post.excerpt}
          </p>
          
          <div className="pt-2 text-echo-light hover:text-echo-light/80 transition text-sm font-serif-text">
            More Details →
          </div>
        </div>
      </Link>

      {/* Like/Comment Section - shown on detail page */}
      {showLikeComment && (
        <div className="mt-6 pt-4 border-t border-echo-light/10">
          <LikeCommentSection
            postId={post.id}
            likes={post.likes || 0}
            comments={post.comments || 0}
            isLiked={post.isLiked || false}
            onLike={onLike}
            onComment={onComment}
          />
        </div>
      )}
    </div>
  );
}
