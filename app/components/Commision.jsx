'use client'
import { useRef, useState } from "react";

export default function CommissionOpportunity() {

  const audioRef = useRef(null);
  const [scrambledText, setScrambledText] = useState({});

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-[9vh] font-extrabold text-slate-900 leading-tight mb-6">
      Unlock Your Earning Potential
    </h1>
    <p className="text-2xl mb-8">
      Join our commission-based opportunity and start earning today!
    </p>
    <div className="grid gap-6 md:grid-cols-2 mb-12">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Flexible Hours</h2>
        <p>Work when you want, where you want. Perfect for self-starters and go-getters.</p>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Unlimited Earnings</h2>
        <p>Your income is directly tied to your effort. The sky's the limit!</p>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Training Provided</h2>
        <p>Get all the tools and knowledge you need to succeed in this role.</p>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Supportive Community</h2>
        <p>Join a network of like-minded individuals all working towards success.</p>
      </div>
    </div>

    <a 
      href="https://forms.gle/aXLu8NyabYJkLJiJA" 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-black text-white font-medium hover:bg-white hover:text-black text-base py-4 rounded-xl px-6 inline-flex items-center justify-center"
      onMouseEnter={() => {
        scrambleText('Apply Now');
        playAudio();
      }}
      onMouseLeave={() => restoreText('Apply Now')}
    >
      {scrambledText['Apply Now'] || 'Apply Now'}
      
    </a>
  </div>
</section>
</>
  )
}