import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded-md flex items-start">
      <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
      <div className="text-sm">{message}</div>
    </div>
  );
};

export default ErrorMessage;