import React from 'react';
import AnimatedHeading from '../../heading/AnimatedHeading';
import TypewriterHeading from '../../heading/TypewriterHeading';
import './HeadingBlock.css';

interface HeadingBlockProps {
  content: string;
  config: {
    variant: 'fade' | 'slide' | 'bounce' | 'wave' | 'typewriter' | 'glitch';
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
  onChange: (content: string, config: any) => void;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ content, config, onChange }) => {
  const handleVariantChange = (variant: 'fade' | 'slide' | 'bounce' | 'wave' | 'typewriter' | 'glitch') => {
    onChange(content, { ...config, variant });
  };

  const handleLevelChange = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    onChange(content, { ...config, level });
  };

  const animationOptions = [
    { value: 'fade', label: 'Fade In' },
    { value: 'slide', label: 'Slide In' },
    { value: 'bounce', label: 'Bounce' },
    { value: 'wave', label: 'Wave' },
    { value: 'typewriter', label: 'Typewriter' },
    { value: 'glitch', label: 'Glitch' }
  ];

  return (
    <div className="heading-block">
      <div className="heading-controls">
        <select
          value={config.variant}
          onChange={(e) => handleVariantChange(e.target.value as any)}
          className="heading-variant-select"
        >
          {animationOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={config.level}
          onChange={(e) => handleLevelChange(Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}
          className="heading-level-select"
        >
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>
      </div>

      <div className="heading-preview">
        {config.variant === 'typewriter' ? (
          <TypewriterHeading
            text={content || 'Enter heading text...'}
            speed={100}
          />
        ) : (
          <AnimatedHeading
            text={content || 'Enter heading text...'}
            level={config.level}
            variant={config.variant}
          />
        )}
      </div>

      <input
        type="text"
        value={content}
        onChange={(e) => onChange(e.target.value, config)}
        placeholder="Enter heading text..."
        className="heading-input"
      />
    </div>
  );
};

export default HeadingBlock; 