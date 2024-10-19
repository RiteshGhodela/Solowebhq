'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'; // Burger & Close Icons
import { gsap } from 'gsap';
import { fonts } from './Fonts';

const menuItems = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Process', href: '#process' },
  { name: 'FAQ', href: '#faq' },
];

const socialIcons = [
  { name: 'Linkedin', Target: '_blank', href: 'https://www.linkedin.com/company/solowebhq/', Icon: FaLinkedinIn },
  { name: 'Instagram', Target: '_blank', href: 'https://www.instagram.com/solowebhq/', Icon: FaInstagram },
];

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state
  const [scrambledText, setScrambledText] = useState({});
  const navbarRef = useRef(null);
  const audioRef = useRef(null);

  
  
  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollTop) {
        // Scroll Down - Hide Navbar
        gsap.to(navbarRef.current, { y: '-100%', duration: 0.3, ease: 'power2.out' });
      } else {
        // Scroll Up - Show Navbar
        gsap.to(navbarRef.current, { y: '0%', duration: 0.3, ease: 'power2.out' });
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', stagger: 0.2 }
    );
  }, []);


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

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };
  const handleAudioMouseLeave =()=>{
if(audioRef.current){
  audioRef.current.pause();
  audioRef.current.currentTime = 0;
}
  }
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/fx.mp3" preload="auto" />

      <nav
        style={{ fontFamily: fonts.monospace }}
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 bg-transparent"
      >
        {/* Logo stays on the left */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/images/logo.svg" width={120} height={120} alt="Logo" priority />
          </Link>
        </div>

        {/* Desktop Menu Items Centered */}
        <div className="hidden md:flex space-x-6 mx-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-black font-normal hover:text-gray-600 text-lg pr-6"
              onMouseEnter={() => {
                scrambleText(item.name);
                playAudio();
              }}
              onMouseLeave={() => {
                restoreText(item.name);
                handleAudioMouseLeave();
              }}
            >
              {scrambledText[item.name] || item.name}
            </Link>
          ))}
        </div>

        {/* Connect Button on Right */}
        <div className="hidden md:flex items-center">
          <Link href="#contact" className="text-lg font-bold text-black hover:text-gray-600"
          onMouseEnter={() => {
            scrambleText('Connect');
            playAudio();
          }}
          onMouseLeave={() => {
            restoreText('Contact')
            handleAudioMouseLeave()
          }}
          >
            {scrambledText['Connect'] || 'Connect'}
          </Link>
        </div>

        {/* Mobile Burger Icon */}
        <button onClick={toggleMobileMenu} className="md:hidden text-3xl">
          {isMobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Menu Layout */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#f8d7c4] z-50 flex flex-col items-center justify-center space-y-6">
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-3xl">
            <HiX />
          </button>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-black text-2xl font-bold"
              onClick={toggleMobileMenu}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex space-x-6">
            {socialIcons.map(({ name, href, Icon }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="text-3xl" />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}