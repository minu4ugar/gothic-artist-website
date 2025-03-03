"use client"

import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'none'
  motionProps?: MotionProps
}

export function AnimatedContainer({
  children,
  className,
  delay = 0,
  duration = 0.7,
  once = true,
  animation = 'fadeIn',
  motionProps,
  ...props
}: AnimatedContainerProps) {
  
  // Define animation variants
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          delay,
          duration,
          ease: "easeInOut"
        }
      }
    },
    slideUp: {
      hidden: { y: 30, opacity: 0 },
      visible: { 
        y: 0,
        opacity: 1,
        transition: { 
          delay,
          duration,
          ease: "easeOut"
        }
      }
    },
    slideLeft: {
      hidden: { x: -50, opacity: 0 },
      visible: { 
        x: 0,
        opacity: 1,
        transition: { 
          delay,
          duration,
          ease: "easeOut"
        }
      }
    },
    slideRight: {
      hidden: { x: 50, opacity: 0 },
      visible: { 
        x: 0,
        opacity: 1,
        transition: { 
          delay,
          duration,
          ease: "easeOut"
        }
      }
    },
    scale: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { 
        scale: 1,
        opacity: 1,
        transition: { 
          delay,
          duration,
          ease: "easeOut"
        }
      }
    },
    none: {
      hidden: {},
      visible: {}
    }
  }

  const selectedVariant = variants[animation]

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={selectedVariant}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  )
}
