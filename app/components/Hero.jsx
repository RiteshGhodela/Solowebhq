"use client"; 
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { fonts } from "./Fonts";

const Hero = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const videoRef = useRef(null);
  const button1Ref = useRef(null);
  const text1Ref = useRef(null);
  const button2Ref = useRef(null);
  const text2Ref = useRef(null);
  const audioRef = useRef(null);
  const [scrambledText, setScrambledText] = useState({});

  
  useLayoutEffect(() => {
    const chars = headingRef.current?.querySelectorAll(".char");
    const subChars = subheadingRef.current?.querySelectorAll(".char");
    const video = videoRef.current;

    // Animations for heading and subheading
    gsap.fromTo(
      chars,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      subChars,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: "top 80%",
        },
      }
    );

    // Video reveal animation
    gsap.fromTo(
      video,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: video,
          start: "top 90%",
        },
      }
    );

    
    // Magnetic button effect with debouncing
    const magneticEffect = (e, buttonRef, textRef) => {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to([buttonRef.current, textRef.current], {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const resetEffect = (buttonRef, textRef) => {
      gsap.to([buttonRef.current, textRef.current], {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const addMagneticEffect = (buttonRef, textRef) => {
      const handleMouseMove = (e) => magneticEffect(e, buttonRef, textRef);
      buttonRef.current?.addEventListener("mousemove", handleMouseMove);
      buttonRef.current?.addEventListener("mouseleave", () =>
        resetEffect(buttonRef, textRef)
      );

      return () => {
        buttonRef.current?.removeEventListener("mousemove", handleMouseMove);
        buttonRef.current?.removeEventListener("mouseleave", resetEffect);
      };
    };

    const cleanup1 = addMagneticEffect(button1Ref, text1Ref);
    const cleanup2 = addMagneticEffect(button2Ref, text2Ref);

    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  const splitText = (text) =>
    text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

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
  <div className="relative w-full h-screen text-black bg-[#f8d7c4] overflow-hidden">
    {/* Heading */}
    <h1
      ref={headingRef}
      style={{ fontFamily: fonts.serif }}
      className="w-[90%] sm:w-[85%] top-40  text-[5.4vh] sm:text-[16vw] md:text-[10vw] 
                 font-medium leading-tight absolute left-[5%] sm:left-[8%] 
                 flex flex-wrap items-center"
    >
      {splitText("Turning coffee into code,")}
      <div className="mx-2 flex items-center" ref={videoRef}>
        <video
          src="/videos/vid.mp4"
          className="w-[100px] h-[50px] sm:w-[150px] sm:h-[70px] 
                     object-cover bg-center rounded-xl shadow-xl 
                     transition-transform duration-500 ease-out 
                     hover:scale-150 hover:skew-x-12"
          autoPlay
          loop
          muted
        />
      </div>
      {splitText("dreams into")}
      {splitText(" websites")}
    </h1>

    {/* Subheading */}
    <p
      ref={subheadingRef}
      style={{ fontFamily: fonts.monospace }}
      className="text-xl sm:text-lg md:text-xl font-medium 
        text-orange-800 absolute sm:bottom-[15%] bottom-[30%] lg:bottom-[5%] left-[10%] w-[80%] sm:w-[50%] 
        text-center sm:text-left"
    >
      {splitText("Unlock profit with monthly design sprints.")}
    </p>

    {/* Buttons */}
    <div className="absolute justify-center  bottom-[5%] right-[5%] sm:right-[10%] flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
      <motion.a
        href="https://calendly.com/supportdesignjoy/let-s-build-your-dream-website"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          ref={button1Ref}
          style={{ fontFamily: fonts.monospace }}
          className="w-[300px] sm:w-[200px] h-[50px] sm:h-[60px] 
                     bg-lime-400 text-black font-semibold border-black border-2 
                     hover:bg-black hover:text-white hover:border-white 
                     rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => {
            scrambleText('Book A Demo');
            playAudio();
          }}
          onMouseLeave={() => restoreText('Book A Demo')}
        >
          <span ref={text1Ref}>{scrambledText['Book A Demo'] || 'Book A Demo'}</span>
        </motion.button>
      </motion.a>

      <motion.button
        ref={button2Ref}
        style={{ fontFamily: fonts.monospace }}
        className="w-[300px] sm:w-[200px] h-[50px] sm:h-[60px] 
                   bg-black text-white 
                   hover:bg-slate-500 hover:text-white hover:border-black 
                   rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onClick={() =>
          document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
        }
        onMouseEnter={() => {
          scrambleText('Contact');
          playAudio();
        }}
        onMouseLeave={() => restoreText('Contact')}
      >
        <span ref={text2Ref}>  {scrambledText['Contact'] || 'Contact'}</span>
      </motion.button>
    </div>
  </div>
</>
  );
};

export default Hero;