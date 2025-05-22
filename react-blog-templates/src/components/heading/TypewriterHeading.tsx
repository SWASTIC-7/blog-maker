import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../css/heading.css';

interface TypewriterHeadingProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({
  text,
  speed = 100,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`typewriter-heading ${className}`}>
        {displayText}
        <span className="cursor">|</span>
      </h2>
    </motion.div>
  );
};

export default TypewriterHeading; 