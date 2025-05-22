import React, { useMemo } from 'react';
import type { Block } from './BlogEditor';
import './BlogPreview.css';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

interface BlogPreviewProps {
  blocks: Block[];
  isPublished?: boolean;
  onBack: () => void;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ blocks, isPublished = false, onBack }) => {
  const tableOfContents = useMemo(() => {
    return blocks
      .filter(block => block.type === 'heading')
      .map(block => ({
        id: block.id,
        level: block.config.level,
        text: block.content
      }));
  }, [blocks]);

  const relatedBlogs = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and build your first application.',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      excerpt: 'Explore advanced TypeScript patterns and best practices.',
      date: '2024-03-10'
    },
    {
      id: 3,
      title: 'Building Modern Web Apps',
      excerpt: 'A comprehensive guide to building modern web applications.',
      date: '2024-03-05'
    }
  ];

  return (
    <div className="blog-editor">
      <div className="editor-header">
        <h1>{isPublished ? 'Published Blog' : 'Blog Preview'}</h1>
        <button 
          className="edit-button"
          onClick={onBack}
        >
          Back to Editor
        </button>
      </div>
      <div className="main-container">
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

        <div className="main-content">
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
          <h3>Related Blogs</h3>
          <div className="related-blogs-list">
            {relatedBlogs.map(blog => (
              <div key={blog.id} className="related-blog-item">
                <h4>{blog.title}</h4>
                <p>{blog.excerpt}</p>
                <span className="blog-date">{blog.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderBlock = (block: Block) => {
  switch (block.type) {
    case 'text':
      return <div dangerouslySetInnerHTML={{ __html: block.content }} />;
    case 'heading':
      const HeadingTag = `h${block.config.level}`;
      return React.createElement(
        HeadingTag,
        {
          id: block.id,
          className: `animated ${block.config.variant || ''}`,
          style: {
            fontSize: `${2.5 - (block.config.level - 1) * 0.3}rem`,
            marginBottom: '1rem',
            color: 'var(--text-color)',
            fontFamily: 'var(--heading-font)',
            display: 'inline-block',
            position: 'relative',
            transition: 'all 0.3s ease'
          }
        },
        block.content
      );
    case 'code':
      return (
        <pre className={`language-${block.config.language}`}>
          <code>{block.content}</code>
        </pre>
      );
    case 'flow':
      return (
        <div className="flow-container">
          <ReactFlow
            nodes={block.config.nodes}
            edges={block.config.edges}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            minZoom={0.1}
            maxZoom={2}
          >
            <Background color="var(--panel-border)" gap={16} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      );
    case 'image':
      return (
        <div className={`preview-image-container ${block.config.size} ${block.config.alignment} ${block.config.style}`}>
          <img src={block.content.url} alt={block.content.alt} />
          {block.content.caption && (
            <p className="preview-image-caption">{block.content.caption}</p>
          )}
        </div>
      );
    case 'video':
      return (
        <div className={`preview-video-container ${block.config.size}`}>
          {block.content.type === 'youtube' || block.content.type === 'vimeo' ? (
            <iframe
              className="preview-video-embed"
              src={getEmbedUrl(block.content.url, block.content.type)}
              title={block.content.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              className="preview-video-player"
              src={block.content.url}
              controls={block.config.controls}
              autoPlay={block.config.autoplay}
              loop={block.config.loop}
            />
          )}
          {block.content.title && (
            <h3 className="preview-video-title">{block.content.title}</h3>
          )}
          {block.content.description && (
            <p className="preview-video-description">{block.content.description}</p>
          )}
        </div>
      );
    default:
      return null;
  }
};

const getEmbedUrl = (url: string, type: 'youtube' | 'vimeo') => {
  if (type === 'youtube') {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } else if (type === 'vimeo') {
    const videoId = url.match(/(?:vimeo\.com\/)(\d+)/)?.[1];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  }
  return url;
};

export default BlogPreview;
