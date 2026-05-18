import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCoverImage } from '../utils/categoryCovers.js';

export default function PremiumEssayCard({ post, index = 0 }) {
  const coverImage = getCoverImage(post.category, post.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/post/${post.id}`} className="group block overflow-hidden">
        <div className="relative overflow-hidden bg-echo-dark/50 rounded-lg border border-echo-light/10 hover:border-echo-light/20 transition-all">
          {/* Image Container */}
          <div className="relative overflow-hidden h-64 md:h-72">
            <motion.img
              src={coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-echo-dark via-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <motion.div
                className="text-xs tracking-widest text-echo-light bg-echo-dark/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-echo-light/20"
                whileHover={{ scale: 1.05 }}
              >
                {post.category}
              </motion.div>
            </div>
          </div>

          {/* Content Container */}
          <div className="p-6 space-y-4">
            {/* Author & Meta */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-echo-light/30 to-echo-light/10 flex items-center justify-center text-xs font-serif-display text-echo-light border border-echo-light/20">
                {post.authorInitials || post.author?.charAt(0) || 'E'}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-echo-light font-medium">{post.author || 'Echo'}</p>
                <p className="truncate text-xs text-echo-light/50">{post.readTime} • {post.createdAt}</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <h3 className="font-serif-display text-xl md:text-2xl leading-tight text-echo-light group-hover:text-echo-light/90 transition-colors">
                {post.title}
              </h3>
            </div>

            {/* Excerpt */}
            <p className="font-serif-text text-sm md:text-base text-echo-light/70 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Read More */}
            <motion.div 
              className="pt-2 text-echo-light/60 group-hover:text-echo-light text-sm font-medium transition-colors flex items-center gap-2"
              whileHover={{ x: 4 }}
            >
              <span>Read Essay</span>
              <span>→</span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
