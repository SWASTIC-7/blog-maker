import React from 'react';
import './BlockSelector.css';

interface BlockSelectorProps {
  onSelect: (type: 'text' | 'code' | 'flow' | 'heading' | 'image' | 'video') => void;
  onClose: () => void;
}

const BlockSelector: React.FC<BlockSelectorProps> = ({ onSelect, onClose }) => {
  const blockTypes = [
    {
      type: 'text',
      label: 'Text Block',
      description: 'Add a paragraph of text',
      icon: '📝'
    },
    {
      type: 'heading',
      label: 'Heading',
      description: 'Add a title or section heading',
      icon: '📌'
    },
    {
      type: 'code',
      label: 'Code Block',
      description: 'Add syntax-highlighted code',
      icon: '💻'
    },
    {
      type: 'flow',
      label: 'Flow Chart',
      description: 'Add an interactive flowchart',
      icon: '🔄'
    },
    {
      type: 'image',
      label: 'Image',
      description: 'Add an image with caption',
      icon: '🖼️'
    },
    {
      type: 'video',
      label: 'Video',
      description: 'Add a video (YouTube, Vimeo, or upload)',
      icon: '🎥'
    }
  ];

  return (
    <div className="block-selector-overlay" onClick={onClose}>
      <div className="block-selector" onClick={e => e.stopPropagation()}>
        <div className="block-selector-header">
          <h2>Add New Block</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="block-options">
          {blockTypes.map(block => (
            <button
              key={block.type}
              className="block-option"
              onClick={() => onSelect(block.type as any)}
            >
              <span className="block-icon">{block.icon}</span>
              <div className="block-info">
                <h3>{block.label}</h3>
                <p>{block.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockSelector; 