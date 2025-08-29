'use client';

import { motion } from 'framer-motion';
import { Upload, Sparkles, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="container mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gradient-gtavi">GTA AI</span>
            <br />
            <span className="text-white">
              Free Magical GTA Art Image Generator
            </span>
          </h1>
          
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Transform photos to authentic GTA art with our AI-powered GTA image generator. 
            Create stunning GTA-style characters and scenes instantly.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="gtavi-button-primary text-lg px-8 py-4">
              <Upload className="w-5 h-5 mr-2" />
              Upload & Transform
            </button>
            <button className="gtavi-button-secondary text-lg px-8 py-4">
              <Sparkles className="w-5 h-5 mr-2" />
              View Gallery
            </button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="gtavi-card text-center">
              <Upload className="w-8 h-8 mx-auto mb-4 text-pink-500" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Easy Upload
              </h3>
              <p className="text-white/70">
                Simply drag and drop your photo to get started
              </p>
            </div>

            <div className="gtavi-card text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-4 text-cyan-500" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                AI Powered
              </h3>
              <p className="text-white/70">
                Advanced AI transforms your photos into GTA-style art
              </p>
            </div>

            <div className="gtavi-card text-center">
              <Download className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Instant Download
              </h3>
              <p className="text-white/70">
                Download your transformed image in high quality
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}