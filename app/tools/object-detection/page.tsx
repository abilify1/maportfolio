"use client";

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

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

export default function ObjectDetectionPage() {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<ApiResponse | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<'amazon' | 'google'>('amazon');
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
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
      const response = await axios.post('/api/object-detection', {
        imageUrl: imageUrl,
      });

      setDetectionResults(response.data);
      
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
    
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const providerResults = detectionResults[selectedProvider]?.items || [];

    providerResults.forEach((object) => {
      const { x_min, x_max, y_min, y_max } = object.bounding_box;
      const boxWidth = (x_max - x_min) * canvas.width;
      const boxHeight = (y_max - y_min) * canvas.height;
      const x = x_min * canvas.width;
      const y = y_min * canvas.height;

      ctx.strokeStyle = '#4169e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, boxWidth, boxHeight);

      ctx.fillStyle = 'rgba(65, 105, 225, 0.7)';
      const label = `${object.label} (${Math.round(object.confidence * 100)}%)`;
      const textMetrics = ctx.measureText(label);
      ctx.fillRect(x, y - 20, textMetrics.width + 10, 20);

      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.fillText(label, x + 5, y - 5);
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-20 sm:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/tools" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
          >
            <FiArrowLeft className="mr-2" />
            Back to Tools
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Object <span className="text-gray-400">Detection</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Detect and identify objects in images using AI-powered computer vision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-gray-800/50 rounded-lg p-4 sm:p-8 border border-gray-700/50"
        >
          <div className="mb-4 sm:mb-6">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={handleUrlChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 sm:px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md sm:rounded-l-md sm:rounded-r-none text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={detectObjects}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md sm:rounded-l-none sm:rounded-r-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isLoading ? 'Detecting...' : 'Detect'}
              </motion.button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
            >
              {error}
            </motion.div>
          )}

          {detectionResults && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Results</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedProvider('amazon')}
                    className={`px-3 sm:px-4 py-2 rounded-md text-sm transition-colors ${selectedProvider === 'amazon' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    Amazon
                  </button>
                  <button
                    onClick={() => setSelectedProvider('google')}
                    className={`px-3 sm:px-4 py-2 rounded-md text-sm transition-colors ${selectedProvider === 'google' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
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
              
              <div>
                <h3 className="text-lg font-medium mb-3">Detected Objects:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {detectionResults[selectedProvider]?.items?.map((object, index) => (
                    <div key={index} className="bg-gray-700/50 p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="text-white">{object.label}</span>
                        <span className="text-blue-400 text-sm">
                          {Math.round(object.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  )) || <div className="text-gray-400 col-span-full text-center py-4">No objects detected</div>}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}