import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function LikeCommentSection({ 
  postId, 
  likes = 0, 
  comments = 0,
  onLike = () => {},
  isLiked = false,
  onComment = () => {}
}) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    onLike(postId);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(postId, commentText);
      setCommentText('');
      setIsCommentOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="flex items-center justify-between text-sm text-echo-light/60 border-b border-echo-light/10 pb-3">
        <div className="flex gap-4">
          <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
          <span>{comments} {comments === 1 ? 'comment' : 'comments'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded transition font-serif-text text-sm ${
            isLiked
              ? 'bg-echo-light/20 text-echo-light'
              : 'hover:bg-echo-light/10 text-echo-light/70 hover:text-echo-light'
          }`}
        >
          <Heart 
            className="h-4 w-4" 
            fill={isLiked ? 'currentColor' : 'none'}
          />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>

        <button
          onClick={() => setIsCommentOpen(!isCommentOpen)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded hover:bg-echo-light/10 transition font-serif-text text-sm text-echo-light/70 hover:text-echo-light"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Comment</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded hover:bg-echo-light/10 transition font-serif-text text-sm text-echo-light/70 hover:text-echo-light">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Comment Input */}
      {isCommentOpen && (
        <div className="space-y-3 p-3 bg-echo-light/5 rounded">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-echo-dark/50 border border-echo-light/20 text-echo-light placeholder:text-echo-light/40 rounded p-2 resize-none focus:outline-none focus:border-echo-light/40 font-serif-text text-sm"
            rows="3"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setIsCommentOpen(false);
                setCommentText('');
              }}
              className="px-3 py-1 text-sm text-echo-light/60 hover:text-echo-light transition font-serif-text"
            >
              Cancel
            </button>
            <button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
              className="px-4 py-1 text-sm bg-echo-light/20 text-echo-light rounded hover:bg-echo-light/30 transition font-serif-text disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
