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

const FIREBASE_SETUP_MESSAGE =
  'Firebase is not configured. Create .env.local from .env.example, add your keys, then restart the dev server.';

const ADMIN_ID = 'admin-owner';

const mapFirestorePost = (docSnap) => {
  const data = docSnap.data();
  const createdAtMs = data.createdAt?.toMillis?.() ?? data.createdAtMs ?? 0;

  return {
    id: docSnap.id,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    image: data.image,
    author: data.author,
    authorBio: data.authorBio || 'Writer',
    authorInitials: data.authorInitials,
    ownerId: data.ownerId,
    createdAtMs,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toLocaleDateString()
      : data.createdAtLabel || 'Just now',
    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toLocaleDateString() : null,
    readTime: data.readTime || '1 min read',
    featured: data.featured || false,
    upvotes: data.upvotes ?? data.likes ?? 0,
    isUpvoted: false,
    commentsList: Array.isArray(data.commentsList) ? data.commentsList : [],
  };
};

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
  const [loadError, setLoadError] = useState(null);
  const [error, setError] = useState(null);

  /**
   * FETCH ALL POSTS FROM FIRESTORE
   * This runs once when the app loads (when this hook is first used)
   */
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        if (!db) {
          setLoadError(FIREBASE_SETUP_MESSAGE);
          setPosts([]);
          return;
        }

        const postsCollection = collection(db, 'posts');
        
        // Fetch all documents from the posts collection
        const snapshot = await getDocs(postsCollection);
        
        // Convert Firestore documents to an array we can use
        const fetchedPosts = snapshot.docs.map(mapFirestorePost);

        fetchedPosts.sort((a, b) => b.createdAtMs - a.createdAtMs);
        
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Failed to load posts from Firestore:', err);
        setLoadError('Failed to load posts. Check your connection and Firebase setup.');
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
    if (!db) return null;

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
        upvotes: 0,
        commentsList: [],
        createdAt: serverTimestamp(),
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
    if (!db) return null;

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
    if (!db) return false;

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

  const upvotePost = async (postId) => {
    if (!db) return;

    let payload = null;

    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.id !== postId) return p;
        const isUpvoted = !p.isUpvoted;
        const upvotes = Math.max(0, (p.upvotes || 0) + (isUpvoted ? 1 : -1));
        payload = { upvotes, isUpvoted };
        return { ...p, isUpvoted, upvotes };
      }),
    );

    if (!payload) return;

    try {
      await updateDoc(doc(db, 'posts', postId), {
        upvotes: payload.upvotes,
      });
    } catch (err) {
      console.error('Error saving upvote:', err);
      setError('Failed to save upvote');
    }
  };

  const addComment = async (postId, commentText, author = 'Reader') => {
    if (!db) return;

    const newComment = {
      id: `c-${Date.now()}`,
      text: commentText,
      author,
      createdAt: new Date().toLocaleDateString(),
    };

    let commentsList = null;

    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if (p.id !== postId) return p;
        commentsList = [...(p.commentsList || []), newComment];
        return { ...p, commentsList };
      }),
    );

    if (!commentsList) return;

    try {
      await updateDoc(doc(db, 'posts', postId), { commentsList });
    } catch (err) {
      console.error('Error saving comment:', err);
      setError('Failed to save comment');
    }
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
    loadError,
    error,
    createPost,
    updatePost,
    deletePost,
    upvotePost,
    addComment,
    canEditPost,
    canDeletePost,
    ADMIN_ID,
  };
}

