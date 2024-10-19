"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fonts } from './Fonts';
gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    title: "Discovery",
    description: "We explore your needs and market opportunities.",
    content: "In the discovery phase, we conduct in-depth interviews, market research, and competitive analysis to understand your unique challenges and opportunities."
  },
  {
    title: "Strategy",
    description: "We develop a comprehensive plan aligned with your goals.",
    content: "Our strategy phase involves creating a detailed roadmap, defining key performance indicators, and outlining the resources needed to achieve your objectives."
  },
  {
    title: "Design",
    description: "We create intuitive and visually appealing solutions.",
    content: "During the design phase, we focus on user experience, interface design, and creating prototypes that bring your vision to life while ensuring usability and aesthetic appeal."
  },
  {
    title: "Development",
    description: "We build robust and scalable solutions.",
    content: "Our development process involves writing clean, efficient code, implementing features, and ensuring your solution is built on a solid, scalable foundation."
  },
  {
    title: "Testing",
    description: "We rigorously test to ensure quality and reliability.",
    content: "In the testing phase, we conduct thorough quality assurance, including functional testing, user acceptance testing, and performance optimization to deliver a flawless product."
  },
  {
    title: "Deployment",
    description: "We launch your solution with precision and care.",
    content: "During deployment, we carefully roll out your solution, ensuring smooth integration with existing systems and providing comprehensive documentation and training."
  },
  {
    title: "Support",
    description: "We provide ongoing assistance and maintenance.",
    content: "Our support phase involves providing responsive customer service, regular maintenance, and proactive monitoring to keep your solution running smoothly."
  },
  {
    title: "Optimization",
    description: "We continuously improve based on data and feedback.",
    content: "In the optimization phase, we analyze performance data, gather user feedback, and implement iterative improvements to enhance your solution's effectiveness and user satisfaction."
  }
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pinAnimation = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-700vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "3000 top",
          scrub: 0.6,
          pin: true,
        }
      }
    );

    return () => {
      pinAnimation.kill();
    };
  }, []);

  return (
    <section id="process" className="bg-[#FAF7F5] text-white">
  {/* Heading Section */}
  <div className="py-10 flex items-center justify-center">
    <h1
      style={{ fontFamily: fonts.cursive }}
      className="text-5xl sm:text-6xl md:text-8xl font-medium text-black text-center"
    >
      Our Process
    </h1>
  </div>

  {/* Process Content */}
  <div ref={triggerRef} className="overflow-x-auto">
    <div
      ref={sectionRef}
      className="h-screen flex flex-nowrap relative"
      style={{ width: `${processes.length * 100}vw` }}
    >
      {processes.map((process, index) => (
        <div
          key={index}
          className="h-screen w-screen flex flex-col md:flex-row items-center justify-center px-6 sm:px-12"
        >
          {/* Left Content */}
          <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium text-black mb-6">
              {process.title}
            </h2>
            <p className="text-lg sm:text-xl text-black mb-8">
              {process.description}
            </p>
            <p className="text-base sm:text-lg text-black">{process.content}</p>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/4 md:pl-12">
            <div className="bg-black p-6 sm:p-8 rounded-lg">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4">
                Step {index + 1}
              </h3>
              <p className="text-lg sm:text-xl text-[#3eeeb9]">
                {process.title}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}
