import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-transition"
      style={{
        position: 'relative',
        width: '56px',
        height: '28px',
        borderRadius: '14px',
        backgroundColor: theme === 'dark' ? '#FACA78' : '#374151',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        transition: `background-color var(--transition-duration) var(--transition-timing)`
      }}
    >
      <div
        className="theme-transition"
        style={{
          position: 'absolute',
          top: '2px',
          left: theme === 'dark' ? '30px' : '2px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: theme === 'dark' ? '#374151' : '#FACA78',
          transition: `left var(--transition-duration) var(--transition-timing), 
                      background-color var(--transition-duration) var(--transition-timing)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: theme === 'dark' ? '#FACA78' : '#374151'
        }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
    </button>
  );
} 