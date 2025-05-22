import React, { useState, useRef } from 'react';
import './ImageBlock.css';

interface ImageBlockProps {
  content: {
    url: string;
    alt: string;
    caption?: string;
  };
  config: {
    size: 'small' | 'medium' | 'large' | 'full';
    alignment: 'left' | 'center' | 'right';
    style: 'default' | 'rounded' | 'circle' | 'bordered';
  };
  onChange: (content: any, config: any) => void;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ content, config, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Here you would typically upload to your server/cloud storage
      // For now, we'll use a local URL
      const url = URL.createObjectURL(file);
      onChange({ ...content, url, alt: file.name }, config);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setUploadError(null);
    onChange({ ...content, url }, config);
  };

  const handleAltChange = (alt: string) => {
    onChange({ ...content, alt }, config);
  };

  const handleCaptionChange = (caption: string) => {
    onChange({ ...content, caption }, config);
  };

  const handleSizeChange = (size: 'small' | 'medium' | 'large' | 'full') => {
    onChange(content, { ...config, size });
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    onChange(content, { ...config, alignment });
  };

  const handleStyleChange = (style: 'default' | 'rounded' | 'circle' | 'bordered') => {
    onChange(content, { ...config, style });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-block">
      <div className="image-controls">
        <div className="control-group">
          <label>Size:</label>
          <select
            value={config.size}
            onChange={(e) => handleSizeChange(e.target.value as any)}
            className="image-size-select"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="full">Full Width</option>
          </select>
        </div>

        <div className="control-group">
          <label>Alignment:</label>
          <select
            value={config.alignment}
            onChange={(e) => handleAlignmentChange(e.target.value as any)}
            className="image-alignment-select"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div className="control-group">
          <label>Style:</label>
          <select
            value={config.style}
            onChange={(e) => handleStyleChange(e.target.value as any)}
            className="image-style-select"
          >
            <option value="default">Default</option>
            <option value="rounded">Rounded</option>
            <option value="circle">Circle</option>
            <option value="bordered">Bordered</option>
          </select>
        </div>
      </div>

      <div className="image-preview">
        {content.url ? (
          <div className={`image-container ${config.size} ${config.alignment} ${config.style}`}>
            <img src={content.url} alt={content.alt} />
            {content.caption && <p className="image-caption">{content.caption}</p>}
          </div>
        ) : (
          <div className="image-upload-placeholder" onClick={handleUploadClick}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-upload-input"
              style={{ display: 'none' }}
            />
            <div className="upload-prompt">
              {isUploading ? 'Uploading...' : 'Click to upload image or paste URL'}
            </div>
            {uploadError && <div className="upload-error">{uploadError}</div>}
          </div>
        )}
      </div>

      <div className="image-details">
        <input
          type="text"
          value={content.url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Image URL..."
          className="image-url-input"
        />
        <input
          type="text"
          value={content.alt}
          onChange={(e) => handleAltChange(e.target.value)}
          placeholder="Image alt text..."
          className="image-alt-input"
        />
        <input
          type="text"
          value={content.caption || ''}
          onChange={(e) => handleCaptionChange(e.target.value)}
          placeholder="Image caption (optional)..."
          className="image-caption-input"
        />
      </div>
    </div>
  );
};

export default ImageBlock; 