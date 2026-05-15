import { useEffect, useState } from 'react';
import { seedPosts } from '../data/seedPosts.js';

const POSTS_STORAGE_KEY = 'echo.posts';

const estimateReadTime = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 180))} min read`;
};

const getInitials = (name) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
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

  const createPost = (post) => {
    const newPost = {
      ...post,
      id: createId(),
      author: post.author || 'Guest Writer',
      authorBio: post.authorBio || 'Writer on Echo',
      authorInitials: post.authorInitials || getInitials(post.author || 'Guest Writer'),
      createdAt: 'Just now',
      readTime: estimateReadTime(`${post.title} ${post.content}`),
      featured: false,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    return newPost;
  };

  const updatePost = (postId, updates) => {
    const existingPost = posts.find((post) => post.id === postId);
    if (!existingPost) {
      return null;
    }

    const updatedPost = {
      ...existingPost,
      ...updates,
      author: updates.author || existingPost.author || 'Guest Writer',
      authorBio: updates.authorBio || existingPost.authorBio || 'Writer on Echo',
      authorInitials:
        updates.authorInitials ||
        existingPost.authorInitials ||
        getInitials(updates.author || existingPost.author || 'Guest Writer'),
      readTime: estimateReadTime(`${updates.title || existingPost.title} ${updates.content || existingPost.content}`),
      updatedAt: 'Updated just now',
    };

    setPosts((currentPosts) =>
      currentPosts.map((post) => (post.id === postId ? updatedPost : post)),
    );

    return updatedPost;
  };

  const deletePost = (postId) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
  };

  return { posts, createPost, updatePost, deletePost };
}
