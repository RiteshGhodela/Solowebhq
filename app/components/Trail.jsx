"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const AMOUNT = 20
const SINE_DOTS = Math.floor(AMOUNT * 0.3)
const WIDTH = 40 // Increased from 26 to 40
const IDLE_TIMEOUT = 150

export default function Trail() {
  const cursorRef = useRef(null)
  const [dots, setDots] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [idle, setIdle] = useState(false)
  const timeoutRef = useRef(null)
  const requestRef = useRef()
  const previousTimeRef = useRef()

  useEffect(() => {
    const buildDots = () => {
      const newDots = []
      for (let i = 0; i < AMOUNT; i++) {
        newDots.push({
          x: 0,
          y: 0,
          scale: 1 - 0.05 * i, // Reduced scale decrease to make dots larger
          range: WIDTH / 3 - (WIDTH / 3) * (1 - 0.05 * i) + 2,
          limit: WIDTH * 0.75 * (1 - 0.05 * i)
        })
      }
      setDots(newDots)
    }

    buildDots()
  }, [])

  useEffect(() => {
    const handleMouseMove = event => {
      setMousePosition({
        x: event.clientX - WIDTH / 2,
        y: event.clientY - WIDTH / 2
      })
      resetIdleTimer()
    }

    const handleTouchMove = event => {
      setMousePosition({
        x: event.touches[0].clientX - WIDTH / 2,
        y: event.touches[0].clientY - WIDTH / 2
      })
      resetIdleTimer()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  const resetIdleTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIdle(false)
    timeoutRef.current = setTimeout(() => {
      setIdle(true)
      setDots(prevDots =>
        prevDots.map(dot => ({
          ...dot,
          lockX: dot.x,
          lockY: dot.y,
          angleX: Math.PI * 2 * Math.random(),
          angleY: Math.PI * 2 * Math.random()
        }))
      )
    }, IDLE_TIMEOUT)
  }

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current

      setDots(prevDots => {
        let x = mousePosition.x
        let y = mousePosition.y

        return prevDots.map((dot, index) => {
          const newDot = { ...dot }

          if (!idle || index <= SINE_DOTS) {
            newDot.x = x
            newDot.y = y
          } else {
            newDot.angleX = (newDot.angleX || 0) + 0.05
            newDot.angleY = (newDot.angleY || 0) + 0.05
            newDot.y =
              (newDot.lockY || 0) + Math.sin(newDot.angleY || 0) * newDot.range
            newDot.x =
              (newDot.lockX || 0) + Math.sin(newDot.angleX || 0) * newDot.range
          }

          if (!idle || index <= SINE_DOTS) {
            const nextDot = prevDots[index + 1] || prevDots[0]
            const dx = (nextDot.x - newDot.x) * 0.35
            const dy = (nextDot.y - newDot.y) * 0.35
            x += dx
            y += dy
          }

          return newDot
        })
      })
    }

    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [mousePosition, idle])

  return (
    <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-50">
      {dots.map((dot, index) => (
        <motion.span
          key={index}
          className="absolute bg-orange-800 rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            scale: dot.scale,
            width: `${WIDTH * 0.7}px`, // Increased dot size
            height: `${WIDTH * 0.7}px` // Increased dot size
          }}
        />
      ))}
    </div>
  )
}
