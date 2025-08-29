'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isProcessing?: boolean;
}

export default function ImageUploader({ onImageSelect, isProcessing = false }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      onImageSelect(file);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="converter">
      <motion.div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
          ${dragOver 
            ? 'border-pink-500 bg-pink-500/10' 
            : 'border-pink-500/30 hover:border-pink-500/60'
          }
          ${selectedImage ? 'border-solid border-pink-500' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={isProcessing}
        />

        {selectedImage ? (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-64 mx-auto rounded-lg shadow-lg"
              />
              {!isProcessing && (
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              {isProcessing && (
                <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p>Transforming your image...</p>
                  </div>
                </div>
              )}
            </div>
            
            {!isProcessing && (
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="gtavi-button-secondary"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Different Image
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-pink-500/20 rounded-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-pink-500" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Upload Your Photo
              </h3>
              <p className="text-white/70 mb-4">
                Drag and drop your image here, or click to browse
              </p>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="gtavi-button-primary"
                disabled={isProcessing}
              >
                <Upload className="w-5 h-5 mr-2" />
                Choose Image
              </button>
              
              <p className="text-sm text-white/50 mt-4">
                Supports JPG, PNG, WebP up to 10MB
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}