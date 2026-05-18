import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCoverImage } from '../utils/categoryCovers.js';

export default function FeaturedEssayCard({ post }) {
  if (!post) return null;

  const coverImage = getCoverImage(post.category, post.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Link to={`/post/${post.id}`} className="group block">
        <div className="relative overflow-hidden rounded-xl border border-echo-light/10 hover:border-echo-light/20 transition-all">
          {/* Image Container */}
          <div className="relative overflow-hidden h-96 md:h-[500px]">
            <motion.img
              src={coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            {/* Deep Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-echo-dark via-echo-dark/50 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
            {/* Category */}
            <motion.div
              className="self-start"
              whileHover={{ scale: 1.05 }}
            >
              <div className="inline-block text-xs tracking-widest text-echo-light bg-echo-dark/70 backdrop-blur-md px-4 py-2 rounded-full border border-echo-light/20">
                FEATURED • {post.category}
              </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl leading-tight text-echo-light">
                  {post.title}
                </h2>
                <p className="font-serif-text text-lg md:text-xl text-echo-light/80 max-w-2xl leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Author & Meta */}
              <div className="flex items-center gap-4 pt-6 border-t border-echo-light/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-echo-light/30 to-echo-light/10 flex items-center justify-center text-sm font-serif-display text-echo-light border border-echo-light/20">
                  {post.authorInitials || post.author?.charAt(0) || 'E'}
                </div>
                <div>
                  <p className="text-echo-light font-medium">{post.author || 'Echo'}</p>
                  <p className="text-sm text-echo-light/50">{post.createdAt} • {post.readTime}</p>
                </div>
                <motion.div
                  className="ml-auto text-echo-light/60 group-hover:text-echo-light transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-sm font-medium">Read Full Essay →</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
