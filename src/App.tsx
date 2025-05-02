import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ProcessingArea from './components/ProcessingArea';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';

function App() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file upload
  const handleImageUpload = (file: File) => {
    setError(null);
    setProcessedImageUrl(null);
    setUploadedImage(file);
    setUploadedImageUrl(URL.createObjectURL(file));
  };

  // Handle file removal
  const handleImageRemove = () => {
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    setUploadedImage(null);
    setUploadedImageUrl(null);
    setProcessedImageUrl(null);
    setError(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar/>
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Header />
          
          <main className="mt-8">
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              onImageRemove={handleImageRemove}
              uploadedImage={uploadedImage}
              uploadedImageUrl={uploadedImageUrl}
            />
            
            {uploadedImageUrl && (
              <ProcessingArea
                uploadedImageUrl={uploadedImageUrl}
                processedImageUrl={processedImageUrl}
                setProcessedImageUrl={setProcessedImageUrl}
                uploadedImage={uploadedImage}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
                error={error}
                setError={setError}
              />
            )}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;