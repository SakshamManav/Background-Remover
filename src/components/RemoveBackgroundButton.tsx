import React from 'react';
import { Eraser, Loader2 } from 'lucide-react';
import { removeBackground } from '../services/imageService';

interface RemoveBackgroundButtonProps {
  uploadedImage: File | null;
  setProcessedImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const RemoveBackgroundButton: React.FC<RemoveBackgroundButtonProps> = ({
  uploadedImage,
  setProcessedImageUrl,
  isProcessing,
  setIsProcessing,
  setError
}) => {
  const handleRemoveBackground = async () => {
    if (!uploadedImage) return;
    
    try {
      setIsProcessing(true);
      setError(null);
      
      const result = await removeBackground(uploadedImage);
      setProcessedImageUrl(result);
    } catch (err) {
      console.error('Error removing background:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to remove background. Please try again.';
      setError(errorMessage);
      
      // Log additional details for debugging
      if (err instanceof Error) {
        console.debug('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleRemoveBackground}
      disabled={isProcessing || !uploadedImage}
      className={`w-full py-3 px-4 rounded-lg flex items-center justify-center text-white font-medium transition-all ${
        isProcessing || !uploadedImage
          ? 'bg-purple-400 cursor-not-allowed'
          : 'bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
      }`}
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Eraser className="w-5 h-5 mr-2" />
          Remove Background
        </>
      )}
    </button>
  );
};

export default RemoveBackgroundButton;