import { useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase.js';

const ADMIN_ID = 'admin-owner';

/**
 * USEPOSTS HOOK - NOW WITH FIREBASE FIRESTORE!
 * 
 * This hook manages all blog posts using Firebase Firestore cloud database.
 * Posts are saved to the cloud and sync across all devices automatically!
 * 
 * How it works:
 * 1. On app load: Fetch all posts from Firestore
 * 2. On create: Save new post to Firestore and update local state
 * 3. On update: Update post in Firestore and update local state
 * 4. On delete: Remove post from Firestore and update local state
 */
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * FETCH ALL POSTS FROM FIRESTORE
   * This runs once when the app loads (when this hook is first used)
   */
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get the 'posts' collection from Firestore
        const postsCollection = collection(db, 'posts');
        
        // Fetch all documents from the posts collection
        const snapshot = await getDocs(postsCollection);
        
        // Convert Firestore documents to an array we can use
        const fetchedPosts = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id, // Use Firestore document ID
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            image: data.image,
            author: data.author,
            authorBio: data.authorBio || 'Writer',
            authorInitials: data.authorInitials,
            ownerId: data.ownerId,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Just now',
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toLocaleDateString() : null,
            readTime: data.readTime || '1 min read',
            featured: data.featured || false,
            likes: data.likes || 0,
            comments: data.comments || 0,
            isLiked: data.isLiked || false,
            commentsList: data.commentsList || [],
          };
        });
        
        // Sort by newest first
        fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Failed to load posts from Firestore:', err);
        setError('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []); // Empty dependency array = runs only once on mount

  /**
   * CREATE POST
   * Adds a new post to Firestore
   * 
   * How it works:
   * 1. Add the post to Firestore cloud database
   * 2. Firestore returns the new post with an ID
   * 3. Add it to local state (show at top of list)
   * 4. Return the new post
   */
  const createPost = async (post, ownerId = ADMIN_ID) => {
    try {
      // Prepare the data to save
      const postData = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        image: post.image,
        author: post.author,
        authorBio: post.authorBio || 'Writer',
        authorInitials: post.authorInitials || post.author.charAt(0).toUpperCase(),
        ownerId: ownerId,
        featured: false,
        createdAt: serverTimestamp(), // Firebase server time
        updatedAt: null,
      };

      // Add to Firestore 'posts' collection
      // addDoc automatically creates a new document with a unique ID
      const docRef = await addDoc(collection(db, 'posts'), postData);
      
      // Create the post object to return
      const newPost = {
        id: docRef.id, // Use the ID that Firestore created
        ...post,
        ownerId: ownerId,
        createdAt: 'Just now',
        readTime: '1 min read',
        featured: false,
      };
      
      // Add to the top of our local posts list
      setPosts((currentPosts) => [newPost, ...currentPosts]);
      
      console.log('✅ Post created in Firestore:', docRef.id);
      return newPost;
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
      return null;
    }
  };

  /**
   * UPDATE POST
   * Modifies an existing post in Firestore
   * 
   * How it works:
   * 1. Update the post in Firestore
   * 2. Update it in local state
   * 3. Return the updated post
   */
  const updatePost = async (postId, updates, currentUserId = ADMIN_ID) => {
    try {
      // Get reference to the post in Firestore
      const postRef = doc(db, 'posts', postId);
      
      // Data to update (add update timestamp)
      const updateData = {
        title: updates.title,
        excerpt: updates.excerpt,
        content: updates.content,
        category: updates.category,
        image: updates.image,
        updatedAt: serverTimestamp(),
      };
      
      // Update the post in Firestore
      await updateDoc(postRef, updateData);
      
      // Update in local state
      setPosts((currentPosts) =>
        currentPosts.map((p) => 
          p.id === postId 
            ? { ...p, ...updates, updatedAt: 'Updated just now' } 
            : p
        ),
      );
      
      console.log('✅ Post updated in Firestore:', postId);
      return { id: postId, ...updates };
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post');
      return null;
    }
  };

  /**
   * DELETE POST
   * Removes a post from Firestore
   * 
   * How it works:
   * 1. Delete the post from Firestore
   * 2. Remove it from local state
   * 3. Return true/false for success
   */
  const deletePost = async (postId, currentUserId = ADMIN_ID) => {
    try {
      // Get reference to the post in Firestore
      const postRef = doc(db, 'posts', postId);
      
      // Delete from Firestore
      await deleteDoc(postRef);
      
      // Remove from local state
      setPosts((currentPosts) => currentPosts.filter((p) => p.id !== postId));
      
      console.log('✅ Post deleted from Firestore:', postId);
      return true;
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
      return false;
    }
  };

  /**
   * LIKE POST
   * Toggles like status for a post (stored in local state only)
   * Can be extended to save to Firestore with subcollections if needed
   */
  const likePost = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: p.isLiked ? (p.likes || 1) - 1 : (p.likes || 0) + 1,
            isLiked: !p.isLiked,
          };
        }
        return p;
      })
    );
  };

  /**
   * ADD COMMENT
   * Adds a comment to a post (stored in local state)
   * Can be extended to save to Firestore with subcollections if needed
   */
  const addComment = (postId, commentText) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: Date.now().toString(),
            text: commentText,
            author: 'Reader',
            createdAt: new Date().toLocaleDateString(),
          };
          return {
            ...p,
            comments: (p.comments || 0) + 1,
            commentsList: [...(p.commentsList || []), newComment],
          };
        }
        return p;
      })
    );
  };

  /**
   * CHECK IF USER CAN EDIT
   * Validates permission before showing edit button
   */
  const canEditPost = async (postId, currentUserId = ADMIN_ID) => {
    try {
      // Find the post in our local state
      const post = posts.find(p => p.id === postId);
      
      // Allow if user is the owner or admin
      return post && (post.ownerId === currentUserId || currentUserId === ADMIN_ID);
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
      // Find the post in our local state
      const post = posts.find(p => p.id === postId);
      
      // Allow if user is the owner or admin
      return post && (post.ownerId === currentUserId || currentUserId === ADMIN_ID);
    } catch (err) {
      console.error('Error checking delete permission:', err);
      return false;
    }
  };

  // Return hook interface with new like/comment methods
  return {
    posts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    canEditPost,
    canDeletePost,
    ADMIN_ID,
  };
}

