import React from 'react';
import { ImageOff } from 'lucide-react';
// import { ThemeContext } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  // const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="pt-6 pb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="p-2 bg-purple-600 rounded-lg mr-3">
            <ImageOff className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Background Remover</h1>
        </div>
        
        
      </div>
      
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Upload an image, remove the background, and download the result in seconds.
      </p>
    </header>
  );
};

export default Header;