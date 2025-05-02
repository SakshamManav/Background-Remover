const API_URL = import.meta.env.VITE_REMOVE_BG_API_URL || 'http://localhost:5000/remove-bg';

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const removeBackground = async (image: File): Promise<string> => {
  try {
    console.log('Starting background removal process...');
    
    if (!image) {
      throw new Error('No image file provided');
    }

    // Check file size
    if (image.size > MAX_FILE_SIZE) {
      throw new Error('Image file is too large. Maximum size is 10MB.');
    }

    // Validate image type
    if (!['image/jpeg', 'image/png'].includes(image.type)) {
      throw new Error('Invalid image format. Please use JPEG or PNG images.');
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', image);

    // Check for network connectivity
    if (!navigator.onLine) {
      throw new Error('No internet connection. Please check your network and try again.');
    }

    console.log('Calling background removal API at:', API_URL);
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    }).catch(error => {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to reach the background removal service. Please ensure the API server is running and try again.');
      }
      throw error;
    });
    
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      
      // Provide more specific error messages based on status code
      switch (response.status) {
        case 400:
          throw new Error('Invalid image data. Please try a different image.');
        case 404:
          throw new Error('Background removal service not found. Please check the API URL configuration.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(`API Error (${response.status}): ${errorText}`);
      }
    }

    const blob = await response.blob();
    console.log('Received blob:', blob.type, blob.size);
    
    if (blob.size === 0) {
      throw new Error('Received empty response from the API.');
    }
    
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error removing background:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to process the image. Please try again.');
  }
};