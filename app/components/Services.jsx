"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import VanillaTilt from 'vanilla-tilt'
import { ArrowRight, Monitor, Smartphone, Palette, Zap, Shield, Cloud, Brain, BarChart3 } from 'lucide-react'
import { fonts } from "./Fonts"
gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Monitor,
    title: "Web Development",
    description: "Custom websites tailored to your needs, built with cutting-edge technologies."
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and attractive user interfaces that enhance user experience."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your existing web applications for better user engagement."
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Protect your digital assets and data with advanced security measures."
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Scalable and reliable cloud solutions for your growing business needs."
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Implement AI and machine learning to revolutionize your projects."
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Turn your data into actionable insights with advanced analytics."
  }
]

export default function Services() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const serviceRefs = useRef([])
  const audioRef = useRef(null)

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to the start
      audioRef.current.play(); // Play audio on hover
    }
  };

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const desc = descRef.current
    const serviceElements = serviceRefs.current

    if (section && title && desc && serviceElements) {
      gsap.fromTo(
        section,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse"
          }
        }
      )

      gsap.fromTo(
        [title, desc],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            toggleActions: "play none none reverse"
          }
        }
      )

      serviceElements.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.1 * index,
              scrollTrigger: {
                trigger: section,
                start: "top center",
                toggleActions: "play none none reverse"
              }
            }
          )

          VanillaTilt.init(el, {
            max: 10,
            speed: 400,
            scale: 1.03,
            transition: true,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            glare: true,
            'max-glare': 0.2,
            gyroscope: true,
            gyroscopeMinAngleX: -45,
            gyroscopeMaxAngleX: 45,
            gyroscopeMinAngleY: -45,
            gyroscopeMaxAngleY: 45
          })

          el.addEventListener('mouseenter', () => {
            gsap.to(el, {
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              y: -5,
              duration: 0.3
            })
          })

          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              y: 0,
              duration: 0.3
            })
          })
        }
      })
    }
  }, [])

  return (
    
    <>
    <audio ref={audioRef} src="/audio/fx.mp3" preload="auto" />
    <section id="services"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center bg-black text-gray-800 py-20 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2
        style={{ fontFamily: fonts.cursive }}
          ref={titleRef}
          className="text-6xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-[#FAF7F5]"
        >
          Our Services
        </h2>
        <p
          ref={descRef}
          className="text-xl text-[#FAF7F5] max-w-3xl mx-auto"
        >
          Empowering your digital journey with cutting-edge solutions tailored to your unique needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
      
      >
        {services.map((service, index) => (
          <div
            key={service.title}
            ref={el => (serviceRefs.current[index] = el)}
            className="bg-#FAF7F5 text-[#FAF7F5] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 bg-opacity-30
            hover:bg-opacity-90 transform-gpu will-change-transform"
            style={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
            }}
            onMouseEnter={() => {
              playAudio();
            }}
          >
            <div className="text-primary mb-6 p-4 bg-primary-foreground rounded-full">
              <service.icon size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
            <p className="text-[#FAF7F5] mb-6">{service.description}</p>
            
          </div>
        ))}
      </div>
    </section>
    
    </>
  )
}