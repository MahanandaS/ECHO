import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import { seedPosts } from '../data/seedPosts.js';

/**
 * SEED DATABASE
 * Adds sample posts to Firestore if they don't already exist
 * This ensures the home page displays 4-5 sample blogs
 */
export async function seedDatabase() {
  if (!db) return;

  try {
    const postsCollection = collection(db, 'posts');
    const snapshot = await getDocs(postsCollection);
    
    console.log(`📊 Current posts in database: ${snapshot.size}`);
    
    // If posts already exist, don't seed again
    if (snapshot.size > 0) {
      console.log('✅ Database already has posts. Skipping seed.');
      return;
    }
    
    console.log('🌱 Seeding database with sample posts...');
    
    // Add each seed post to Firestore
    let addedCount = 0;
    for (const post of seedPosts) {
      const postData = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        image: post.image || '', // Use empty string if no image
        author: post.author,
        authorInitials: post.authorInitials,
        authorBio: post.authorBio || 'Writer',
        ownerId: post.ownerId,
        readTime: post.readTime,
        featured: post.featured === true,
        likes: 0,
        comments: 0,
        isLiked: false,
        commentsList: [],
        createdAt: new Date(),
        updatedAt: null,
      };
      
      try {
        const docRef = await addDoc(postsCollection, postData);
        addedCount++;
        console.log(`✅ Added (${addedCount}): ${post.title} [${docRef.id}]`);
      } catch (error) {
        console.error(`❌ Failed to add "${post.title}":`, error.message);
      }
    }
    
    console.log(`✅ Database seeding complete! Added ${addedCount}/${seedPosts.length} posts`);
  } catch (error) {
    console.error('🔥 Error seeding database:', error);
  }
}
