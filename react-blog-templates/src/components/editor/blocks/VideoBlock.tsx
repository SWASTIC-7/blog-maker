import React, { useState, useRef } from 'react';
import './VideoBlock.css';

interface VideoBlockProps {
  content: {
    url: string;
    type: 'youtube' | 'vimeo' | 'upload';
    title?: string;
    description?: string;
  };
  config: {
    size: 'small' | 'medium' | 'large' | 'full';
    autoplay: boolean;
    controls: boolean;
    loop: boolean;
  };
  onChange: (content: any, config: any) => void;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ content, config, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setUploadError('Please select a video file');
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setUploadError('Video size should be less than 100MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Here you would typically upload to your server/cloud storage
      // For now, we'll use a local URL
      const url = URL.createObjectURL(file);
      onChange({ ...content, url, type: 'upload' }, config);
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadError('Failed to upload video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setUploadError(null);
    let type = content.type;
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      type = 'youtube';
    } else if (url.includes('vimeo.com')) {
      type = 'vimeo';
    } else if (url && !url.startsWith('http')) {
      setUploadError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    
    onChange({ ...content, url, type }, config);
  };

  const handleTitleChange = (title: string) => {
    onChange({ ...content, title }, config);
  };

  const handleDescriptionChange = (description: string) => {
    onChange({ ...content, description }, config);
  };

  const handleSizeChange = (size: 'small' | 'medium' | 'large' | 'full') => {
    onChange(content, { ...config, size });
  };

  const handleConfigChange = (key: keyof typeof config, value: boolean) => {
    onChange(content, { ...config, [key]: value });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getEmbedUrl = () => {
    if (!content.url) return '';

    switch (content.type) {
      case 'youtube':
        const youtubeId = content.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
        return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : '';
      case 'vimeo':
        const vimeoId = content.url.match(/(?:vimeo\.com\/)(\d+)/)?.[1];
        return vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : '';
      default:
        return content.url;
    }
  };

  const renderVideo = () => {
    if (!content.url) return null;

    if (content.type === 'upload') {
      return (
        <video
          src={content.url}
          controls={config.controls}
          autoPlay={config.autoplay}
          loop={config.loop}
          className="video-player"
        />
      );
    }

    const embedUrl = getEmbedUrl();
    if (!embedUrl) return null;

    return (
      <iframe
        src={embedUrl}
        className="video-embed"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };

  return (
    <div className="video-block">
      <div className="video-controls">
        <div className="control-group">
          <label>Size:</label>
          <select
            value={config.size}
            onChange={(e) => handleSizeChange(e.target.value as any)}
            className="video-size-select"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="full">Full Width</option>
          </select>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={config.autoplay}
              onChange={(e) => handleConfigChange('autoplay', e.target.checked)}
            />
            Autoplay
          </label>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={config.controls}
              onChange={(e) => handleConfigChange('controls', e.target.checked)}
            />
            Show Controls
          </label>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={config.loop}
              onChange={(e) => handleConfigChange('loop', e.target.checked)}
            />
            Loop
          </label>
        </div>
      </div>

      <div className="video-preview">
        {content.url ? (
          <div className={`video-container ${config.size}`}>
            {renderVideo()}
          </div>
        ) : (
          <div className="video-upload-placeholder" onClick={handleUploadClick}>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="video-upload-input"
              style={{ display: 'none' }}
            />
            <div className="upload-prompt">
              {isUploading ? 'Uploading...' : 'Click to upload video or paste URL'}
            </div>
            {uploadError && <div className="upload-error">{uploadError}</div>}
          </div>
        )}
      </div>

      <div className="video-details">
        <input
          type="text"
          value={content.url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Video URL (YouTube, Vimeo, or upload)..."
          className="video-url-input"
        />
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Video title (optional)..."
          className="video-title-input"
        />
        <textarea
          value={content.description || ''}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Video description (optional)..."
          className="video-description-input"
        />
      </div>
    </div>
  );
};

export default VideoBlock; 