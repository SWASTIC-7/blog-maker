export interface Theme {
  name: string;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    panelBg: string;
    panelBorder: string;
    primaryDark: string;
    panelBorderDark: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export const themes: Theme[] = [
  {
    name: 'Dark Mode',
    colors: {
      background: '#1a1b1e',
      text: '#e4e6eb',
      primary: '#4dabf7',
      secondary: '#adb5bd',
      accent: '#51cf66',
      panelBg: '#2d2e32',
      panelBorder: '#404040',
      primaryDark: '#3d8bc0',
      panelBorderDark: '#2d2d2d'
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif"
    }
  },
  {
    name: 'Modern Light',
    colors: {
      background: '#f8f9fa',
      text: '#212529',
      primary: '#228be6',
      secondary: '#495057',
      accent: '#40c057',
      panelBg: '#ffffff',
      panelBorder: '#e9ecef',
      primaryDark: '#1c7ed6',
      panelBorderDark: '#dee2e6'
    },
    fonts: {
      heading: "'Poppins', sans-serif",
      body: "'Inter', sans-serif"
    }
  },
  {
    name: 'Nordic',
    colors: {
      background: '#2e3440',
      text: '#eceff4',
      primary: '#88c0d0',
      secondary: '#81a1c1',
      accent: '#a3be8c',
      panelBg: '#3b4252',
      panelBorder: '#4c566a',
      primaryDark: '#6d9cb0',
      panelBorderDark: '#3b4252'
    },
    fonts: {
      heading: "'Fira Sans', sans-serif",
      body: "'Source Sans Pro', sans-serif"
    }
  },
  {
    name: 'Solarized Dark',
    colors: {
      background: '#002b36',
      text: '#fdf6e3',
      primary: '#268bd2',
      secondary: '#859900',
      accent: '#d33682',
      panelBg: '#073642',
      panelBorder: '#586e75',
      primaryDark: '#1f6fa8',
      panelBorderDark: '#073642'
    },
    fonts: {
      heading: "'Roboto Mono', monospace",
      body: "'Source Code Pro', monospace"
    }
  },
  {
    name: 'Dracula',
    colors: {
      background: '#282a36',
      text: '#f8f8f2',
      primary: '#bd93f9',
      secondary: '#ff79c6',
      accent: '#50fa7b',
      panelBg: '#44475a',
      panelBorder: '#6272a4',
      primaryDark: '#9d7ad9',
      panelBorderDark: '#44475a'
    },
    fonts: {
      heading: "'Fira Code', monospace",
      body: "'JetBrains Mono', monospace"
    }
  },
  {
    name: 'Monokai',
    colors: {
      background: '#272822',
      text: '#f8f8f2',
      primary: '#a6e22e',
      secondary: '#f92672',
      accent: '#66d9ef',
      panelBg: '#3e3d32',
      panelBorder: '#75715e',
      primaryDark: '#8bc926',
      panelBorderDark: '#3e3d32'
    },
    fonts: {
      heading: "'Hack', monospace",
      body: "'Fira Code', monospace"
    }
  },
  {
    name: 'Tokyo Night',
    colors: {
      background: '#1a1b26',
      text: '#a9b1d6',
      primary: '#7aa2f7',
      secondary: '#bb9af7',
      accent: '#73daca',
      panelBg: '#24283b',
      panelBorder: '#414868',
      primaryDark: '#6289d6',
      panelBorderDark: '#24283b'
    },
    fonts: {
      heading: "'JetBrains Mono', monospace",
      body: "'Fira Code', monospace"
    }
  },
  {
    name: 'One Dark',
    colors: {
      background: '#282c34',
      text: '#abb2bf',
      primary: '#61afef',
      secondary: '#c678dd',
      accent: '#98c379',
      panelBg: '#21252b',
      panelBorder: '#3e4451',
      primaryDark: '#4e8fc0',
      panelBorderDark: '#21252b'
    },
    fonts: {
      heading: "'Fira Code', monospace",
      body: "'JetBrains Mono', monospace"
    }
  },
  {
    name: 'Gruvbox',
    colors: {
      background: '#282828',
      text: '#ebdbb2',
      primary: '#b8bb26',
      secondary: '#fb4934',
      accent: '#83a598',
      panelBg: '#3c3836',
      panelBorder: '#504945',
      primaryDark: '#96981e',
      panelBorderDark: '#3c3836'
    },
    fonts: {
      heading: "'Fira Code', monospace",
      body: "'JetBrains Mono', monospace"
    }
  },
  {
    name: 'Catppuccin',
    colors: {
      background: '#1e1e2e',
      text: '#cdd6f4',
      primary: '#89b4fa',
      secondary: '#f5c2e7',
      accent: '#a6e3a1',
      panelBg: '#313244',
      panelBorder: '#45475a',
      primaryDark: '#6b8fc0',
      panelBorderDark: '#313244'
    },
    fonts: {
      heading: "'Fira Code', monospace",
      body: "'JetBrains Mono', monospace"
    }
  }
];