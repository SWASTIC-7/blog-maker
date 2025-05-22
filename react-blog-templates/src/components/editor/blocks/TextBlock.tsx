import React, { useState, useRef } from 'react';
import './TextBlock.css';

interface TextBlockProps {
  content: string;
  onChange: (content: string) => void;
}

interface LinkInfo {
  text: string;
  url: string;
  start: number;
  end: number;
}

const TextBlock: React.FC<TextBlockProps> = ({ content, onChange }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleLinkButtonClick = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    if (selectedText) {
      setSelectedText(selectedText);
      setSelectionRange({ start, end });
      setIsLinkModalOpen(true);
    }
  };

  const handleAddLink = () => {
    if (!linkUrl || !selectionRange) return;

    // Create a link object with the selected text and URL
    const linkInfo: LinkInfo = {
      text: selectedText,
      url: linkUrl,
      start: selectionRange.start,
      end: selectionRange.end
    };

    // Convert the link info to a special format that can be parsed in the preview
    const linkMarkup = `[LINK:${JSON.stringify(linkInfo)}]`;

    const newContent = 
      content.substring(0, selectionRange.start) +
      linkMarkup +
      content.substring(selectionRange.end);
    
    onChange(newContent);
    setIsLinkModalOpen(false);
    setLinkUrl('');
    setSelectedText('');
    setSelectionRange(null);

    // Focus back on textarea and set cursor position after the inserted link
    setTimeout(() => {
      if (textareaRef.current) {
        const newPosition = selectionRange.start + linkMarkup.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleAddLink();
    } else if (e.key === 'Escape') {
      setIsLinkModalOpen(false);
    }
  };

  return (
    <div className="text-block">
      <div className="text-controls">
        <button
          className="link-button"
          onClick={handleLinkButtonClick}
          title="Add link (⌘+K)"
        >
          🔗 Add Link
        </button>
      </div>

      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleTextChange}
        placeholder="Write your text here... Select text and click 'Add Link' to create hyperlinks."
        className="text-editor"
      />

      {isLinkModalOpen && (
        <div className="link-modal-overlay" onClick={() => setIsLinkModalOpen(false)}>
          <div className="link-modal" onClick={e => e.stopPropagation()}>
            <h3>Add Link</h3>
            <div className="link-form">
              <div className="form-group">
                <label>Selected Text:</label>
                <div className="selected-text">{selectedText}</div>
              </div>
              <div className="form-group">
                <label>URL:</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="https://example.com"
                  className="link-url-input"
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button
                  className="cancel-button"
                  onClick={() => setIsLinkModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="add-link-button"
                  onClick={handleAddLink}
                  disabled={!linkUrl}
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextBlock; 