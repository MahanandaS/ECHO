import { ArrowLeft, Edit3, Trash2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArticleBody from '../components/ArticleBody.jsx';
import PageTransition from '../components/PageTransition.jsx';

export default function BlogDetailPage({ posts, onDeletePost }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find((item) => item.id === postId);

  const handleDelete = () => {
    const shouldDelete = window.confirm('Delete this writing from Echo?');
    if (!shouldDelete) {
      return;
    }

    onDeletePost(post.id);
    navigate('/feed');
  };

  if (!post) {
    return (
      <PageTransition>
        <section className="page-shell grid min-h-[70vh] place-items-center py-12 text-center">
          <div>
            <p className="text-3xl font-semibold text-white">Post not found</p>
            <Link to="/feed" className="mt-5 inline-flex text-white/62 hover:text-white">
              Back to feed
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="page-shell py-10">
        <Link to="/feed" className="mb-8 inline-flex items-center gap-2 text-sm text-white/58 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </Link>
        <header className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#4ecdc4]">
            {post.category}
          </p>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58">{post.excerpt}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-white/45">
            <span>{post.author}</span>
            <span>/</span>
            <span>{post.createdAt}</span>
            <span>/</span>
            <span>{post.readTime}</span>
            {post.updatedAt && (
              <>
                <span>/</span>
                <span>{post.updatedAt}</span>
              </>
            )}
          </div>
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 rounded-full border border-white/10 bg-white/[0.05] px-5 py-4 text-left backdrop-blur-xl">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-sm font-black text-black">
              {post.authorInitials || post.author?.charAt(0) || 'G'}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white">{post.author || 'Guest Writer'}</p>
              <p className="truncate text-sm text-white/48">{post.authorBio || 'Writer on Echo'}</p>
            </div>
          </div>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={`/edit/${post.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              <Edit3 className="h-4 w-4" />
              Edit writing
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 px-6 py-3 text-sm font-semibold text-[#ffb3b3] transition hover:border-[#ff6b6b]/60 hover:bg-[#ff6b6b]/15"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </header>

        <img
          src={post.image}
          alt=""
          className="mt-10 h-[52vh] min-h-80 w-full rounded-[34px] object-cover"
        />

        <ArticleBody
          content={post.content}
          className="mx-auto mt-12 max-w-3xl text-xl leading-10 text-white/76"
        />
      </article>
    </PageTransition>
  );
}
