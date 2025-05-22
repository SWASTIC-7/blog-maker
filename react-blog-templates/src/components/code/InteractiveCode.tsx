import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../../css/code.css';

interface InteractiveCodeProps {
  code: string;
  language: string;
  title?: string;
}

const InteractiveCode: React.FC<InteractiveCodeProps> = ({ 
  code, 
  language, 
  title 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="interactive-code"
    >
      {title && (
        <div className="code-title">
          <span>{title}</span>
          <button
            onClick={handleCopy}
            className="copy-btn"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: title ? '0 0 0.5rem 0.5rem' : '0.5rem',
        }}
        className="code-block"
      >
        {code}
      </SyntaxHighlighter>
    </motion.div>
  );
};

export default InteractiveCode; 