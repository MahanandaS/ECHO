/**
 * SUPABASE SERVICE FILE
 * 
 * This file handles all communication with the Supabase database.
 * Think of it as the "bridge" between your React components and the database.
 * 
 * Each function here:
 * - Talks to Supabase
 * - Returns data or errors
 * - Uses async/await (modern JavaScript)
 */

import { createClient } from '@supabase/supabase-js';
import { seedPosts } from '../data/seedPosts.js';

// Initialize Supabase client
// These values come from your .env.local file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if credentials are not properly configured
let supabase;

// Helper function to generate a simple UUID-like ID for mock posts
const generateMockId = () => {
  return 'post_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

// Shared mock posts storage that persists across multiple calls
let sharedMockPosts = [...seedPosts];

// Helper function to create a chainable mock query object
const createMockQueryBuilder = (data = []) => {
  return {
    select: function() { return createMockQueryBuilder(data); },
    insert: function(insertData) { 
      const newData = Array.isArray(insertData) ? insertData : [insertData];
      // Add IDs to new posts if they don't have them
      const dataWithIds = newData.map(item => ({
        ...item,
        id: item.id || generateMockId(),
        created_at: item.created_at || new Date().toISOString(),
      }));
      return {
        select: function() { 
          return Promise.resolve({ data: dataWithIds, error: null }); 
        },
        then: function(cb) { return Promise.resolve({ data: dataWithIds, error: null }).then(cb); },
        catch: function(cb) { return Promise.resolve({ data: dataWithIds, error: null }).catch(cb); },
      };
    },
    update: function(updates) { 
      return {
        eq: function() { 
          return {
            select: function() { 
              return Promise.resolve({ data: updates, error: null }); 
            },
            single: function() {
              return Promise.resolve({ data: updates, error: null });
            },
            then: function(cb) { return Promise.resolve({ data: updates, error: null }).then(cb); },
            catch: function(cb) { return Promise.resolve({ data: updates, error: null }).catch(cb); },
          };
        },
      };
    },
    delete: function() { 
      return {
        eq: function() { 
          return Promise.resolve({ data: null, error: null }); 
        },
        then: function(cb) { return Promise.resolve({ data: null, error: null }).then(cb); },
        catch: function(cb) { return Promise.resolve({ data: null, error: null }).catch(cb); },
      };
    },
    eq: function(field, value) { 
      // Filter data based on the eq condition
      const filtered = data.filter(item => item[field] === value);
      return createMockQueryBuilder(filtered); 
    },
    match: function() { return createMockQueryBuilder(data); },
    order: function() { return createMockQueryBuilder(data); },
    limit: function() { return createMockQueryBuilder(data); },
    single: function() { 
      return Promise.resolve({ data: data && data.length > 0 ? data[0] : null, error: null }); 
    },
    then: function(cb) { 
      return Promise.resolve({ data: data, error: null }).then(cb); 
    },
    catch: function(cb) { 
      return Promise.resolve({ data: data, error: null }).catch(cb); 
    },
  };
};

try {
  // Check if credentials are valid (not placeholder values)
  if (supabaseUrl && supabaseAnonKey && 
      !supabaseUrl.includes('your_supabase') && 
      !supabaseAnonKey.includes('your_supabase') &&
      supabaseUrl.startsWith('http')) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase initialized with real credentials');
  } else {
    console.warn('Supabase credentials not configured. Using mock data.');
    
    // Create a mock supabase object for development
    supabase = {
      from: (table) => {
        // For posts table, return mock posts with proper chaining
        if (table === 'posts') {
          return {
            select: function() { return createMockQueryBuilder(sharedMockPosts); },
            insert: function(insertData) { 
              const newData = Array.isArray(insertData) ? insertData : [insertData];
              // Add IDs to new posts if they don't have them
              const dataWithIds = newData.map(item => ({
                ...item,
                id: item.id || generateMockId(),
                created_at: item.created_at || new Date().toISOString(),
              }));
              // Add to shared mock posts
              sharedMockPosts = [...sharedMockPosts, ...dataWithIds];
              return {
                select: function() { 
                  return Promise.resolve({ data: dataWithIds, error: null }); 
                },
                then: function(cb) { return Promise.resolve({ data: dataWithIds, error: null }).then(cb); },
                catch: function(cb) { return Promise.resolve({ data: dataWithIds, error: null }).catch(cb); },
              };
            },
            update: function(updates) { 
              return {
                eq: function(field, value) { 
                  const postIndex = sharedMockPosts.findIndex(p => p[field] === value);
                  const updatedPost = postIndex !== -1 ? { ...sharedMockPosts[postIndex], ...updates } : null;
                  if (postIndex !== -1) {
                    sharedMockPosts[postIndex] = updatedPost;
                  }
                  return {
                    select: function() { 
                      return Promise.resolve({ data: updatedPost, error: null }); 
                    },
                    single: function() {
                      return Promise.resolve({ data: updatedPost, error: null });
                    },
                    then: function(cb) { return Promise.resolve({ data: updatedPost, error: null }).then(cb); },
                    catch: function(cb) { return Promise.resolve({ data: updatedPost, error: null }).catch(cb); },
                  };
                },
              };
            },
            delete: function() { 
              return {
                eq: function(field, value) { 
                  const initialLength = sharedMockPosts.length;
                  sharedMockPosts = sharedMockPosts.filter(p => p[field] !== value);
                  const success = sharedMockPosts.length < initialLength;
                  return Promise.resolve({ data: null, error: null }); 
                },
                then: function(cb) { return Promise.resolve({ data: null, error: null }).then(cb); },
                catch: function(cb) { return Promise.resolve({ data: null, error: null }).catch(cb); },
              };
            },
            eq: function(field, value) { 
              // Filter data based on the eq condition
              const filtered = sharedMockPosts.filter(item => item[field] === value);
              return createMockQueryBuilder(filtered); 
            },
            order: function() { return createMockQueryBuilder(sharedMockPosts); },
          };
        }
        return createMockQueryBuilder([]);
      },
      auth: {
        signUp: async () => ({ data: null, error: new Error('Auth not configured') }),
        signInWithPassword: async () => ({ data: null, error: new Error('Auth not configured') }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: null, subscription: { unsubscribe: () => {} } }),
      },
    };
  }
} catch (error) {
  console.error('Error initializing Supabase:', error);
  
  // Fallback to mock client
  supabase = {
    from: (table) => {
      if (table === 'posts') {
        return {
          select: function() { return createMockQueryBuilder(sharedMockPosts); },
          insert: function(insertData) { 
            const newData = Array.isArray(insertData) ? insertData : [insertData];
            const dataWithIds = newData.map(item => ({
              ...item,
              id: item.id || generateMockId(),
              created_at: item.created_at || new Date().toISOString(),
            }));
            sharedMockPosts = [...sharedMockPosts, ...dataWithIds];
            return {
              select: function() { 
                return Promise.resolve({ data: dataWithIds, error: null }); 
              },
              then: function(cb) { return Promise.resolve({ data: dataWithIds, error: null }).then(cb); },
              catch: function(cb) { return Promise.resolve({ data: dataWithIds, error: null }).catch(cb); },
            };
          },
          update: function(updates) { 
            return {
              eq: function(field, value) { 
                const postIndex = sharedMockPosts.findIndex(p => p[field] === value);
                const updatedPost = postIndex !== -1 ? { ...sharedMockPosts[postIndex], ...updates } : null;
                if (postIndex !== -1) {
                  sharedMockPosts[postIndex] = updatedPost;
                }
                return {
                  select: function() { 
                    return Promise.resolve({ data: updatedPost, error: null }); 
                  },
                  single: function() {
                    return Promise.resolve({ data: updatedPost, error: null });
                  },
                  then: function(cb) { return Promise.resolve({ data: updatedPost, error: null }).then(cb); },
                  catch: function(cb) { return Promise.resolve({ data: updatedPost, error: null }).catch(cb); },
                };
              },
            };
          },
          delete: function() { 
            return {
              eq: function(field, value) { 
                const initialLength = sharedMockPosts.length;
                sharedMockPosts = sharedMockPosts.filter(p => p[field] !== value);
                return Promise.resolve({ data: null, error: null }); 
              },
              then: function(cb) { return Promise.resolve({ data: null, error: null }).then(cb); },
              catch: function(cb) { return Promise.resolve({ data: null, error: null }).catch(cb); },
            };
          },
          eq: function(field, value) { 
            const filtered = sharedMockPosts.filter(item => item[field] === value);
            return createMockQueryBuilder(filtered); 
          },
          order: function() { return createMockQueryBuilder(sharedMockPosts); },
        };
      }
      return createMockQueryBuilder([]);
    },
    auth: {
      signUp: async () => ({ data: null, error: new Error('Auth not configured') }),
      signInWithPassword: async () => ({ data: null, error: new Error('Auth not configured') }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: null, subscription: { unsubscribe: () => {} } }),
    },
  };
}

