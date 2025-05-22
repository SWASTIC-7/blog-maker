import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeBlock.css';

interface CodeBlockProps {
  content: string;
  config: {
    language: string;
    showLineNumbers: boolean;
  };
  onChange: (content: string, config: any) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, config, onChange }) => {
  const languages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'cpp',
    'csharp',
    'php',
    'ruby',
    'swift',
    'go',
    'rust',
    'html',
    'css',
    'json',
    'markdown',
    'bash',
    'sql'
  ];

  const handleLanguageChange = (language: string) => {
    onChange(content, { ...config, language });
  };

  const toggleLineNumbers = () => {
    onChange(content, { ...config, showLineNumbers: !config.showLineNumbers });
  };

  return (
    <div className="code-block">
      <div className="code-controls">
        <select
          value={config.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="language-select"
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>

        <label className="line-numbers-toggle">
          <input
            type="checkbox"
            checked={config.showLineNumbers}
            onChange={toggleLineNumbers}
          />
          Show Line Numbers
        </label>
      </div>

      <div className="code-preview">
        <SyntaxHighlighter
          language={config.language}
          style={vscDarkPlus}
          showLineNumbers={config.showLineNumbers}
          wrapLines={true}
        >
          {content || '// Write your code here...'}
        </SyntaxHighlighter>
      </div>

      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value, config)}
        placeholder="Write your code here..."
        className="code-editor"
        spellCheck="false"
      />
    </div>
  );
};

export default CodeBlock; 