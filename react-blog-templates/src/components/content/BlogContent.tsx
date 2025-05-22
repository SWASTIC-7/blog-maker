import React from 'react';
import { motion } from 'framer-motion';
import '../../css/content.css';

interface BlogContentProps {
  content: string;
  className?: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content, className = '' }) => {
  const paragraphs = content.split('\n\n');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`blog-content ${className}`}
    >
      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {paragraph}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default BlogContent; 