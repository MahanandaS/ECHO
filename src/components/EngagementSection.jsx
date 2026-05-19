import { ArrowUp, MessageCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EngagementSection({
  postId,
  upvotes = 0,
  commentsList = [],
  onUpvote = () => {},
  isUpvoted = false,
  onComment = () => {},
  onDeleteComment = () => {},
  authorName = 'Reader',
  postOwnerId = null,
  currentUserId = null,
  isAdmin = false,
}) {
  const [commentText, setCommentText] = useState('');
  const commentCount = commentsList.length;
  const isPostAuthor = postOwnerId && currentUserId && postOwnerId === currentUserId;

  const handleUpvote = () => {
    onUpvote(postId);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!commentText.trim()) return;
    onComment(postId, commentText.trim(), authorName);
    setCommentText('');
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-6"
      >
        <button
          type="button"
          onClick={handleUpvote}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-sm transition ${
            isUpvoted
              ? 'border-echo-heading/40 bg-white/10 text-echo-heading'
              : 'border-white/15 text-echo-body hover:border-white/30 hover:text-echo-heading'
          }`}
        >
          <ArrowUp className={`h-4 w-4 ${isUpvoted ? 'stroke-[2.5]' : ''}`} />
          <span>Upvote</span>
          <span className="text-echo-body/80">· {upvotes}</span>
        </button>

        <div className="inline-flex items-center gap-2 font-sans text-sm text-echo-body">
          <MessageCircle className="h-4 w-4" />
          <span>
            {commentCount} {commentCount === 1 ? 'reflection' : 'reflections'}
          </span>
        </div>
      </motion.div>

      <section className="space-y-6">
        <h3 className="font-serif-display text-2xl text-echo-heading">Reflections</h3>

        {commentCount > 0 ? (
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
              {commentsList.map((comment) => (
                <motion.li
                  key={comment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel rounded-lg p-5"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-sans text-sm font-medium text-echo-heading">
                      {comment.author || 'Reader'}
                    </p>
                    <div className="flex items-center gap-3">
                      <time className="font-sans text-xs text-echo-body/70">{comment.createdAt}</time>
                      {(isPostAuthor || isAdmin) && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Delete this reflection?')) {
                              onDeleteComment(postId, comment.id);
                            }
                          }}
                          className="text-echo-body/60 transition hover:text-red-400"
                          aria-label="Delete comment"
                          title="Delete this reflection"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="font-sans text-base leading-relaxed text-echo-body">{comment.text}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <p className="font-sans text-echo-body/80 italic">
            The silence is waiting. Be the first to leave a thought behind.
          </p>
        )}

        <form onSubmit={handleCommentSubmit} className="space-y-3 pt-2">
          <label htmlFor={`comment-${postId}`} className="sr-only">
            Add a reflection
          </label>
          <textarea
            id={`comment-${postId}`}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your reflection..."
            rows={4}
            className="w-full resize-none rounded-lg border border-white/10 bg-echo-secondary/80 px-4 py-3 font-sans text-sm text-echo-heading placeholder:text-echo-body/50 outline-none transition focus:border-white/25"
          />
          <motion.div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={!commentText.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-echo-heading/30 bg-echo-heading px-6 py-2.5 font-sans text-sm font-medium text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Post reflection
            </motion.button>
          </motion.div>
        </form>
      </section>
    </div>
  );
}
