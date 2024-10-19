"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Marquee({ logos, speed = 50 }) {
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!marqueeRef.current || !contentRef.current) return;

    const marquee = marqueeRef.current;
    const content = contentRef.current;
    const contentWidth = content.offsetWidth;

    // Set initial position
    gsap.set(content, { x: 0 });

    // Create the animation
    const tl = gsap.timeline({ repeat: -1 });

    tl.to([content], {
      x: `-=${contentWidth}`,
      duration: contentWidth / speed,
      ease: "none",
      onComplete: () => {
        gsap.set(content, { x: 0 });
      },
    });

    return () => {
      tl.kill();
    };
  }, [speed, logos]);

  return (
        <div className="overflow-hidden bg-black w-full" ref={marqueeRef}>
          <div className="flex items-center whitespace-nowrap gap-12" ref={contentRef}> {/* Added gap-6 */}
            {logos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-8 w-32 py-2">
                <img src={logo} alt={`Logo ${index + 1}`} className="h-12 w-auto" />
              </div>
            ))}
          </div>
        </div>
      );

}
