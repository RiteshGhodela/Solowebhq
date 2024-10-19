'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { gsap } from 'gsap';
import { fonts } from './Fonts';


const menuItems = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Process', href: '#process' },
  { name: 'FAQ', href: '#faq' },
];

const socialIcons = [
  { name: 'Twitter', Target: '_blank', href: 'https://x.com/RITESHGHODELA', Icon: FaTwitter },
  { name: 'Linkedin', Target: '_blank', href: 'https://www.linkedin.com/in/riteshghodela/', Icon: FaLinkedinIn },
  { name: 'Instagram', Target: '_blank', href: 'https://www.instagram.com/solowebhq/', Icon: FaInstagram },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [scrambledText, setScrambledText] = useState({});
  const navbarRef = useRef(null);
  const lineRef = useRef(null);
  const prevScrollPos = useRef(0);
  const audioRef = useRef(null); // Reference for audio element

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // GSAP animation for navbar entry
    gsap.fromTo(
      navbarRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', stagger: 0.2 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingUp = prevScrollPos.current > currentScrollPos;

      if (scrollingUp) {
        gsap.to(navbarRef.current, { y: 0, duration: 0.5, ease: 'power4.out' });
        gsap.to(lineRef.current, { y: 0, duration: 0.5, ease: 'power4.out' });
      } else {
        gsap.to(navbarRef.current, { y: -100, duration: 0.5, ease: 'power4.in' });
        gsap.to(lineRef.current, { y: -100, duration: 0.5, ease: 'power4.in' });
      }

      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoother and faster text scramble effect
  const scrambleText = (text) => {
    let iterations = 0;
    const interval = setInterval(() => {
      setScrambledText((prev) => ({
        ...prev,
        [text]: text
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return char;
            }
            return String.fromCharCode(33 + Math.random() * 94);
          })
          .join(''),
      }));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3; // Faster scramble effect
    }, 30); // Smoother and faster transition
  };

  const restoreText = (text) => {
    setScrambledText((prev) => ({
      ...prev,
      [text]: text,
    }));
  };


  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to the start
      audioRef.current.play(); // Play audio on hover
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} src="/audio/fx.mp3" preload="auto" />

      {/* Static Navbar */}
      <nav
      style={{ fontFamily: fonts.monospace }}
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center p-4 bg-transparent"
      >
        <div className="absolute left-16">
          <Link href="/">
            <Image src="/images/logo.svg" width={150} height={150} alt="Logo" priority />
          </Link>
        </div>
        <div className="flex space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-black font-normal hover:text-gray-600 text-lg pr-6"
              onMouseEnter={() => {
                scrambleText(item.name);
                playAudio();
              }}
              onMouseLeave={() => restoreText(item.name)}
            >
              {scrambledText[item.name] || item.name}
            </Link>
          ))}
        </div>
        <div className="absolute right-1">
        <button 
        style={{ fontFamily: fonts.monospace }}
  onMouseEnter={() => {
    scrambleText('Connect');
    playAudio();
  }}
  onMouseLeave={() => restoreText('Connect')}
  onClick={() => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  }}
  className="text-black font-bold rounded-2xl hover:text-gray-600 text-lg mr-5"
>
  {scrambledText['Connect'] || 'Connect'}
</button>
        </div>
      </nav>

      {/* Horizontal Line */}
      <div
        ref={lineRef}
        className="fixed left-0 right-0 top-16 h-0.5 bg-black z-30"
      />
    </>
  );
}