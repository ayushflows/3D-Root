import React, { useState, useEffect } from 'react';
import { Printer, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-7xl z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80' : 'bg-transparent'
    } backdrop-blur-md border-b border-white/5`}>
      <div className="mx-auto">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-light text-white">
              3D<span className="font-normal bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">Root</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/login" className="text-gray-200 hover:text-white font-semibold px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg transform hover:scale-105 transition-transform duration-300">Login</a>
          </div>
        </div>
      </div>

    </nav>
  );
}