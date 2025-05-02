import React, { useRef, useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
  uploadedImage: File | null;
  uploadedImageUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  onImageRemove,
  uploadedImage,
  uploadedImageUrl
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }
    onImageUpload(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-8">
      <div 
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragging 
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500'
        } ${uploadedImageUrl ? 'cursor-default' : 'cursor-pointer'}`}
        onDragOver={!uploadedImageUrl ? handleDragOver : undefined}
        onDragLeave={!uploadedImageUrl ? handleDragLeave : undefined}
        onDrop={!uploadedImageUrl ? handleDrop : undefined}
        onClick={!uploadedImageUrl ? openFileDialog : undefined}
      >
        {!uploadedImageUrl ? (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Drag & drop an image here
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  or click to browse from your device
                </p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Supports JPG, PNG, WEBP - Max file size: 5MB
              </div>
            </div>
          </>
        ) : (
          <div className="relative">
            <img 
              src={uploadedImageUrl} 
              alt="Preview" 
              className="max-h-64 mx-auto rounded-md"
            />
            <button 
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onImageRemove();
              }}
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {uploadedImage && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {uploadedImage.name} ({(uploadedImage.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}
    </div>
  );
};

export default ImageUploader;