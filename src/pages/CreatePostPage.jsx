import { ImagePlus, RotateCcw, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArticleBody from '../components/ArticleBody.jsx';
import PageTransition from '../components/PageTransition.jsx';
import { categories } from '../data/seedPosts.js';

const categoryFallbackImages = {
  Psychology: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
  Philosophy: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=80',
  Creativity: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
  Technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  Relationships: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  Culture: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
  Writing: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  Science: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
  Ideas: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&w=1200&q=80',
  Life: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  default: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
};
const DRAFT_STORAGE_KEY = 'blog.draft';

const defaultDraft = {
  title: '',
  excerpt: '',
  content: '',
  category: categories[0],
  image: '',
  authorName: '',
  authorBio: '',
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
  user,
}) {
  const currentUserName = user?.name || localStorage.getItem("currentUser") || "Anonymous";
  const navigate = useNavigate();
  const { postId } = useParams();
  const editingPost = posts.find((post) => post.id === postId);
  const isEditing = Boolean(postId);
  const [draft, setDraft] = useState(loadDraft);
  const [mode, setMode] = useState('write');
  const [canEditPost, setCanEditPost] = useState(!isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing || !canEdit || !postId) {
      setCanEditPost(!isEditing);
      return;
    }
    canEdit(postId).then(setCanEditPost).catch(() => setCanEditPost(false));
  }, [isEditing, canEdit, postId]);

  const wordCount = useMemo(() => {
    return draft.content.trim().split(/\s+/).filter(Boolean).length;
  }, [draft.content]);

  const updateDraft = (field, value) => {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }));
  };

  useEffect(() => {
    if (user?.name && !draft.authorName && !isEditing) {
      setDraft((d) => ({ ...d, authorName: user.name }));
    }
  }, [user, isEditing]);

  useEffect(() => {
    if (!isEditing) {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }
  }, [draft, isEditing]);

  useEffect(() => {
    if (!isEditing || !editingPost) {
      return;
    }

    if (!canEditPost) return;

    setDraft({
      title: editingPost.title || '',
      excerpt: editingPost.excerpt || '',
      content: editingPost.content || '',
      category: editingPost.category || categories[0],
      image: editingPost.image || '',
    });
    setMode('write');
  }, [editingPost, isEditing, canEditPost, postId]);

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

  const handleSubmit = async (event) => {
  event.preventDefault();
  if (!draft.title.trim() || !draft.content.trim() || !draft.authorName.trim()) {
    alert('Please fill in title, content, and author name');
    return;
  }

  if (isSubmitting) return; // prevent double submit
  setIsSubmitting(true);   // disable button immediately

  const postPayload = {
    title: draft.title.trim(),
    excerpt: draft.excerpt.trim() || draft.content.trim().slice(0, 150),
    content: draft.content.trim(),
    category: draft.category,
    image: draft.image || categoryFallbackImages[draft.category] || categoryFallbackImages.default,
    author: draft.authorName.trim(),
    authorBio: draft.authorBio.trim() || 'Writer',
    authorInitials: draft.authorName.trim().charAt(0).toUpperCase(),
  };

  try {
    if (isEditing) {
      const updatedPost = await onUpdatePost(postId, postPayload);
      navigate(`/post/${updatedPost?.id || postId}`);
      return;
    }

    const post = await onCreatePost(postPayload);
    if (!post?.id) {
      alert('Failed to publish essay. Please try again.');
      return;
    }
    clearDraft();
    navigate(`/post/${post.id}`);
  } catch (error) {
    console.error('Failed to save post:', error);
    alert('Failed to save post. Please try again.');
  } finally {
    setIsSubmitting(false); // re-enable button if error
  }
};
  if (isEditing && !editingPost) {
    return (
      <PageTransition>
        <section className="page-shell grid min-h-[70vh] place-items-center py-12 text-center">
          <div className="max-w-xl p-8">
            <p className="font-serif-display text-3xl text-echo-light">Essay not found</p>
            <p className="mt-3 text-echo-light/60 font-serif-text">This essay may have already been deleted.</p>
            <Link
              to="/explore"
              className="mt-6 inline-flex bg-echo-light text-echo-dark px-6 py-3 font-serif-text"
            >
              Back to Essays
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
          <div className="max-w-xl p-8">
            <p className="font-serif-display text-3xl text-echo-light">You cannot edit this essay</p>
            <p className="mt-3 text-echo-light/60 font-serif-text">Only the author can edit their own essays.</p>
            <Link
              to={`/post/${postId}`}
              className="mt-6 inline-flex bg-echo-light text-echo-dark px-6 py-3 font-serif-text"
            >
              Back to Essay
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="page-shell py-16">
        <div className="mb-12 max-w-3xl">
          <h1 className="font-serif-display text-5xl md:text-6xl text-echo-light mb-4">
            {isEditing ? 'Update Essay' : 'Write an Essay'}
          </h1>
          <p className="text-lg leading-8 text-echo-light/70 font-serif-text">
            {isEditing
              ? 'Refine and republish your thoughts.'
              : 'Share your contemplations with the world.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="border border-echo-light/10 p-8">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <p className="text-xs tracking-widest text-echo-light/50">COMPOSE YOUR ESSAY</p>
              <div className="flex border border-echo-light/20">
                <button
                  type="button"
                  onClick={() => setMode('write')}
                  className={`px-4 py-2 text-sm font-serif-text transition ${
                    mode === 'write' ? 'bg-echo-light text-echo-dark' : 'text-echo-light/60 hover:text-echo-light'
                  }`}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setMode('preview')}
                  className={`px-4 py-2 text-sm font-serif-text transition border-l border-echo-light/20 ${
                    mode === 'preview' ? 'bg-echo-light text-echo-dark' : 'text-echo-light/60 hover:text-echo-light'
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>

            {mode === 'write' ? (
              <>
                <label
                  htmlFor="title"
                  className="font-serif-display text-3xl md:text-4xl text-echo-light mb-6 block"
                >
                  Essay Title
                </label>
                <input
                  id="title"
                  value={draft.title}
                  onChange={(event) => updateDraft('title', event.target.value)}
                  placeholder="Your compelling essay title"
                  className="w-full border-0 border-b border-echo-light/20 bg-transparent pb-4 text-3xl md:text-4xl font-serif-display text-echo-light outline-none placeholder:text-echo-light/30 focus:border-echo-light/60"
                  required
                />

                <div className="mt-10 grid gap-8">
                  <label className="grid gap-3">
                    <span className="text-sm font-serif-text tracking-wider text-echo-light/60">
                      EXCERPT
                    </span>
                    <textarea
                      value={draft.excerpt}
                      onChange={(event) => updateDraft('excerpt', event.target.value)}
                      rows="3"
                      placeholder="A brief preview of your essay"
                      className="border border-echo-light/10 bg-echo-dark/30 p-4 text-echo-light outline-none placeholder:text-echo-light/30 focus:border-echo-light/40 font-serif-text"
                    />
                  </label>

                  <label className="grid gap-3">
                    <span className="text-sm font-serif-text tracking-wider text-echo-light/60">
                      CONTENT
                    </span>
                    <textarea
                      value={draft.content}
                      onChange={(event) => updateDraft('content', event.target.value)}
                      rows="16"
                      placeholder="Begin your essay. Use #, ##, or ### for headings."
                      className="border border-echo-light/10 bg-echo-dark/30 p-4 text-lg leading-8 text-echo-light outline-none placeholder:text-echo-light/30 focus:border-echo-light/40 font-serif-text"
                      required
                    />
                  </label>

                  <div className="border-t border-echo-light/10 pt-8">
                    <p className="mb-6 text-sm font-serif-text tracking-wider text-echo-light/60">
                      AUTHOR INFORMATION
                    </p>
                    <label className="grid gap-3 mb-6">
                      <span className="text-xs font-serif-text tracking-wider text-echo-light/60">
                        AUTHOR NAME
                      </span>
                      <input
                        value={draft.authorName}
                        onChange={(event) => updateDraft('authorName', event.target.value)}
                        placeholder="Your name"
                        className="border border-echo-light/10 bg-echo-dark/30 px-4 py-3 text-echo-light outline-none placeholder:text-echo-light/30 focus:border-echo-light/40 font-serif-text"
                        required
                      />
                    </label>

                    <label className="grid gap-3">
                      <span className="text-xs font-serif-text tracking-wider text-echo-light/60">
                        AUTHOR BIO
                      </span>
                      <textarea
                        value={draft.authorBio}
                        onChange={(event) => updateDraft('authorBio', event.target.value)}
                        rows="2"
                        placeholder="Brief description about yourself"
                        className="border border-echo-light/10 bg-echo-dark/30 px-4 py-3 text-echo-light outline-none placeholder:text-echo-light/30 focus:border-echo-light/40 font-serif-text"
                      />
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <div className="min-h-[600px] border border-echo-light/10 bg-echo-dark/20 p-8">
                <p className="mb-6 text-sm font-serif-text tracking-wider text-echo-light/50">
                  PREVIEW
                </p>
                <h1 className="text-4xl md:text-5xl font-serif-display text-echo-light mb-6">
                  {draft.title || "Your essay title"}
                </h1>
                <p className="text-lg leading-8 text-echo-light/70 font-serif-text mb-8">
                  {draft.excerpt || 'Your excerpt will appear here.'}
                </p>
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-echo-light/10">
                  <div className="h-12 w-12 rounded-full bg-echo-green flex items-center justify-center text-sm font-serif-display text-echo-cream">
                    {draft.authorName.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="font-serif-text text-echo-light">{draft.authorName || 'Your Name'}</p>
                    <p className="text-sm text-echo-light/50 font-serif-text">{draft.authorBio || 'Writer'}</p>
                  </div>
                </div>
                <ArticleBody
                  content={draft.content || 'Start writing to preview your essay.'}
                  className="text-lg leading-8 text-echo-light/80 font-serif-text"
                />
              </div>
            )}
          </div>

          <aside className="h-fit border border-echo-light/10 p-6">
            <div className="relative mb-6 overflow-hidden border border-echo-light/10 bg-echo-dark/30">
              {draft.image ? (
                <>
                  <img src={draft.image} alt="" className="h-64 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => updateDraft('image', '')}
                    className="absolute right-3 top-3 h-10 w-10 rounded-full bg-echo-dark/70 text-echo-light flex items-center justify-center backdrop-blur"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <label className="grid h-64 cursor-pointer place-items-center p-6 text-center transition hover:bg-echo-light/5">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <span>
                    <ImagePlus className="mx-auto mb-3 h-6 w-6 text-echo-light/50" />
                    <span className="block font-serif-text text-echo-light/70">Add image</span>
                    <span className="mt-2 block text-xs text-echo-light/40">Stored in cloud</span>
                  </span>
                </label>
              )}
            </div>

            <div className="mb-6 border border-echo-light/10 bg-echo-dark/20 p-4">
              <p className="text-xs font-serif-text tracking-wider text-echo-light/60 mb-3">PUBLISH TO</p>
              <p className="font-serif-text text-echo-light mb-2">Echo Essays</p>
              <p className="text-sm text-echo-light/50 font-serif-text">o
                Your essay will be visible to all readers and can be edited or removed anytime.
              </p>
            </div>

            <div className="mb-6">
              <span className="text-sm font-serif-text tracking-wider text-echo-light/60 mb-3 block">
                CATEGORY
              </span>
              <select
                value={draft.category}
                onChange={(event) => updateDraft('category', event.target.value)}
                className="w-full border border-echo-light/10 bg-echo-dark/30 px-4 py-3 text-echo-light outline-none focus:border-echo-light/40 font-serif-text"
              >
                {categories.map((item) => (
                  <option key={item} value={item} className="bg-echo-dark">
                    {item}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-3">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => updateDraft('category', item)}
                    className={`border px-3 py-2 text-xs font-serif-text transition ${
                      draft.category === item
                        ? 'border-echo-light bg-echo-light text-echo-dark'
                        : 'border-echo-light/20 text-echo-light/60 hover:border-echo-light/50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-echo-light/10 bg-echo-dark/20 p-4">
                <p className="text-2xl font-serif-display text-echo-light">{wordCount}</p>
                <p className="mt-1 text-xs font-serif-text tracking-wider text-echo-light/50">WORDS</p>
              </div>
              <div className="border border-echo-light/10 bg-echo-dark/20 p-4">
                <p className="text-2xl font-serif-display text-echo-light">
                  {Math.max(1, Math.ceil(wordCount / 180))}
                </p>
                <p className="mt-1 text-xs font-serif-text tracking-wider text-echo-light/50">READ TIME</p>
              </div>
            </div>

            <button
  type="submit"
  className="w-full bg-echo-light text-echo-dark px-6 py-3 font-serif-text transition hover:bg-echo-cream disabled:cursor-not-allowed disabled:opacity-50 mb-3"
  disabled={!draft.title.trim() || !draft.content.trim() || isSubmitting}
>
  {isSubmitting
    ? isEditing ? 'Updating...' : 'Publishing...'
    : isEditing ? 'Update Essay' : 'Publish Essay'}
</button>

            <button
              type="button"
              onClick={clearDraft}
              className="w-full border border-echo-light/20 text-echo-light/70 hover:text-echo-light px-6 py-3 font-serif-text transition hover:border-echo-light/50"
            >
              <RotateCcw className="inline h-4 w-4 mr-2" />
              {isEditing ? 'Reset' : 'Start Over'}
            </button>
          </aside>
        </form>
      </section>
    </PageTransition>
  );
}
