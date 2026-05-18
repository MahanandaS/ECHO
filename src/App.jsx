import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from './layouts/AppLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import HomeFeedPage from './pages/HomeFeedPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import { usePosts } from './hooks/usePosts.js';
import { useAuth } from './hooks/useAuth.js';
import { seedDatabase } from './utils/seedDatabase.js';

export default function App() {
  const postsState = usePosts();
  const authState = useAuth();

  // Seed database on first load
  useEffect(() => {
    seedDatabase();
  }, []);

  if (authState.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-black">
        <div className="text-center">
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login page on all routes except /login
  if (!authState.isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={authState.login} onSignup={authState.signup} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // User is authenticated, show app with protected routes
  const currentUserId = authState.user.id;

  // Show loading state while posts are loading from Supabase
  if (postsState.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-black">
        <div className="text-center">
          <p className="text-echo-light/60 font-serif-text">Loading your essays...</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout user={authState.user} onLogout={authState.logout}>
      <Routes>
        <Route path="/" element={<LandingPage posts={postsState.posts} />} />
        <Route path="/feed" element={<HomeFeedPage posts={postsState.posts} />} />
        <Route
          path="/create"
          element={
            <CreatePostPage
              user={authState.user}
              // Pass async post creation function
              onCreatePost={(post) => postsState.createPost(post, currentUserId)}
              onUpdatePost={(postId, updates) =>
                postsState.updatePost(postId, updates, currentUserId)
              }
            />
          }
        />
        <Route
          path="/edit/:postId"
          element={
            <CreatePostPage
              user={authState.user}
              posts={postsState.posts}
              onCreatePost={(post) => postsState.createPost(post, currentUserId)}
              onUpdatePost={(postId, updates) =>
                postsState.updatePost(postId, updates, currentUserId)
              }
              canEdit={async (postId) => postsState.canEditPost(postId, currentUserId)}
            />
          }
        />
        <Route
          path="/post/:postId"
          element={
            <BlogDetailPage
              posts={postsState.posts}
              onDeletePost={(postId) => postsState.deletePost(postId, currentUserId)}
              onLike={(postId) => postsState.likePost(postId)}
              onComment={(postId, comment) => postsState.addComment(postId, comment)}
              canEdit={async (postId) => postsState.canEditPost(postId, currentUserId)}
              canDelete={async (postId) => postsState.canDeletePost(postId, currentUserId)}
              currentUserId={currentUserId}
            />
          }
        />
        <Route path="/explore" element={<ExplorePage posts={postsState.posts} />} />
      </Routes>
    </AppLayout>
  );
}
