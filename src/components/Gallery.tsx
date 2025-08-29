'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Eye } from 'lucide-react';
import Link from 'next/link';

const galleryImages = [
  { id: 1, src: '/images/gallery/gtaai_background.jpeg', title: 'GTA Style Portrait' },
  { id: 2, src: '/images/gallery/image_10.jpeg', title: 'Urban Character' },
  { id: 3, src: '/images/gallery/image_20.jpeg', title: 'Street Art Style' },
  { id: 4, src: '/images/gallery/image_25.jpeg', title: 'Neon Night Scene' },
  { id: 5, src: '/images/gallery/gtaai_image_30.jpeg', title: 'Vice City Vibe' },
  { id: 6, src: '/images/gallery/image_35.jpeg', title: 'Action Hero' },
  { id: 7, src: '/images/gallery/gtaai_image_40.jpeg', title: 'Crime Boss' },
  { id: 8, src: '/images/gallery/image_45.jpeg', title: 'Street Racer' },
  { id: 9, src: '/images/gallery/image_55.jpeg', title: 'Gang Leader' },
];

interface GalleryImage {
  id: number;
  src: string;
  title: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span className="text-gradient-gtavi">GTA AI</span> Gallery
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Explore amazing transformations created with our AI-powered GTA art generator
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="gtavi-card group cursor-pointer overflow-hidden"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Eye className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">View Full Size</p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-white">{image.title}</h3>
              <p className="text-white/60 text-sm mt-1">AI Generated GTA Art</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <div className="gtavi-card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Create Your Own?
          </h2>
          <p className="text-white/80 mb-6">
            Upload your photo and transform it into stunning GTA-style artwork
          </p>
          <Link href="/#converter" className="gtavi-button-primary">
            Start Creating Now
          </Link>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-lg"
              />
              
              {/* Controls */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = selectedImage.src;
                    link.download = `${selectedImage.title}.jpg`;
                    link.click();
                  }}
                  className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-xl font-bold text-white mb-1">
                  {selectedImage.title}
                </h3>
                <p className="text-white/80">AI Generated GTA Art</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}