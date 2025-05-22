import React, { useMemo, useEffect } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import type { Block } from './BlogEditor';
import './BlogPreview.css';

interface BlogPreviewProps {
  blocks: Block[];
  onBack?: () => void;
  isPublished?: boolean;
  currentTheme?: 'light' | 'dark';
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ 
  blocks, 
  onBack, 
  isPublished = false,
  currentTheme = 'light'
}) => {
  useEffect(() => {
    // Set theme for published pages
    if (isPublished) {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [isPublished, currentTheme]);

  const tableOfContents = useMemo(() => {
    return blocks
      .filter(block => block.type === 'heading')
      .map(block => ({
        id: block.id,
        level: block.config.level,
        text: block.content
      }));
  }, [blocks]);

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'text':
        return <div className="text-block">{block.content}</div>;
      case 'code':
        return <pre className="code-block"><code>{block.content}</code></pre>;
      case 'heading':
        return <h1 className="heading-block">{block.content}</h1>;
      case 'image':
        return (
          <div className="image-block">
            <img src={block.content.url} alt={block.content.alt} />
            {block.content.caption && <p>{block.content.caption}</p>}
          </div>
        );
      case 'video':
        return (
          <div className="video-block">
            <video src={block.content.url} controls />
          </div>
        );
      case 'flow':
        return (
          <div className="flow-block" style={{ height: '400px' }}>
            <ReactFlow
              nodes={block.content.nodes}
              edges={block.content.edges}
              fitView
              attributionPosition="bottom-right"
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="blog-preview" data-theme={currentTheme}>
      {!isPublished && (
        <div className="preview-header">
          <h1>Blog Preview</h1>
          <button className="back-button" onClick={onBack}>
            Back to Editor
          </button>
        </div>
      )}
      <div className="preview-container">
        <div className="table-of-contents">
          <h3>Table of Contents</h3>
          <ul>
            {tableOfContents.map(item => (
              <li 
                key={item.id}
                style={{ marginLeft: `${(item.level - 1) * 1.5}rem` }}
              >
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="preview-content">
          {blocks.map((block) => (
            <div 
              key={block.id} 
              className="preview-block"
              id={block.type === 'heading' ? block.id : undefined}
            >
              {renderBlock(block)}
            </div>
          ))}
        </div>

        <div className="related-topics">
          <h3>Related Topics</h3>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search related topics..."
              className="search-input"
            />
          </div>
          <div className="related-list">
            <div className="related-item">
              <h4>Getting Started with React</h4>
              <p>Learn the basics of React and build your first application.</p>
            </div>
            <div className="related-item">
              <h4>Advanced TypeScript Patterns</h4>
              <p>Explore advanced TypeScript patterns and best practices.</p>
            </div>
            <div className="related-item">
              <h4>Building Modern Web Apps</h4>
              <p>A comprehensive guide to building modern web applications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
