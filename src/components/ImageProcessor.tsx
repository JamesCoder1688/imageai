'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from './ImageUploader';
import { Download, Sparkles, ArrowLeft } from 'lucide-react';

interface ProcessingResult {
  description: string;
  originalFileName: string;
  processedAt: string;
}

export default function ImageProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/transform', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process image');
      }

      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Transform Your Photos
          </h2>
          <p className="text-lg text-white/80">
            Upload an image and watch it transform into authentic GTA-style art
          </p>
        </motion.div>

        {!result && !error && (
          <ImageUploader 
            onImageSelect={handleImageSelect}
            isProcessing={isProcessing}
          />
        )}

        {error && (
          <motion.div
            className="gtavi-card text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-red-400 mb-4">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Oops! Something went wrong</h3>
            </div>
            <p className="text-white/80 mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="gtavi-button-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </motion.div>
        )}

        {result && (
          <motion.div
            className="gtavi-card max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Analysis Complete!
              </h3>
              <p className="text-white/70">
                Here&apos;s what I see in your image:
              </p>
            </div>

            <div className="bg-black/40 rounded-lg p-6 mb-6">
              <p className="text-white/90 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="text-sm text-white/60 mb-6">
              <p>Original file: {result.originalFileName}</p>
              <p>Processed at: {new Date(result.processedAt).toLocaleString()}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="gtavi-button-secondary flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Process Another Image
              </button>
              <button className="gtavi-button-primary flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Result
              </button>
            </div>

            <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <p className="text-sm text-yellow-400">
                <strong>Note:</strong> This is a demo using Gemini&apos;s vision capabilities. 
                In a full implementation, this would generate an actual GTA-style image transformation.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}