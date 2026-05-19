import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, Edit3, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArticleBody from '../components/ArticleBody.jsx';
import EngagementSection from '../components/EngagementSection.jsx';
import GrainOverlay from '../components/GrainOverlay.jsx';
import PageTransition from '../components/PageTransition.jsx';
import PremiumEssayCard from '../components/PremiumEssayCard.jsx';
import ReadingProgress from '../components/ReadingProgress.jsx';
import { getCoverImage } from '../utils/categoryCovers.js';

export default function BlogDetailPage({
  posts,
  onDeletePost,
  onUpvote,
  onComment,
  onDeleteComment,
  canEdit,
  canDelete,
  currentUserId,
  currentUserName = 'Reader',
  isGuest = false,
  isAdmin = false,
}) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find((item) => item.id === postId);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      if (isGuest) return;
      try {
        if (canEdit && postId) {
          setIsEditable(await canEdit(postId));
        }
        if (canDelete && postId) {
          setIsDeletable(await canDelete(postId));
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
      }
    };
    checkPermissions();
  }, [postId, canEdit, canDelete, isGuest]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return posts
      .filter((p) => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post, posts]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this essay?')) return;
    try {
      await onDeletePost?.(post.id);
      navigate('/explore');
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (!post) {
    return (
      <PageTransition>
        <section className="page-shell grid min-h-[70vh] place-items-center py-12 text-center">
          <div>
            <p className="font-serif-display text-3xl text-echo-heading">Essay not found</p>
            <p className="mt-3 font-sans text-echo-body">It may have been moved or removed.</p>
            <Link to="/explore" className="btn-secondary mt-8">
              Explore essays
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  const coverImage = getCoverImage(post.category, post.image);

  return (
    <PageTransition>
      <GrainOverlay />
      <ReadingProgress />

      <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        <button
          type="button"
          onClick={() => setBookmarked((b) => !b)}
          className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition ${
            bookmarked
              ? 'border-echo-heading/40 bg-white/10 text-echo-heading'
              : 'border-white/15 bg-black/50 text-echo-body hover:text-echo-heading'
          }`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark essay'}
        >
          <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <article>
        <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden md:h-[62vh]">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src={coverImage}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </div>

        <div className="page-shell -mt-24 relative z-10 pb-24 md:-mt-32">
          <Link
            to="/explore"
            className="mb-10 inline-flex items-center gap-2 font-sans text-sm text-echo-body transition hover:text-echo-heading"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to essays
          </Link>

          <header className="max-w-editorial">
            <p className="mb-4 font-sans text-xs tracking-[0.35em] text-echo-body">
              {post.category.toUpperCase()}
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif-display text-4xl leading-tight text-echo-heading md:text-6xl lg:text-7xl"
            >
              {post.title}
            </motion.h1>
            <p className="mt-6 font-sans text-lg leading-relaxed text-echo-body md:text-xl">
              {post.excerpt}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6 border-b border-white/10 pb-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-echo-elevated font-serif-display">
                  {post.authorInitials || post.author?.charAt(0) || 'E'}
                </div>
                <div>
                  <p className="font-sans text-echo-heading">{post.author || 'Echo'}</p>
                  <p className="font-sans text-sm text-echo-body">
                    {post.createdAt} · {post.readTime}
                  </p>
                </div>
              </div>

              {!isGuest && (isEditable || isDeletable) && (
                <div className="ml-auto flex gap-3">
                  {isEditable && (
                    <Link to={`/edit/${post.id}`} className="btn-secondary py-2 text-xs">
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </Link>
                  )}
                  {isDeletable && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="inline-flex items-center gap-2 rounded-full border border-red-900/40 px-4 py-2 font-sans text-xs text-red-300/90 transition hover:border-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </header>

          <ArticleBody
            content={post.content}
            className="reading-column mt-14 font-sans text-lg leading-[1.85] text-echo-body md:text-xl"
          />

          <div className="reading-column mt-20 border-t border-white/10 pt-12">
            <EngagementSection
              postId={post.id}
              upvotes={post.upvotes || 0}
              commentsList={post.commentsList || []}
              isUpvoted={post.isUpvoted || false}
              onUpvote={onUpvote}
              onComment={onComment}
              onDeleteComment={onDeleteComment}
              authorName={currentUserName}
              postOwnerId={post.ownerId}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
            />
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-24 border-t border-white/10 pt-16">
              <p className="font-sans text-xs tracking-[0.3em] text-echo-body">CONTINUE READING</p>
              <h2 className="mt-3 mb-10 font-serif-display text-3xl text-echo-heading md:text-4xl">
                Related essays
              </h2>
              <div className="grid gap-10 md:grid-cols-3">
                {relatedPosts.map((related, index) => (
                  <PremiumEssayCard key={related.id} post={related} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </PageTransition>
  );
}
