import { motion } from 'framer-motion';

export default function PremiumCategoryPill({ active, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 font-sans text-xs font-medium tracking-wide transition-all ${
        active
          ? 'bg-echo-heading text-black'
          : 'border border-white/15 text-echo-body hover:border-white/30 hover:text-echo-heading'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={active ? { boxShadow: '0 0 20px rgba(245, 245, 245, 0.1)' } : {}}
    >
      {children}
    </motion.button>
  );
}
