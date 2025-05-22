import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedHeading.css';

interface AnimatedHeadingProps {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'fade' | 'slide' | 'bounce' | 'wave' | 'typewriter' | 'glitch';
  id?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ 
  text, 
  level, 
  variant = 'fade',
  id 
}) => {
  const getAnimationProps = () => {
    switch (variant) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8, ease: "easeOut" }
        };
      
      case 'slide':
        return {
          initial: { x: -100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          transition: { duration: 0.6, ease: "easeOut" }
        };
      
      case 'bounce':
        return {
          initial: { y: -50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { 
            type: "spring",
            stiffness: 260,
            damping: 20
          }
        };
      
      case 'wave':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 },
          children: text.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut"
              }}
            >
              {char}
            </motion.span>
          ))
        };
      
      case 'glitch':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 },
          children: (
            <div className="glitch-wrapper">
              <span className="glitch" data-text={text}>{text}</span>
            </div>
          )
        };
      
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 }
        };
    }
  };

  const animationProps = getAnimationProps();

  const renderHeading = () => {
    const props = { id, className: `heading-${variant}` };
    const content = variant === 'wave' || variant === 'glitch' ? animationProps.children : text;

    switch (level) {
      case 1: return <h1 {...props}>{content}</h1>;
      case 2: return <h2 {...props}>{content}</h2>;
      case 3: return <h3 {...props}>{content}</h3>;
      case 4: return <h4 {...props}>{content}</h4>;
      case 5: return <h5 {...props}>{content}</h5>;
      case 6: return <h6 {...props}>{content}</h6>;
      default: return <h1 {...props}>{content}</h1>;
    }
  };

  return (
    <motion.div className="animated-heading" {...animationProps}>
      {renderHeading()}
    </motion.div>
  );
};

export default AnimatedHeading; 