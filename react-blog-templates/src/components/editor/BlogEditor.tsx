import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextBlock from './blocks/TextBlock';
import CodeBlock from './blocks/CodeBlock';
import FlowBlock from './blocks/FlowBlock';
import HeadingBlock from './blocks/HeadingBlock';
import ImageBlock from './blocks/ImageBlock';
import VideoBlock from './blocks/VideoBlock';
import BlockSelector from './BlockSelector';
import { api } from '../../services/api';
import './BlogEditor.css';

export interface Block {
  id: string;
  type: 'text' | 'code' | 'flow' | 'heading' | 'image' | 'video';
  content: any;
  config: any;
}

interface BlogEditorProps {
  blocks: Block[];
  onBlocksChange: (blocks: Block[]) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ blocks, onBlocksChange }) => {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const handleAddBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      config: getDefaultConfig(type)
    };
    onBlocksChange([...blocks, newBlock]);
    setIsAddingBlock(false);
  };

  const getDefaultContent = (type: Block['type']) => {
    switch (type) {
      case 'image':
        return { url: '', alt: '', caption: '' };
      case 'video':
        return { url: '', type: 'youtube', title: '', description: '' };
      default:
        return '';
    }
  };

  const getDefaultConfig = (type: Block['type']) => {
    switch (type) {
      case 'heading':
        return { variant: 'animated', level: 1 };
      case 'code':
        return { language: 'javascript', showLineNumbers: true };
      case 'flow':
        return { nodes: [], edges: [] };
      case 'image':
        return { size: 'medium', alignment: 'center', style: 'default' };
      case 'video':
        return { size: 'medium', autoplay: false, controls: true, loop: false };
      default:
        return {};
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    onBlocksChange(newBlocks);
  };

  const handleBlockUpdate = (id: string, content: any, config: any) => {
    onBlocksChange(blocks.map(block => 
      block.id === id ? { ...block, content, config } : block
    ));
  };

  const handlePreview = () => {
    navigate('/preview');
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      setPublishError(null);

      // Get the main heading for the title
      const title = blocks.find(block => block.type === 'heading' && block.config.level === 1)?.content || 'Untitled Blog';

      // Publish the blog using our API
      const { url, slug } = await api.publishBlog(title, blocks);

      // Navigate to the published blog
      window.location.href = url;
    } catch (error) {
      setPublishError('Failed to publish blog. Please try again.');
      console.error('Publishing error:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDeleteBlock = (id: string) => {
    onBlocksChange(blocks.filter(block => block.id !== id));
    if (selectedBlock === id) {
      setSelectedBlock(null);
    }
  };

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'text':
        return (
          <TextBlock
            content={block.content}
            onChange={(content) => handleBlockUpdate(block.id, content, block.config)}
          />
        );
      case 'code':
        return (
          <CodeBlock
            content={block.content}
            config={block.config}
            onChange={(content, config) => handleBlockUpdate(block.id, content, config)}
          />
        );
      case 'flow':
        return (
          <FlowBlock
            content={block.content}
            config={block.config}
            onChange={(content, config) => handleBlockUpdate(block.id, content, config)}
          />
        );
      case 'heading':
        return (
          <HeadingBlock
            content={block.content}
            config={block.config}
            onChange={(content, config) => handleBlockUpdate(block.id, content, config)}
          />
        );
      case 'image':
        return (
          <ImageBlock
            content={block.content}
            config={block.config}
            onChange={(content, config) => handleBlockUpdate(block.id, content, config)}
          />
        );
      case 'video':
        return (
          <VideoBlock
            content={block.content}
            config={block.config}
            onChange={(content, config) => handleBlockUpdate(block.id, content, config)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="blog-editor">
      <div className="editor-header">
        <h1>Blog Editor</h1>
        <div className="editor-actions">
          <button 
            className="preview-button"
            onClick={handlePreview}
          >
            Preview
          </button>
          <button 
            className="publish-button"
            onClick={handlePublish}
            disabled={isPublishing}
          >
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
          <button 
            className="add-block-button"
            onClick={() => setIsAddingBlock(true)}
          >
            Add Block
          </button>
        </div>
      </div>

      {publishError && (
        <div className="error-message">
          {publishError}
        </div>
      )}

      {isAddingBlock && (
        <BlockSelector
          onSelect={handleAddBlock}
          onClose={() => setIsAddingBlock(false)}
        />
      )}

      <div className="blocks-container">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={`block-wrapper ${selectedBlock === block.id ? 'selected' : ''}`}
            onClick={() => setSelectedBlock(block.id)}
          >
            <div className="block-controls">
              <button
                className="move-button up"
                onClick={(e) => {
                  e.stopPropagation();
                  moveBlock(index, 'up');
                }}
                disabled={index === 0}
                title="Move block up"
              >
                ↑
              </button>
              <button
                className="move-button down"
                onClick={(e) => {
                  e.stopPropagation();
                  moveBlock(index, 'down');
                }}
                disabled={index === blocks.length - 1}
                title="Move block down"
              >
                ↓
              </button>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBlock(block.id);
                }}
                title="Delete block"
              >
                🗑️
              </button>
            </div>
            <div className="block-content">
              {renderBlock(block)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogEditor; 