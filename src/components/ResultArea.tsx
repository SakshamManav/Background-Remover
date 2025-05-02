import React, { useState } from 'react';
import { Download, ArrowLeft, ArrowRight } from 'lucide-react';

interface ResultAreaProps {
  originalImageUrl: string;
  processedImageUrl: string;
}

const ResultArea: React.FC<ResultAreaProps> = ({ originalImageUrl, processedImageUrl }) => {
  const [showComparison, setShowComparison] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = 'background-removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Result
      </h2>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="text-sm flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
        >
          {showComparison ? (
            <>
              <ArrowLeft className="w-4 h-4 mr-1" /> View Result Only
            </>
          ) : (
            <>
              Compare Before/After <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>

      {showComparison ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Original</p>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
              <img 
                src={originalImageUrl} 
                alt="Original" 
                className="max-h-64 mx-auto"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Background Removed</p>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
              <img 
                src={processedImageUrl} 
                alt="Background Removed" 
                className="max-h-64 mx-auto"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-md flex justify-center p-4">
          <img 
            src={processedImageUrl} 
            alt="Background Removed" 
            className="max-h-80"
          />
        </div>
      )}

      <button
        onClick={handleDownload}
        className="mt-6 w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center justify-center font-medium transition-colors focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Image
      </button>
    </div>
  );
};

export default ResultArea;