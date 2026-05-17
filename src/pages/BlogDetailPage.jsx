import { ArrowLeft, Edit3, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArticleBody from '../components/ArticleBody.jsx';
import PageTransition from '../components/PageTransition.jsx';

export default function BlogDetailPage({
  posts,
  onDeletePost,
  canEdit,
  canDelete,
  currentUserId,
}) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find((item) => item.id === postId);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);

  /**
   * Check edit and delete permissions (async operations)
   */
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        if (canEdit && postId) {
          const canEditResult = await canEdit(postId);
          setIsEditable(canEditResult);
        }

        if (canDelete && postId) {
          const canDeleteResult = await canDelete(postId);
          setIsDeletable(canDeleteResult);
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
      }
    };

    checkPermissions();
  }, [postId, canEdit, canDelete]);

  const handleDelete = async () => {
    const shouldDelete = window.confirm('Delete this essay?');
    if (!shouldDelete) {
      return;
    }

    try {
      await onDeletePost(post.id);
      navigate('/feed');
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
            <p className="font-serif-display text-3xl text-echo-light">Essay not found</p>
            <Link to="/feed" className="mt-5 inline-flex text-echo-light/60 hover:text-echo-light font-serif-text">
              Back to Essays
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="page-shell py-16">
        <Link to="/feed" className="mb-12 inline-flex items-center gap-2 text-sm text-echo-light/60 hover:text-echo-light font-serif-text transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Essays
        </Link>

        <header className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="mb-4 text-xs tracking-widest text-echo-light/50">
              {post.category.toUpperCase()}
            </p>
            <h1 className="font-serif-display text-5xl md:text-6xl text-echo-light mb-6">
              {post.title}
            </h1>
            <p className="text-lg leading-8 text-echo-light/70 font-serif-text max-w-2xl mb-8">{post.excerpt}</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 pb-8 border-b border-echo-light/10">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-echo-green flex items-center justify-center text-sm font-serif-display text-echo-cream">
                {post.authorInitials || post.author?.charAt(0) || 'E'}
              </div>
              <div>
                <p className="font-serif-text text-echo-light">{post.author || 'Echo'}</p>
                <div className="flex gap-3 text-sm text-echo-light/50 font-serif-text">
                  <span>{post.createdAt}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {isEditable ? (
                <Link
                  to={`/edit/${post.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-echo-light text-echo-dark px-6 py-3 text-sm font-serif-text transition hover:bg-echo-cream"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Link>
              ) : null}

              {isDeletable ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center gap-2 border border-red-900/50 text-red-200/70 hover:text-red-200 px-6 py-3 text-sm font-serif-text transition hover:border-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        </header>

        <img
          src={post.image}
          alt=""
          className="mt-8 w-full max-h-96 object-cover mb-12"
        />

        <ArticleBody
          content={post.content}
          className="mx-auto max-w-3xl text-lg leading-8 text-echo-light/80"
        />
      </article>
    </PageTransition>
  );
}
