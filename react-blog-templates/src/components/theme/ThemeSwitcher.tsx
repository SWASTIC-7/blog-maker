import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themes,type Theme } from '../../themes/themes';
import '../../css/theme.css';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-switcher">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="theme-panel"
          >
            <h3>Choose Theme</h3>
            <div className="theme-list">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  className={`theme-option ${currentTheme.name === theme.name ? 'active' : ''}`}
                  onClick={() => {
                    onThemeChange(theme);
                    setIsOpen(false);
                  }}
                  style={{
                    backgroundColor: theme.colors.panelBg,
                    color: theme.colors.text,
                    borderColor: theme.colors.panelBorder
                  }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className="theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.panelBg
        }}
      >
        {isOpen ? '×' : '🎨'}
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher; 