import React, { useContext } from 'react';
import { ImageOff, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
      const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <ImageOff className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              BG Remover
            </span>
          </div>
          <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-purple-600" />
          )}
        </button>
          {/* <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yourusername/background-remover"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;