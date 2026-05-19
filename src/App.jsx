import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from './layouts/AppLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { usePosts } from './hooks/usePosts.js';
import { useAuth } from './hooks/useAuth.js';
import { seedDatabase } from './utils/seedDatabase.js';

function LoadingScreen({ message }) {
  return (
    <div className="grid min-h-screen place-items-center bg-black">
      <p className="font-sans text-echo-body">{message}</p>
    </div>
  );
}

export default function App() {
  const postsState = usePosts();
  const authState = useAuth();
  const isAuthenticated = authState.isAuthenticated;
  const currentUserId = authState.user?.id;
  const currentUserName = authState.user?.name || 'Reader';

  useEffect(() => {
    seedDatabase();
  }, []);

  if (authState.isLoading || postsState.isLoading) {
    return <LoadingScreen message="Loading Echo..." />;
  }

  if (postsState.loadError) {
    return (
      <div className="grid min-h-screen place-items-center bg-black px-6 text-center">
        <div className="max-w-lg space-y-4">
          <h1 className="font-serif-display text-4xl text-echo-heading">Echo</h1>
          <p className="font-sans text-echo-body">{postsState.loadError}</p>
          <p className="font-sans text-sm text-echo-body/80">
            In the project folder, run <code className="text-echo-heading">npm run dev</code> and
            open the Local URL Vite prints (usually http://localhost:5173).
          </p>
        </div>
      </div>
    );
  }

  const detailPage = (
    <BlogDetailPage
      posts={postsState.posts}
      onDeletePost={
        isAuthenticated
          ? (postId) => postsState.deletePost(postId, currentUserId)
          : undefined
      }
      onUpvote={(postId) => postsState.upvotePost(postId)}
      onComment={(postId, text, author) => postsState.addComment(postId, text, author, currentUserId)}
      onDeleteComment={
        isAuthenticated
          ? (postId, commentId) => postsState.deleteComment(postId, commentId)
          : undefined
      }
      canEdit={
        isAuthenticated
          ? async (postId) => authState.user?.isAdmin || postsState.canEditPost(postId, currentUserId)
          : undefined
      }
      canDelete={
        isAuthenticated
          ? async (postId) => authState.user?.isAdmin || postsState.canDeletePost(postId, currentUserId)
          : undefined
      }
      currentUserId={currentUserId}
      currentUserName={currentUserName}
      isGuest={!isAuthenticated}
      isAdmin={authState.user?.isAdmin || false}
    />
  );

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const routesContent = (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage onLogin={authState.login} onSignup={authState.signup} />
          )
        }
      />
      <Route
        path="/"
        element={<LandingPage posts={postsState.posts} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path="/explore"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ExplorePage posts={postsState.posts} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feed"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Navigate to="/explore" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post/:postId"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            {detailPage}
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog/:postId"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            {detailPage}
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CreatePostPage
              user={authState.user}
              onCreatePost={(post) => postsState.createPost(post, currentUserId)}
              onUpdatePost={(postId, updates) =>
                postsState.updatePost(postId, updates, currentUserId)
              }
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:postId"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CreatePostPage
              user={authState.user}
              posts={postsState.posts}
              onCreatePost={(post) => postsState.createPost(post, currentUserId)}
              onUpdatePost={(postId, updates) =>
                postsState.updatePost(postId, updates, currentUserId)
              }
              canEdit={async (postId) => authState.user?.isAdmin || postsState.canEditPost(postId, currentUserId)}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            {authState.user?.isAdmin ? (
              <AdminPage postsState={postsState} />
            ) : (
              <Navigate to="/feed" replace />
            )}
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  if (isLoginPage) {
    return routesContent;
  }

  return (
    <AppLayout user={authState.user} onLogout={authState.logout} isGuest={!isAuthenticated}>
      {routesContent}
    </AppLayout>
  );
}



