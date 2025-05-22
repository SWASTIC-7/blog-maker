import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BlogEditor from './components/editor/BlogEditor';
import BlogPreview from './components/editor/BlogPreview';
import ThemeSwitcher from './components/theme/ThemeSwitcher';
import { themes, type Theme } from './themes/themes';
import './css/app.css';

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [blocks, setBlocks] = useState<any[]>([]);

  // Apply theme styles to document root
  React.useEffect(() => {
    document.documentElement.style.setProperty('--background-color', currentTheme.colors.background);
    document.documentElement.style.setProperty('--text-color', currentTheme.colors.text);
    document.documentElement.style.setProperty('--primary-color', currentTheme.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', currentTheme.colors.secondary);
    document.documentElement.style.setProperty('--accent-color', currentTheme.colors.accent);
    document.documentElement.style.setProperty('--panel-bg', currentTheme.colors.panelBg);
    document.documentElement.style.setProperty('--panel-border', currentTheme.colors.panelBorder);
    document.documentElement.style.setProperty('--heading-font', currentTheme.fonts.heading);
    document.documentElement.style.setProperty('--body-font', currentTheme.fonts.body);
  }, [currentTheme]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={
              <BlogEditor 
                blocks={blocks}
                onBlocksChange={setBlocks}
              />
            } 
          />
          <Route 
            path="/preview" 
            element={
              <BlogPreview 
                blocks={blocks}
                onBack={() => window.history.back()}
              />
            } 
          />
          <Route 
            path="/publish" 
            element={
              <BlogPreview 
                blocks={blocks}
                isPublished={true}
                onBack={() => window.history.back()}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ThemeSwitcher 
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />
      </div>
    </Router>
  );
}

export default App;
