import React, { useState, useCallback } from 'react';
import { Stethoscope } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { ResultDisplay } from './components/ResultDisplay';
import { predict } from './utils/modelLoader';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = useCallback(async (file: File) => {
    setIsLoading(true);
    setPrediction(null);

    // Create image URL
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    // Load and process image
    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      try {
        const result = await predict(img);
        setPrediction(result);
      } catch (error) {
        console.error('Prediction error:', error);
        alert('Error analyzing image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pneumonia Detection
          </h1>
          <p className="text-lg text-gray-600">
            Upload a chest X-ray image for instant pneumonia detection
          </p>
        </div>

        <div className="space-y-8">
          <ImageUpload onImageSelect={handleImageSelect} />

          {selectedImage && (
            <div className="mt-8 flex flex-col items-center">
              <img
                src={selectedImage}
                alt="Selected X-ray"
                className="max-w-md rounded-lg shadow-lg"
              />
              <div className="mt-6 w-full max-w-md">
                <ResultDisplay
                  prediction={prediction}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-8">
            <p>
              This is a demo application. For actual medical diagnosis,
              please consult with healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;