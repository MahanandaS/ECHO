import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Users, BookOpen, MessageSquare, ShieldAlert } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import PageTransition from '../components/PageTransition.jsx';
import GrainOverlay from '../components/GrainOverlay.jsx';

export default function AdminPage({ postsState }) {
  const [usersCount, setUsersCount] = useState(0);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isDeletingPostId, setIsDeletingPostId] = useState(null);
  const [isDeletingCommentId, setIsDeletingCommentId] = useState(null);

  // Fetch users count from Firestore
  useEffect(() => {
    async function fetchUsers() {
      setIsLoadingUsers(true);
      try {
        if (db) {
          const usersCol = collection(db, 'users');
          const snapshot = await getDocs(usersCol);
          setUsersCount(snapshot.size);
        }
      } catch (err) {
        console.error('Failed to fetch users count:', err);
      } finally {
        setIsLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

  // Compute stats
  const posts = postsState.posts || [];
  const totalPosts = posts.length;
  const totalComments = posts.reduce((sum, post) => sum + (post.commentsList?.length || 0), 0);

  // Handle post deletion
  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to permanently delete this essay? This cannot be undone.')) {
      return;
    }
    setIsDeletingPostId(postId);
    try {
      await postsState.deletePost(postId);
    } catch (err) {
      console.error('Failed to delete post:', err);
    } finally {
      setIsDeletingPostId(null);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (postId, commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    setIsDeletingCommentId(commentId);
    try {
      await postsState.deleteComment(postId, commentId);
    } catch (err) {
      console.error('Failed to delete comment:', err);
    } finally {
      setIsDeletingCommentId(null);
    }
  };

  return (
    <PageTransition>
      <GrainOverlay />
      
      <section className="page-shell-wide py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="rounded-lg bg-red-950/30 p-3 text-red-400 border border-red-900/30">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div>
            <h1 className="font-serif-display text-4xl text-echo-heading md:text-5xl">
              Admin Console
            </h1>
            <p className="mt-1 font-sans text-sm text-echo-body">
              Manage platform content, review posts, and moderate comments.
            </p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {/* Posts Stat */}
          <div className="glass-panel rounded-2xl p-6 flex items-center justify-between border border-white/10">
            <div className="space-y-1">
              <p className="font-sans text-xs tracking-wider text-echo-body/60 uppercase">Total Essays</p>
              <h2 className="font-serif-display text-3xl text-echo-heading">{totalPosts}</h2>
            </div>
            <div className="rounded-full bg-white/5 p-3 text-echo-heading">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>

          {/* Users Stat */}
          <div className="glass-panel rounded-2xl p-6 flex items-center justify-between border border-white/10">
            <div className="space-y-1">
              <p className="font-sans text-xs tracking-wider text-echo-body/60 uppercase">Total Authors</p>
              <h2 className="font-serif-display text-3xl text-echo-heading">
                {isLoadingUsers ? (
                  <span className="text-sm font-sans animate-pulse">Loading...</span>
                ) : (
                  usersCount
                )}
              </h2>
            </div>
            <div className="rounded-full bg-white/5 p-3 text-echo-heading">
              <Users className="h-6 w-6" />
            </div>
          </div>

          {/* Comments Stat */}
          <div className="glass-panel rounded-2xl p-6 flex items-center justify-between border border-white/10">
            <div className="space-y-1">
              <p className="font-sans text-xs tracking-wider text-echo-body/60 uppercase">Total Comments</p>
              <h2 className="font-serif-display text-3xl text-echo-heading">{totalComments}</h2>
            </div>
            <div className="rounded-full bg-white/5 p-3 text-echo-heading">
              <MessageSquare className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Management Grid */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Essays List */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 lg:col-span-7">
            <h3 className="font-serif-display text-2xl text-echo-heading mb-6 border-b border-white/5 pb-3">
              Essays ({totalPosts})
            </h3>
            
            {posts.length === 0 ? (
              <p className="font-sans text-sm text-echo-body/60 py-8 text-center">No essays found on the platform.</p>
            ) : (
              <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto pr-2">
                {posts.map((post) => (
                  <div key={post.id} className="py-4 flex items-center justify-between gap-4 group">
                    <div className="min-w-0 space-y-1">
                      <h4 className="font-serif-text text-lg text-echo-heading truncate font-medium group-hover:text-echo-cream transition">
                        {post.title}
                      </h4>
                      <p className="font-sans text-xs text-echo-body/70">
                        By <span className="text-echo-heading/80">{post.author || 'Anonymous'}</span> • {post.createdAt}
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleDeletePost(post.id)}
                      disabled={isDeletingPostId === post.id}
                      className="rounded-lg p-2 text-echo-body hover:bg-red-950/20 hover:text-red-400 transition border border-transparent hover:border-red-900/30 disabled:opacity-50"
                      title="Delete Essay"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comments List */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 lg:col-span-5">
            <h3 className="font-serif-display text-2xl text-echo-heading mb-6 border-b border-white/5 pb-3">
              Comments Moderation
            </h3>

            {totalComments === 0 ? (
              <p className="font-sans text-sm text-echo-body/60 py-8 text-center">No comments found on the platform.</p>
            ) : (
              <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto pr-2">
                {posts
                  .filter((post) => post.commentsList && post.commentsList.length > 0)
                  .map((post) => (
                    <div key={post.id} className="py-4 space-y-3">
                      <span className="font-sans text-[10px] tracking-wider text-echo-body/50 uppercase block font-medium">
                        ON: {post.title}
                      </span>
                      
                      <div className="space-y-3 pl-2 border-l border-white/10">
                        {post.commentsList.map((comment) => (
                          <div key={comment.id} className="flex items-start justify-between gap-3 text-sm py-1.5 group">
                            <div className="min-w-0 space-y-1">
                              <p className="font-sans text-xs text-echo-body">
                                <span className="font-semibold text-echo-heading/90">{comment.author}</span>
                                <span className="text-echo-body/50 text-[10px] ml-2">{comment.createdAt}</span>
                              </p>
                              <p className="font-serif-text text-echo-heading/85 leading-relaxed break-words">
                                {comment.text}
                              </p>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => handleDeleteComment(post.id, comment.id)}
                              disabled={isDeletingCommentId === comment.id}
                              className="rounded-lg p-1.5 text-echo-body/60 hover:bg-red-950/20 hover:text-red-400 transition border border-transparent hover:border-red-900/30 disabled:opacity-50 shrink-0"
                              title="Delete Comment"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
