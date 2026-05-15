import { Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import HomeFeedPage from './pages/HomeFeedPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import { usePosts } from './hooks/usePosts.js';

export default function App() {
  const postsState = usePosts();
  const currentUserId = postsState.ADMIN_ID; // User is always admin (site owner)

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage posts={postsState.posts} />} />
        <Route path="/feed" element={<HomeFeedPage posts={postsState.posts} />} />
        <Route
          path="/create"
          element={
            <CreatePostPage
              onCreatePost={(post) => postsState.createPost(post, currentUserId)}
            />
          }
        />
        <Route
          path="/edit/:postId"
          element={
            <CreatePostPage
              posts={postsState.posts}
              onCreatePost={(post) => postsState.createPost(post, currentUserId)}
              onUpdatePost={(postId, updates) =>
                postsState.updatePost(postId, updates, currentUserId)
              }
              canEdit={(postId) => postsState.canEditPost(postId, currentUserId)}
            />
          }
        />
        <Route
          path="/post/:postId"
          element={
            <BlogDetailPage
              posts={postsState.posts}
              onDeletePost={(postId) => postsState.deletePost(postId, currentUserId)}
              canEdit={(postId) => postsState.canEditPost(postId, currentUserId)}
              canDelete={(postId) => postsState.canDeletePost(postId, currentUserId)}
              currentUserId={currentUserId}
            />
          }
        />
        <Route path="/explore" element={<ExplorePage posts={postsState.posts} />} />
      </Routes>
    </AppLayout>
  );
}
