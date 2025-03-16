'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface DetectedObject {
  label: string;
  confidence: number;
  bounding_box: {
    x_min: number;
    x_max: number;
    y_min: number;
    y_max: number;
  };
}

interface ApiResponse {
  amazon?: {
    items: DetectedObject[];
  };
  google?: {
    items: DetectedObject[];
  };
}

const ObjectDetection = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<ApiResponse | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<'amazon' | 'google'>('amazon');
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    // Reset states when URL changes
    setError(null);
    setDetectionResults(null);
  };

  const detectObjects = async () => {
    if (!imageUrl) {
      setError('Please enter an image URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDetectionResults(null);

    try {
      const response = await axios.post(
        'https://api.edenai.run/v2/image/object_detection',
        {
          providers: 'amazon,google',
          file_url: imageUrl,
        },
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTI5ZTRlM2QtOTVhYi00MmRkLWE4MTItMTcwNGVlNWVjZTRmIiwidHlwZSI6ImFwaV90b2tlbiJ9.ro8RGf7QI1Og2ukxHiozlsW-biWYasYhhJGOjrcrkV8',
          },
        }
      );

      setDetectionResults(response.data);
      
      // Draw bounding boxes after image loads
      if (imageRef.current) {
        imageRef.current.onload = drawBoundingBoxes;
      }
    } catch (err) {
      console.error('Error detecting objects:', err);
      setError('Failed to detect objects. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const drawBoundingBoxes = () => {
    if (!canvasRef.current || !imageRef.current || !detectionResults) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    
    // Set canvas dimensions to match the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Get the selected provider's results
    const providerResults = detectionResults[selectedProvider]?.items || [];

    // Draw bounding boxes
    providerResults.forEach((object) => {
      const { x_min, x_max, y_min, y_max } = object.bounding_box;
      const boxWidth = (x_max - x_min) * canvas.width;
      const boxHeight = (y_max - y_min) * canvas.height;
      const x = x_min * canvas.width;
      const y = y_min * canvas.height;

      // Draw rectangle
      ctx.strokeStyle = '#4169e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);

      // Draw label background
      ctx.fillStyle = 'rgba(65, 105, 225, 0.7)';
      const label = `${object.label} (${Math.round(object.confidence * 100)}%)`;
      const textMetrics = ctx.measureText(label);
      ctx.fillRect(x, y - 20, textMetrics.width + 10, 20);

      // Draw label text
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.fillText(label, x + 5, y - 5);
    });
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-4">Object Detection</h3>
      
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
          Image URL
        </label>
        <div className="flex">
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            className="flex-grow px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={detectObjects}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Detecting...' : 'Detect'}
          </motion.button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
        >
          {error}
        </motion.div>
      )}

      {detectionResults && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Results</h4>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedProvider('amazon')}
                className={`px-3 py-1 rounded-md text-sm ${selectedProvider === 'amazon' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Amazon
              </button>
              <button
                onClick={() => setSelectedProvider('google')}
                className={`px-3 py-1 rounded-md text-sm ${selectedProvider === 'google' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Google
              </button>
            </div>
          </div>
          
          <div className="relative border border-gray-700 rounded-lg overflow-hidden">
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Analyzed image"
              className="w-full h-auto"
              style={{ opacity: 0.9 }}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Detected Objects:</h4>
            <div className="grid grid-cols-2 gap-2">
              {detectionResults[selectedProvider]?.items?.map((object, index) => (
                <div key={index} className="bg-gray-700/50 p-2 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-white">{object.label}</span>
                    <span className="text-blue-400">{Math.round(object.confidence * 100)}%</span>
                  </div>
                </div>
              )) || <div className="text-gray-400">No objects detected</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;