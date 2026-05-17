import { useEffect, useState } from 'react';
import {
  fetchAllPosts,
  createPost as supabaseCreatePost,
  updatePost as supabaseUpdatePost,
  deletePost as supabaseDeletePost,
  canUserEditPost,
  canUserDeletePost,
} from '../services/supabase.js';

const ADMIN_ID = 'admin-owner';

/**
 * USEPOSTS HOOK - NOW WITH SUPABASE!
 * 
 * This hook manages all blog posts using Supabase cloud database
 * instead of localStorage. Now posts sync across all devices!
 * 
 * The component interface stays the same, so other files don't need changes.
 */
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * On component mount: Fetch all posts from Supabase
   * This runs once when the hook is first used
   */
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchedPosts = await fetchAllPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Failed to load posts:', err);
        setError('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []); // Empty dependency array = runs only once on mount

  /**
   * CREATE POST
   * Adds new post to Supabase database
   * 
   * How it works:
   * 1. Send post data to Supabase
   * 2. Get back the created post with ID
   * 3. Add it to local state (prepend to top)
   * 4. Return the new post
   */
  const createPost = async (post, ownerId = ADMIN_ID) => {
    try {
      const newPost = await supabaseCreatePost(post, ownerId);
      
      if (newPost) {
        // Add to top of posts list
        setPosts((currentPosts) => [newPost, ...currentPosts]);
        return newPost;
      }

      setError('Failed to create post');
      return null;
    } catch (err) {
      console.error('Error in createPost:', err);
      setError('Failed to create post');
      return null;
    }
  };

  /**
   * UPDATE POST
   * Modifies existing post in Supabase
   * 
   * How it works:
   * 1. Send update to Supabase (checks permissions)
   * 2. Get back updated post
   * 3. Replace it in local state
   * 4. Return the updated post
   */
  const updatePost = async (postId, updates, currentUserId = ADMIN_ID) => {
    try {
      const updatedPost = await supabaseUpdatePost(postId, updates, currentUserId);

      if (updatedPost) {
        // Replace post in list
        setPosts((currentPosts) =>
          currentPosts.map((p) => (p.id === postId ? updatedPost : p)),
        );
        return updatedPost;
      }

      setError('Failed to update post');
      return null;
    } catch (err) {
      console.error('Error in updatePost:', err);
      setError('Failed to update post');
      return null;
    }
  };

  /**
   * DELETE POST
   * Removes post from Supabase
   * 
   * How it works:
   * 1. Send delete request to Supabase (checks permissions)
   * 2. If successful, remove from local state
   * 3. Return true/false
   */
  const deletePost = async (postId, currentUserId = ADMIN_ID) => {
    try {
      const success = await supabaseDeletePost(postId, currentUserId);

      if (success) {
        // Remove post from list
        setPosts((currentPosts) => currentPosts.filter((p) => p.id !== postId));
        return true;
      }

      setError('Failed to delete post');
      return false;
    } catch (err) {
      console.error('Error in deletePost:', err);
      setError('Failed to delete post');
      return false;
    }
  };

  /**
   * CHECK IF USER CAN EDIT
   * Validates permission before showing edit button
   */
  const canEditPost = async (postId, currentUserId = ADMIN_ID) => {
    try {
      return await canUserEditPost(postId, currentUserId);
    } catch (err) {
      console.error('Error checking edit permission:', err);
      return false;
    }
  };

  /**
   * CHECK IF USER CAN DELETE
   * Validates permission before showing delete button
   */
  const canDeletePost = async (postId, currentUserId = ADMIN_ID) => {
    try {
      return await canUserDeletePost(postId, currentUserId);
    } catch (err) {
      console.error('Error checking delete permission:', err);
      return false;
    }
  };

  // Return hook interface (same as before, so components don't need changes!)
  return {
    posts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
    canEditPost,
    canDeletePost,
    ADMIN_ID,
  };
}

