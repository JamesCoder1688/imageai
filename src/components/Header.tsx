'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { label: 'Create', href: '#converter' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex h-14 xl:h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative w-8 h-8"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/images/gallery/gtaai_favicon.svg"
                alt="GTA AI Logo"
                className="w-full h-full"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600/20 to-cyan-500/20 blur-sm -z-10" />
            </motion.div>
            <span className="text-xl font-bold text-gradient-gtavi">
              GTA AI
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-pink-600/10 focus:bg-pink-600/10 focus:text-pink-400 focus:outline-none text-white/80 hover:text-pink-400"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="gtavi-button-secondary size-8 p-0.5 rounded-full">
              <Languages className="size-3" />
              <span className="sr-only">Switch language</span>
            </button>
            <Link href="#converter" className="gtavi-button-primary">
              Start Creating
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-7 h-7">
              <img
                src="/images/gallery/gtaai_favicon.svg"
                alt="GTA AI Logo"
                className="w-full h-full"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600/20 to-cyan-500/20 blur-sm -z-10" />
            </div>
            <span className="text-lg font-bold text-gradient-gtavi">
              GTA AI
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <button className="gtavi-button-secondary size-8 p-0.5 rounded-full">
              <Languages className="size-3" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="gtavi-button-secondary h-8 px-3"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-pink-600/20"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-white/80 hover:text-pink-400 hover:bg-pink-600/10 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#converter"
                onClick={() => setIsMenuOpen(false)}
                className="gtavi-button-primary w-full mt-4"
              >
                Start Creating
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}