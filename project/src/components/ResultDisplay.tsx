import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ResultDisplayProps {
  prediction: number | null;
  isLoading: boolean;
}

export function ResultDisplay({ prediction, isLoading }: ResultDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-700">Analyzing image...</span>
      </div>
    );
  }

  if (prediction === null) {
    return null;
  }

  const isPneumonia = prediction > 0.5;

  return (
    <div
      className={`p-6 rounded-lg ${
        isPneumonia ? 'bg-red-50' : 'bg-green-50'
      }`}
    >
      <div className="flex items-center">
        {isPneumonia ? (
          <AlertCircle className="h-6 w-6 text-red-600" />
        ) : (
          <CheckCircle className="h-6 w-6 text-green-600" />
        )}
        <div className="ml-3">
          <h3
            className={`text-lg font-medium ${
              isPneumonia ? 'text-red-800' : 'text-green-800'
            }`}
          >
            {isPneumonia ? 'Pneumonia Detected' : 'No Pneumonia Detected'}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Confidence: {(Math.abs(prediction - 0.5) * 200).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}