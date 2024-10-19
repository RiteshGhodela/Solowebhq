'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { fonts } from './Fonts';
export default function FAQs() {
  const sectionRef = useRef(null);
  const contentRef = useRef([]);
  const headingRef = useRef(null);

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

  const content = [
    {
      heading: 'What services do you offer?',
      tagline: 'Comprehensive Solutions',
      text: "We offer web design, development, digital marketing, and branding services to help businesses establish a strong online presence.",
    },
    {
      heading: 'How much do your services cost?',
      tagline: 'Affordable Pricing',
      text: "Our prices depend on the scope and complexity of the project. We provide customized quotes based on each client’s specific needs.",
    },
    {
      heading: 'How long does a project take?',
      tagline: 'Timely Delivery',
      text: "The timeline varies based on the project size and requirements. On average, a website project can take between 4 to 6 weeks to complete.",
    },
    {
      heading: 'Do you offer post-launch support?',
      tagline: 'Continuous Support',
      text: "Yes, we provide ongoing support and maintenance to ensure your website remains functional and up to date after launch.",
    },
    {
      heading: 'Can you redesign my existing website?',
      tagline: 'Website Redesign',
      text: "Absolutely! We specialize in redesigning websites to improve their functionality, design, and overall user experience.",
    },
    {
      heading: 'Do you work with small businesses?',
      tagline: 'Supporting Small Businesses',
      text: "Yes, we work with businesses of all sizes, including startups and small businesses, to create tailored solutions that fit their needs.",
    },
    {
      heading: 'Can you help with SEO?',
      tagline: 'Search Engine Optimization',
      text: "Yes, we offer SEO services to help improve your website’s visibility in search engines and attract more organic traffic.",
    },
    {
      heading: 'Do you provide e-commerce solutions?',
      tagline: 'E-commerce Development',
      text: "Yes, we develop custom e-commerce websites that are secure, scalable, and optimized for user experience and conversions.",
    },
    {
      heading: 'What platforms do you develop on?',
      tagline: 'Technology Platforms',
      text: "We develop on various platforms such as WordPress, Shopify, Next.js, and custom-built solutions depending on your project needs.",
    },
    {
      heading: 'How do I get started?',
      tagline: 'Kickstart Your Project',
      text: "You can contact us through our website, and we'll discuss your project requirements to provide a custom solution and quote.",
    },
  ];
  return (
    <section id="faq" className="flex flex-wrap min-h-screen bg-[#FAF7F5]" ref={sectionRef}>
  {/* FAQ Heading Section */}
  <div className="w-full md:w-1/3 flex items-start justify-start p-6 sm:p-10 mt-10 sm:mt-20">
    <h1
      style={{ fontFamily: fonts.cursive }}
      className="text-[13vw] md:text-[8vw] font-bold text-black"
      ref={headingRef}
    >
      FAQ
    </h1>
  </div>

  {/* FAQ Content Section */}
  <div className="w-full md:w-2/3 ml-auto text-left flex flex-col gap-12 sm:gap-16 py-10 sm:py-20 px-6 sm:pr-10">
    {content.map((item, index) => (
      <div
        key={index}
        ref={(el) => (contentRef.current[index] = el)}
        className="paragraph flex flex-col justify-start px-4 sm:px-16 py-8 sm:py-10"
      >
        <h2 className="text-5xl sm:text-[4vw] font-semibold text-black mb-2 sm:mb-4">
          {item.heading}
        </h2>
        <h3 className="text-2xl sm:text-[2vw] font-extralight text-black mb-2">
          {item.tagline}
        </h3>
        <p className="text-lg sm:text-2xl text-black font-thin">
          {item.text}
        </p>
      </div>
    ))}
  </div>
</section>

  );
}
