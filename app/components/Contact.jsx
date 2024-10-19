'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fonts } from './Fonts'
gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [responseMessage, setResponseMessage] = useState('')
  const [scrambledText, setScrambledText] = useState({});
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from(infoRef.current, {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.from('.animate-title', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to([formRef.current, infoRef.current, '.animate-title'], {
            opacity: 1,
            y: 0,
            x: 0,
            stagger: 0.2,
          })
        },
        onLeaveBack: () => {
          gsap.to([formRef.current, infoRef.current, '.animate-title'], {
            opacity: 0,
            y: 50,
            x: 100,
            stagger: 0.2,
          })
        },
      })
    }, sectionRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;  // NEXT_PUBLIC_ prefix for exposing env variables to the client
    const url = process.env.NEXT_PUBLIC_FORMS_URL;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          access_key: apiKey,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResponseMessage('Your message has been sent successfully!')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        })
      } else {
        setResponseMessage('There was an error sending your message. Please try again.')
      }
    } catch (error) {
      setResponseMessage('An error occurred. Please try again later.')
    }
  }

  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to the start
      audioRef.current.play(); // Play audio on hover
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
      <div id='contact'
        ref={sectionRef}
        className="relative w-full min-h-screen bg-[#FAF7F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl w-full space-y-8">
          <h2 style={{ fontFamily: fonts.cursive }} className="animate-title text-[12vh] md:text-[12vh] lg:text-[12vh] font-bold text-black text-center mb-12">
            Get in touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div ref={formRef} className="bg-gray-300 p-8 rounded-md shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onMouseEnter={() => {
                      scrambleText('Submit');
                      playAudio();
                    }}
                    onMouseLeave={() => restoreText('Submit')}
                  >
                    {scrambledText['Submit'] || 'Submit'}
                  </button>
                </div>
              </form>
              {responseMessage && <p className="mt-4 text-center text-gray-600">{responseMessage}</p>}
            </div>

            <div ref={infoRef} className="space-y-12 mt-12 md:mt-0">
              <div>
                <h3 className="text-lg leading-6 font-medium text-black">Visit Us</h3>
                <p className="mt-2 text-base text-gray-500">Mandsaur, Madhya Pradesh, India</p>
              </div>

              <div className="mt-2">
                <iframe
                  className="w-full h-64 border-0 rounded-md"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d641.541888238715!2d75.06182289161038!3d24.06543027136947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2sin!4v1728376027309!5m2!1sen!2sin"
                  loading="lazy"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
