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

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage posts={postsState.posts} />} />
        <Route path="/feed" element={<HomeFeedPage posts={postsState.posts} />} />
          <Route
            path="/create"
            element={<CreatePostPage onCreatePost={postsState.createPost} />}
          />
        <Route
          path="/edit/:postId"
          element={
            <CreatePostPage
              posts={postsState.posts}
              onCreatePost={postsState.createPost}
              onUpdatePost={postsState.updatePost}
            />
          }
        />
        <Route
          path="/post/:postId"
          element={
            <BlogDetailPage
              posts={postsState.posts}
              onDeletePost={postsState.deletePost}
            />
          }
        />
        <Route path="/explore" element={<ExplorePage posts={postsState.posts} />} />
      </Routes>
    </AppLayout>
  );
}
