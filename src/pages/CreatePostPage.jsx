import { Eye, ImagePlus, PenLine, RotateCcw, Send, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArticleBody from '../components/ArticleBody.jsx';
import PageTransition from '../components/PageTransition.jsx';
import { categories } from '../data/seedPosts.js';

const fallbackImage =
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80';
const DRAFT_STORAGE_KEY = 'echo.draft';

const defaultDraft = {
  title: '',
  excerpt: '',
  content: '',
  category: categories[0],
  image: '',
};

const loadDraft = () => {
  try {
    const storedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    return storedDraft ? { ...defaultDraft, ...JSON.parse(storedDraft) } : defaultDraft;
  } catch {
    return defaultDraft;
  }
};

export default function CreatePostPage({
  onCreatePost,
  onUpdatePost,
  posts = [],
  canEdit,
}) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const editingPost = posts.find((post) => post.id === postId);
  const isEditing = Boolean(postId);
  const [draft, setDraft] = useState(loadDraft);
  const [mode, setMode] = useState('write');

  // Check if user can edit this post
  const canEditPost = canEdit && isEditing && canEdit(postId);

  const wordCount = useMemo(() => {
    return draft.content.trim().split(/\s+/).filter(Boolean).length;
  }, [draft.content]);

  const updateDraft = (field, value) => {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }));
  };

  useEffect(() => {
    if (!isEditing) {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }
  }, [draft, isEditing]);

  useEffect(() => {
    if (!isEditing || !editingPost) {
      return;
    }

    // Check permission before loading
    if (canEdit && !canEdit(postId)) {
      return;
    }

    setDraft({
      title: editingPost.title || '',
      excerpt: editingPost.excerpt || '',
      content: editingPost.content || '',
      category: editingPost.category || categories[0],
      image: editingPost.image || '',
    });
    setMode('write');
  }, [editingPost, isEditing, canEdit, postId]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateDraft('image', reader.result);
    reader.readAsDataURL(file);
  };

  const clearDraft = () => {
    setDraft(defaultDraft);
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setMode('write');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draft.title.trim() || !draft.content.trim()) return;

    const postPayload = {
      title: draft.title.trim(),
      excerpt: draft.excerpt.trim() || draft.content.trim().slice(0, 150),
      content: draft.content.trim(),
      category: draft.category,
      image: draft.image || fallbackImage,
    };

    if (isEditing) {
      const updatedPost = onUpdatePost(postId, postPayload);
      navigate(`/post/${updatedPost?.id || postId}`);
      return;
    }

    const post = onCreatePost(postPayload);
    clearDraft();
    navigate(`/post/${post.id}`);
  };

  if (isEditing && !editingPost) {
    return (
      <PageTransition>
        <section className="page-shell grid min-h-[70vh] place-items-center py-12 text-center">
          <div className="glass-panel max-w-xl rounded-[32px] p-8">
            <p className="text-3xl font-semibold text-white">Post not found</p>
            <p className="mt-3 text-white/58">This writing may have already been deleted.</p>
            <Link
              to="/feed"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black"
            >
              Back to feed
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  if (isEditing && editingPost && canEdit && !canEditPost) {
    return (
      <PageTransition>
        <section className="page-shell grid min-h-[70vh] place-items-center py-12 text-center">
          <div className="glass-panel max-w-xl rounded-[32px] p-8">
            <p className="text-3xl font-semibold text-white">You cannot edit this post</p>
            <p className="mt-3 text-white/58">Only the author can edit their own posts.</p>
            <Link
              to={`/post/${postId}`}
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black"
            >
              Back to post
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="page-shell py-14">
        <div className="page-enter mb-8 max-w-3xl">
          <p className="font-web mb-3 text-xs font-black uppercase tracking-[0.28em] text-white/50">
            Curate content
          </p>
          <h1 className="font-web text-balance text-5xl font-black uppercase tracking-[-0.08em] text-white md:text-7xl">
            {isEditing ? 'Update your post.' : 'Create an admin post.'}
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/58">
            {isEditing
              ? 'Edit and publish your updates to the platform.'
              : 'As the site admin, curate and publish posts directly to the feed.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-7 xl:grid-cols-[1fr_380px]">
          <div className="glass-panel rounded-[34px] p-6 md:p-9">
            <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <p className="font-web text-xs font-black uppercase tracking-[0.28em] text-white/50">
                {isEditing ? 'Update your writing' : 'Before publishing'}
              </p>
              <div className="inline-flex rounded-full border border-white/10 bg-black/20 p-1">
                <button
                  type="button"
                  onClick={() => setMode('write')}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    mode === 'write' ? 'bg-white text-black' : 'text-white/58 hover:text-white'
                  }`}
                >
                  <PenLine className="h-4 w-4" />
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setMode('preview')}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    mode === 'preview' ? 'bg-white text-black' : 'text-white/58 hover:text-white'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </button>
              </div>
            </div>

            {mode === 'write' ? (
              <>
                <label
                  htmlFor="title"
                  className="font-web mb-4 block text-4xl font-black uppercase tracking-[-0.06em] text-white md:text-6xl"
                >
                  What's your heading?
                </label>
                <input
                  id="title"
                  value={draft.title}
                  onChange={(event) => updateDraft('title', event.target.value)}
                  placeholder="A title that pulls the room closer"
                  className="font-web w-full border-0 border-b border-white/20 bg-transparent pb-5 text-4xl font-black tracking-[-0.06em] text-white outline-none placeholder:text-white/20 focus:border-white/60 md:text-6xl"
                  required
                />

                <div className="mt-10 grid gap-6">
                  <label className="grid gap-3">
                    <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                      Description
                    </span>
                    <textarea
                      value={draft.excerpt}
                      onChange={(event) => updateDraft('excerpt', event.target.value)}
                      rows="3"
                      placeholder="A short preview for the feed"
                      className="resize-none rounded-[24px] border border-white/10 bg-black/20 p-5 text-white outline-none placeholder:text-white/28 focus:border-white/35"
                    />
                  </label>

                  <label className="grid gap-3">
                    <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                      Content
                    </span>
                    <textarea
                      value={draft.content}
                      onChange={(event) => updateDraft('content', event.target.value)}
                      rows="12"
                      placeholder="Use #, ##, or ### at the start of a line to add headings."
                      className="resize-y rounded-[24px] border border-white/10 bg-black/20 p-5 text-lg leading-8 text-white outline-none placeholder:text-white/28 focus:border-white/35"
                      required
                    />
                  </label>
                </div>
              </>
            ) : (
              <div className="min-h-[520px] rounded-[28px] border border-white/10 bg-black/20 p-6 md:p-8">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/38">
                  Preview
                </p>
                <h1 className="text-balance text-4xl font-semibold text-white md:text-6xl">
                  {draft.title || "What's your heading?"}
                </h1>
                <p className="mt-5 text-lg leading-8 text-white/58">
                  {draft.excerpt || 'Your post description will appear here.'}
                </p>
                <div className="mt-7 flex items-center gap-3 text-left">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-black text-black">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-white">Admin</p>
                    <p className="text-sm text-white/45">Site Administrator</p>
                  </div>
                </div>
                <ArticleBody
                  content={draft.content || 'Start writing to preview your article.'}
                  className="mt-10 text-lg leading-9 text-white/76"
                />
              </div>
            )}
          </div>

          <aside className="glass-panel h-fit rounded-[32px] p-5">
            <div className="relative mb-5 overflow-hidden rounded-[24px] border border-white/10 bg-black/30">
              {draft.image ? (
                <>
                  <img src={draft.image} alt="" className="h-64 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => updateDraft('image', '')}
                    className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <label className="grid h-64 cursor-pointer place-items-center p-6 text-center transition hover:bg-white/[0.04]">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <span>
                    <ImagePlus className="mx-auto mb-4 h-8 w-8 text-white/55" />
                    <span className="block font-semibold text-white">Add an optional image</span>
                    <span className="mt-2 block text-sm text-white/45">Upload preview stays local</span>
                  </span>
                </label>
              )}
            </div>

            <div className="mb-5 rounded-[26px] border border-white/10 bg-black/20 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black font-semibold">
                  A
                </div>
                <div>
                  <p className="font-semibold text-white">Curated by Admin</p>
                  <p className="text-sm text-white/45">Site administrator only.</p>
                </div>
              </div>

              <p className="text-sm leading-6 text-white/55">
                Your posts will appear marked as Admin on the platform, maintaining full editorial control.
              </p>
            </div>

            <div className="grid gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                Category
              </span>
              <select
                value={draft.category}
                onChange={(event) => updateDraft('category', event.target.value)}
                className="rounded-full border border-white/10 bg-black/30 px-5 py-4 text-white outline-none focus:border-white/35"
              >
                {categories.map((item) => (
                  <option key={item} value={item} className="bg-[#101014]">
                    {item}
                  </option>
                ))}
              </select>
              <div className="flex max-h-36 flex-wrap gap-2 overflow-auto pr-1">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => updateDraft('category', item)}
                    className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      draft.category === item
                        ? 'border-white bg-white text-black'
                        : 'border-white/10 bg-white/[0.04] text-white/54 hover:border-white/24 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">{wordCount}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/38">Words</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">
                  {Math.max(1, Math.ceil(wordCount / 180))}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/38">Min read</p>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!draft.title.trim() || !draft.content.trim()}
            >
              {isEditing ? 'Update admin post' : 'Publish admin post'}
              <Send className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={clearDraft}
              className="mt-3 inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 font-semibold text-white/62 transition hover:border-white/24 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              {isEditing ? 'Reset form' : 'Start over'}
            </button>
          </aside>
        </form>
      </section>
    </PageTransition>
  );
}
