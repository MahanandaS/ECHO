import { useEffect, useState } from 'react';
import { seedPosts } from '../data/seedPosts.js';

const POSTS_STORAGE_KEY = 'echo.anonymous.posts.v1';
const ADMIN_ID = 'admin-owner';

const estimateReadTime = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 180))} min read`;
};

const createId = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `post-${Date.now()}`;
};

const loadPosts = () => {
  try {
    const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
    return storedPosts ? JSON.parse(storedPosts) : seedPosts;
  } catch {
    return seedPosts;
  }
};

export function usePosts() {
  const [posts, setPosts] = useState(loadPosts);

  useEffect(() => {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const createPost = (post, ownerId = ADMIN_ID) => {
    const newPost = {
      ...post,
      id: createId(),
      ownerId,
      author: ownerId === ADMIN_ID ? 'Admin' : 'Anonymous',
      authorBio: ownerId === ADMIN_ID ? 'Site Administrator' : 'Anonymous voice on Echo',
      authorInitials: ownerId === ADMIN_ID ? 'A' : '?',
      createdAt: 'Just now',
      readTime: estimateReadTime(`${post.title} ${post.content}`),
      featured: false,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    return newPost;
  };

  const updatePost = (postId, updates, currentUserId = ADMIN_ID) => {
    const existingPost = posts.find((post) => post.id === postId);
    if (!existingPost) {
      return null;
    }

    // Check ownership - only allow owner or admin
    if (existingPost.ownerId !== currentUserId && currentUserId !== ADMIN_ID) {
      console.warn('User not authorized to update this post');
      return null;
    }

    const updatedPost = {
      ...existingPost,
      ...updates,
      ownerId: existingPost.ownerId,
      author: existingPost.ownerId === ADMIN_ID ? 'Admin' : 'Anonymous',
      authorBio: existingPost.ownerId === ADMIN_ID ? 'Site Administrator' : 'Anonymous voice on Echo',
      authorInitials: existingPost.ownerId === ADMIN_ID ? 'A' : '?',
      readTime: estimateReadTime(`${updates.title || existingPost.title} ${updates.content || existingPost.content}`),
      updatedAt: 'Updated just now',
    };

    setPosts((currentPosts) =>
      currentPosts.map((post) => (post.id === postId ? updatedPost : post)),
    );

    return updatedPost;
  };

  const deletePost = (postId, currentUserId = ADMIN_ID) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) {
      return false;
    }

    // Check ownership - only allow owner or admin
    if (post.ownerId !== currentUserId && currentUserId !== ADMIN_ID) {
      console.warn('User not authorized to delete this post');
      return false;
    }

    setPosts((currentPosts) => currentPosts.filter((p) => p.id !== postId));
    return true;
  };

  const canEditPost = (postId, currentUserId = ADMIN_ID) => {
    const post = posts.find((p) => p.id === postId);
    return post && (post.ownerId === currentUserId || currentUserId === ADMIN_ID);
  };

  const canDeletePost = (postId, currentUserId = ADMIN_ID) => {
    const post = posts.find((p) => p.id === postId);
    return post && (post.ownerId === currentUserId || currentUserId === ADMIN_ID);
  };

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
    canEditPost,
    canDeletePost,
    ADMIN_ID,
  };
}
