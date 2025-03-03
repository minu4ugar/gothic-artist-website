"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  animationType?: 'character' | 'word'
  animationDelay?: number
  animationVariants?: 'fadeIn' | 'slideUp' | 'glowing'
}

export function AnimatedText({
  text,
  className,
  once = true,
  animationType = 'word',
  animationDelay = 0,
  animationVariants = 'fadeIn'
}: AnimatedTextProps) {
  // Split text into characters or words
  const tokens = animationType === 'character' 
    ? Array.from(text)
    : text.split(/(\s+)/) // Split by whitespace but keep the spaces

  // Define animation variants
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: (i: number) => ({
        opacity: 1,
        transition: { 
          delay: i * 0.05 + animationDelay,
          duration: 0.5 
        }
      })
    },
    slideUp: {
      hidden: { y: 20, opacity: 0 },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: { 
          delay: i * 0.05 + animationDelay,
          duration: 0.5,
          ease: "easeOut"
        }
      })
    },
    glowing: {
      hidden: { opacity: 0, textShadow: "0 0 0px rgba(184, 134, 11, 0)" },
      visible: (i: number) => ({
        opacity: 1,
        textShadow: "0 0 8px rgba(184, 134, 11, 0.7)",
        transition: { 
          delay: i * 0.08 + animationDelay,
          duration: 0.7
        }
      })
    }
  }

  const selectedVariant = variants[animationVariants]

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={selectedVariant}
          className={token === " " ? "inline-block" : "inline-block"}
        >
          {token === " " ? "\u00A0" : token}
        </motion.span>
      ))}
    </motion.span>
  )
}
