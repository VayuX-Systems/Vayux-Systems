'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('vayux-theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('vayux-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-outline-variant/30 bg-surface/50 backdrop-blur-md" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      className="relative p-2.5 rounded-full border border-outline-variant/40 bg-surface/80 hover:bg-surface-container-high transition-colors duration-300 shadow-sm group flex items-center justify-center cursor-pointer text-on-surface"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
        ) : (
          <Sun className="w-4 h-4 text-primary group-hover:text-primary-container transition-colors" />
        )}
      </motion.div>
    </button>
  );
}
