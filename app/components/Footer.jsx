'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { fonts } from './Fonts';


const Footer = () => {
  const controls = useAnimation();
  const [scrambledText, setScrambledText] = useState({});

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }));
  }, [controls]);


  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to the start
      audioRef.current.play(); // Play audio on hover
    }
  };


  const scrambleText = (text) => {
    let iterations = 0;
    const interval = setInterval(() => {
      setScrambledText((prev) => ({
        ...prev,
        [text]: text
          .split('')
          .map((char, index) => {
            if (index < iterations) return char;
            return String.fromCharCode(33 + Math.random() * 94);
          })
          .join(''),
      }));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };
  
  const restoreText = (text) => {
    setScrambledText((prev) => ({
      ...prev,
      [text]: text,
    }));
  };





  return (
    <>
    <audio ref={audioRef} src="/audio/fx.mp3" preload="auto" />
    <footer className="bg-black relative w-full min-h-screen text-white py-12 overflow-hidden">
  {/* Background Animation */}
  <motion.div
    className="absolute inset-0 z-0"
    initial={{ backgroundPosition: '0% 0%' }}
    animate={{ backgroundPosition: '100% 100%' }}
    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 20, ease: 'linear' }}
    style={{
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
    }}
  />

  {/* Content Container */}
  <motion.div
    className="relative z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Top Section */}
    <div className="text-center mb-24 px-6">
      <motion.h2
        style={{ fontFamily: fonts.cursive }}
        className="text-[10vw] font-bold mb-4 pt-8 leading-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        SOLOWEBHQ
      </motion.h2>
      <motion.p
        className="text-lg mb-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Let our projects speak for themselves and schedule your free consultation with us today.
      </motion.p>
      <motion.a
        href="https://calendly.com/supportdesignjoy/let-s-build-your-dream-website"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          className="px-8 py-3 bg-white text-black rounded-xl shadow hover:bg-green-600 hover:text-black transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onMouseEnter={() => {
            scrambleText('Book A CALL');
            playAudio();
          }}
          onMouseLeave={() => restoreText('Book A CALL')}
        >
          {scrambledText['Book A CALL'] || 'Book A CALL'}
        </motion.button>
      </motion.a>
    </div>

    {/* Three Headings Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 pt-10  max-w-6xl mx-auto px-6">
      {['Web Agency', 'Our Solution', 'Legal'].map((heading, i) => (
        <motion.div
          key={i}
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 + i * 0.1 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">{heading}</h3>
          <ul className="space-y-2">
            {heading === 'Web Agency' &&
              ['Process', 'Services', 'About us', 'FAQ'].map((link, j) => (
                <motion.li
                  key={`${heading}-${link}-${j}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * j }} 
                  onMouseEnter={() => {
                    scrambleText(link);
                    playAudio();
                  }}
                  onMouseLeave={() => restoreText(link)}             
                   >
                   <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:underline">
                   {scrambledText[link] || link}
              </a>
                </motion.li>
              ))}
            {heading === 'Our Solution' &&
              ['Website Development', 'Website Design', 'Ecommerce', 'SEO'].map((link, j) => (
                <motion.li
                  key={`${heading}-${link}-${j}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * j }}
                  onMouseEnter={() => {
                    scrambleText(link);
                    playAudio();
                  }}
                  onMouseLeave={() => restoreText(link)}
                >
                  {scrambledText[link] || link}
                </motion.li>
              ))}
            {heading === 'Legal' &&
              ['Terms of Service', 'Privacy Policy'].map((link, j) => (
                <motion.li
                  key={`${heading}-${link}-${j}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * j }}
                  onMouseEnter={() => {
                    scrambleText(link);
                    playAudio();
                  }}
                  onMouseLeave={() => restoreText(link)}
                >
                  {scrambledText[link] || link}
                </motion.li>
              ))}
          </ul>
        </motion.div>
      ))}
    </div>

    {/* Copyright Section */}
    <motion.div
      className="text-center pt-56 pb-0 mb-0  mx-auto text-gray-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      &copy; 2024 SolowebHQ. All rights reserved.
    </motion.div>
  </motion.div>
</footer>
    </>
  );
};

export default Footer;