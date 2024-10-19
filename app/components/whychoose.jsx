'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Zap, Users, Shield, Globe, Code, TrendingUp, Target } from 'lucide-react'
gsap.registerPlugin(ScrollTrigger)
import { fonts } from './Fonts'
const reasons = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We constantly innovate to stay ahead of the curve.',
  },
  {
    icon: Users,
    title: 'Customer-Centric',
    description: 'Our customers are at the heart of our business.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'You can count on us to deliver, every time.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'We provide our services to clients across the globe.',
  },
  {
    icon: Code,
    title: 'Technical Expertise',
    description: 'Our team possesses top-notch technical skills.',
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    description: 'We focus on delivering measurable outcomes.',
  },
  {
    icon: Target,
    title: 'Focus on Goals',
    description: 'We help you achieve your business goals efficiently.',
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef(null)
  const reasonsRef = useRef([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reasonElements = reasonsRef.current

      // Animate each reason element individually
      reasonElements.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }
  }, [])

  return (
    <section
  ref={sectionRef}
  className="relative bg-black py-32 px-4 sm:py-48 sm:px-8 lg:py-64 lg:px-16 overflow-hidden"
>
    <div className="relative max-w-7xl mx-auto">
      {/* Heading Section */}
      <div className="relative z-10 text-center mb-16 sm:mb-24">
        <h2
          style={{ fontFamily: fonts.cursive }}
          className="text-3xl sm:text-4xl lg:text-6xl font-bold text-blue-200 mb-6 sm:mb-8"
        >
          Why Choose Us
        </h2>
        <p className="text-base sm:text-lg text-blue-200 mb-12 sm:mb-16">
          We're committed to delivering exceptional value and service to our clients.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12 px-2 sm:px-4 lg:px-0">
        {reasons.map((reason, index) => (
          <div
            key={reason.title}
            ref={(el) => (reasonsRef.current[index] = el)}
            className="group rounded-lg border border-blue-700 bg-[#1F1E24] shadow-md p-8 sm:p-10 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 sm:mb-6 group-hover:bg-blue-300 transition-colors duration-300">
              <reason.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-700" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-200 mb-2 sm:mb-4">
              {reason.title}
            </h3>
            <p className="text-sm sm:text-base text-blue-100">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>

</section>
  )
}