export { supabase };

/**
 * HELPER FUNCTION: Estimate reading time
 * Counts words and divides by average reading speed (180 words/min)
 */
const estimateReadTime = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 180))} min read`;
};

/**
 * FETCH ALL POSTS
 * Gets all posts from the database, sorted by newest first
 * 
 * Returns: Array of posts or empty array if error
 */
export const fetchAllPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false }); // Newest first

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    // Transform database format to component format
    return data.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      author: post.author,
      authorBio: post.author_bio,
      authorInitials: post.author_initials,
      ownerId: post.owner_id,
      createdAt: new Date(post.created_at).toLocaleDateString(),
      updatedAt: post.updated_at ? new Date(post.updated_at).toLocaleDateString() : null,
      readTime: estimateReadTime(`${post.title} ${post.content}`),
      featured: post.featured || false,
    }));
  } catch (error) {
    console.error('Unexpected error fetching posts:', error);
    return [];
  }
};

/**
 * CREATE NEW POST
 * Adds a new post to the database
 * 
 * Parameters:
 * - post: { title, excerpt, content, category, image, author, authorBio, authorInitials }
 * - ownerId: Who created this post (user ID or 'admin-owner')
 * 
 * Returns: Created post with ID or null if error
 */
export const createPost = async (post, ownerId = 'admin-owner') => {
  try {
    // Prepare data for database (convert camelCase to snake_case)
    const postData = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      author: post.author,
      author_bio: post.authorBio || 'Writer',
      author_initials: post.authorInitials || post.author.charAt(0).toUpperCase(),
      owner_id: ownerId,
      featured: false,
      created_at: new Date().toISOString(),
    };

    // Insert into database
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select(); // Return created post

    if (error) {
      console.error('Error creating post:', error);
      return null;
    }

    // Transform response to component format
    if (data && data[0]) {
      return {
        id: data[0].id,
        title: data[0].title,
        excerpt: data[0].excerpt,
        content: data[0].content,
        category: data[0].category,
        image: data[0].image,
        author: data[0].author,
        authorBio: data[0].author_bio,
        authorInitials: data[0].author_initials,
        ownerId: data[0].owner_id,
        createdAt: 'Just now',
        readTime: estimateReadTime(`${data[0].title} ${data[0].content}`),
        featured: false,
      };
    }

    return null;
  } catch (error) {
    console.error('Unexpected error creating post:', error);
    return null;
  }
};

/**
 * UPDATE EXISTING POST
 * Modifies a post (only if user owns it or is admin)
 * 
 * Parameters:
 * - postId: ID of post to update
 * - updates: Object with fields to update { title, content, etc }
 * - currentUserId: The user making the request
 * 
 * Returns: Updated post or null if error
 */
export const updatePost = async (postId, updates, currentUserId = 'admin-owner') => {
  try {
    // First, check if user owns this post
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('owner_id')
      .eq('id', postId)
      .single();

    if (fetchError || !existingPost) {
      console.error('Post not found');
      return null;
    }

    // Check permissions
    if (existingPost.owner_id !== currentUserId && currentUserId !== 'admin-owner') {
      console.error('You do not have permission to edit this post');
      return null;
    }

    // Prepare update data
    const updateData = {
      title: updates.title,
      excerpt: updates.excerpt,
      content: updates.content,
      category: updates.category,
      image: updates.image,
      updated_at: new Date().toISOString(),
    };

    // Update in database
    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postId)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
      return null;
    }

    // Transform response
    if (data) {
      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        image: data.image,
        author: data.author,
        authorBio: data.author_bio,
        authorInitials: data.author_initials,
        ownerId: data.owner_id,
        createdAt: new Date(data.created_at).toLocaleDateString(),
        updatedAt: 'Updated just now',
        readTime: estimateReadTime(`${data.title} ${data.content}`),
        featured: data.featured,
      };
    }

    return null;
  } catch (error) {
    console.error('Unexpected error updating post:', error);
    return null;
  }
};

/**
 * DELETE POST
 * Removes a post from database (only if user owns it or is admin)
 * 
 * Parameters:
 * - postId: ID of post to delete
 * - currentUserId: The user making the request
 * 
 * Returns: true if deleted, false if error
 */
export const deletePost = async (postId, currentUserId = 'admin-owner') => {
  try {
    // Check if user owns this post
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('owner_id')
      .eq('id', postId)
      .single();

    if (fetchError || !existingPost) {
      console.error('Post not found');
      return false;
    }

    // Check permissions
    if (existingPost.owner_id !== currentUserId && currentUserId !== 'admin-owner') {
      console.error('You do not have permission to delete this post');
      return false;
    }

    // Delete from database
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Error deleting post:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting post:', error);
    return false;
  }
};

/**
 * CHECK IF USER CAN EDIT POST
 * 
 * Parameters:
 * - postId: ID of post to check
 * - currentUserId: The user making the request
 * 
 * Returns: true if user can edit, false otherwise
 */
export const canUserEditPost = async (postId, currentUserId) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('owner_id')
      .eq('id', postId)
      .single();

    if (error || !data) return false;
    
    return data.owner_id === currentUserId || currentUserId === 'admin-owner';
  } catch (error) {
    console.error('Error checking edit permission:', error);
    return false;
  }
};

/**
 * CHECK IF USER CAN DELETE POST
 * 
 * Parameters:
 * - postId: ID of post to check
 * - currentUserId: The user making the request
 * 
 * Returns: true if user can delete, false otherwise
 */
export const canUserDeletePost = async (postId, currentUserId) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('owner_id')
      .eq('id', postId)
      .single();

    if (error || !data) return false;
    
    return data.owner_id === currentUserId || currentUserId === 'admin-owner';
  } catch (error) {
    console.error('Error checking delete permission:', error);
    return false;
  }
};
