'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { fonts } from './Fonts';
import { motion, useScroll, useTransform } from "framer-motion";
export default function AboutUsSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef([]);
  const headingRef = useRef(null);
 // Track vertical scroll
  useEffect(() => {
    const paragraphs = contentRef.current;



    // Animate each paragraph to appear as we scroll down
    paragraphs.forEach((paragraph) => {
      gsap.fromTo(
        paragraph,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: paragraph,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Sticky heading until the last paragraph
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: headingRef.current,
      pinSpacing: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);




  useEffect(() => {
    // Create the fade-out animation
    gsap.to(headingRef.current, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // When the section starts
        end: "bottom 20%", // When the section reaches 20% from the bottom
        scrub: true, // Smooth scrolling effect
      },
    });
  }, []);
  const content = [
    {
      heading: 'Our Passion',
      tagline: 'Driving Innovation',
      text: "We are passionate about innovation, pushing boundaries to bring creative, impactful solutions. Our goal is to inspire and connect people through technology.",
    },
    {
      heading: 'Our Mission',
      tagline: 'Creating Impact',
      text: "We create meaningful solutions that positively impact lives, combining empathy and innovation to help clients achieve their goals and transform industries.",
    },
    {
      heading: 'Our Expertise',
      tagline: 'Years of Experience',
      text: "With years of experience, we deliver high-quality outcomes. Our expertise spans design, development, and user experience, ensuring tailored, robust solutions.",
    },
    {
      heading: 'Our Vision',
      tagline: 'Transforming the World',
      text: "We harness technology to drive positive societal change. Our vision is to innovate, enhance experiences, and create a more connected and equitable future.",
    },
    {
      heading: 'Our Commitment',
      tagline: 'Unwavering Quality',
      text: "We are committed to excellence and quality in every project. Our rigorous standards and client-first approach ensure we deliver the best value.",
    },
    {
      heading: 'Our Culture',
      tagline: 'Continuous Growth',
      text: "We foster a culture of learning, curiosity, and growth. By investing in our people, we ensure continuous innovation and remain ahead of industry trends.",
    },
    {
      heading: 'Our Approach',
      tagline: 'Collaborative Success',
      text: "Collaboration is key to our success. We work closely with clients, valuing diverse perspectives and building solutions aligned with their goals.",
    },
    {
      heading: 'Our Impact',
      tagline: 'Beyond Business',
      text: "We focus on social responsibility and sustainability, striving to make a positive community impact. We believe businesses should be agents of change.",
    },
  ];

  return (
    <section
      id="about"
      className="flex flex-col lg:flex-row min-h-screen bg-black"
      ref={sectionRef}
    >
      {/* Heading Section */}
      <div className="w-full lg:w-1/3 lg:h-screen flex items-start lg:items-center justify-center p-6 lg:p-10 mt-10 lg:mt-0">
        <div className="relative lg:sticky top-10 lg:top-20">
          <h1
            style={{ fontFamily: fonts.cursive }}
            className="text-[10vw] lg:text-[6vw] font-bold text-[#FAF7F5] text-center lg:text-left"
            ref={headingRef}
          >
            About Us
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 mx-auto text-left flex flex-col gap-10 lg:gap-16 py-10 lg:py-20 px-4 lg:pr-10">
        {content.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-start p-6 lg:px-16 lg:py-44"
          >
            <h2 className="text-[8vw] lg:text-[6vw] font-light text-[#FAF7F5] mb-2">
              {item.heading}
            </h2>
            <h3 className="text-[4vw] lg:text-[2vw] font-extralight text-[#FAF7F5] mb-2">
              {item.tagline}
            </h3>
            <p className="text-lg lg:text-2xl text-[#FAF7F5] font-thin">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>

  );
}
