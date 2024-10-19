'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fonts } from './Fonts';
const Loader = () => {
  const [count, setCount] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev < 100 ? prev + 1 : prev));
    }, 10); // Adjust speed as needed
    if (count === 100) {
      clearInterval(interval);
      setTimeout(() => {
        setLoadingComplete(true);
      }, 2000); // Delay for brand name display
    }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      {!loadingComplete ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          {/* Loading Line */}
          <div className="flex flex-col items-center">

            {/* Brand Name (Appear at 100%) */}
            {count === 100 && (
              <motion.div
              style={{ fontFamily: fonts.monospace }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white text-[22vh] font-bold mb-8"
              >
                Solowebhq
              </motion.div>
            )}
            <div className="w-64 h-1 bg-gray-600 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-green-700"
                initial={{ width: '0%' }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Counting Numbers */}
            <div className="text-white text-2xl font-semibold">{count}%</div>

            
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, type: 'spring' }}
        >
          {/* Website content after loader */}
          <ChasePattern />
        </motion.div>
      )}
    </>
  );
};

// Sample Chase Pattern Component for Website Reveal
const ChasePattern = () => {
  return (
    <></>
  );
};

export default Loader;
