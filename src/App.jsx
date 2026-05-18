import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from './layouts/AppLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
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
      onComment={(postId, text, author) => postsState.addComment(postId, text, author)}
      canEdit={
        isAuthenticated
          ? async (postId) => postsState.canEditPost(postId, currentUserId)
          : undefined
      }
      canDelete={
        isAuthenticated
          ? async (postId) => postsState.canDeletePost(postId, currentUserId)
          : undefined
      }
      currentUserId={currentUserId}
      currentUserName={currentUserName}
      isGuest={!isAuthenticated}
    />
  );

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={authState.login} onSignup={authState.signup} />}
        />
        <Route
          path="/"
          element={
            <AppLayout isGuest>
              <LandingPage posts={postsState.posts} />
            </AppLayout>
          }
        />
        <Route
          path="/explore"
          element={
            <AppLayout isGuest>
              <ExplorePage posts={postsState.posts} />
            </AppLayout>
          }
        />
        <Route
          path="/post/:postId"
          element={<AppLayout isGuest>{detailPage}</AppLayout>}
        />
        <Route path="/create" element={<Navigate to="/login" replace />} />
        <Route path="/edit/:postId" element={<Navigate to="/login" replace />} />
        <Route path="/feed" element={<Navigate to="/explore" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AppLayout user={authState.user} onLogout={authState.logout}>
      <Routes>
        <Route path="/" element={<LandingPage posts={postsState.posts} />} />
        <Route path="/explore" element={<ExplorePage posts={postsState.posts} />} />
        <Route path="/post/:postId" element={detailPage} />
        <Route
          path="/create"
          element={
            <CreatePostPage
              user={authState.user}
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
        <Route path="/feed" element={<Navigate to="/explore" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
