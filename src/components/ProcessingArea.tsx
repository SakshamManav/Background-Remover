import React from 'react';
import RemoveBackgroundButton from './RemoveBackgroundButton';
import ResultArea from './ResultArea';
import ErrorMessage from './ErrorMessage';

interface ProcessingAreaProps {
  uploadedImageUrl: string;
  processedImageUrl: string | null;
  setProcessedImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  uploadedImage: File | null;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProcessingArea: React.FC<ProcessingAreaProps> = ({
  uploadedImageUrl,
  processedImageUrl,
  setProcessedImageUrl,
  uploadedImage,
  isProcessing,
  setIsProcessing,
  error,
  setError
}) => {
  return (
    <div className="mt-6">
      <RemoveBackgroundButton 
        uploadedImage={uploadedImage}
        setProcessedImageUrl={setProcessedImageUrl}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        setError={setError}
      />
      
      {error && <ErrorMessage message={error} />}
      
      {processedImageUrl && (
        <ResultArea 
          originalImageUrl={uploadedImageUrl}
          processedImageUrl={processedImageUrl}
        />
      )}
    </div>
  );
};

export default ProcessingArea;