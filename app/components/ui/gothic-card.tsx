"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface GothicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  imageUrl?: string
  imageAlt?: string
  children?: React.ReactNode
  className?: string
  hoverEffect?: 'glow' | 'scale' | 'tilt' | 'none'
  variant?: 'default' | 'bordered' | 'minimal'
}

export function GothicCard({
  title,
  subtitle,
  imageUrl,
  imageAlt = "Card image",
  children,
  className,
  hoverEffect = 'glow',
  variant = 'default',
  ...props
}: GothicCardProps) {
  
  // Define hover animations
  const hoverAnimations = {
    glow: {
      hover: { 
        boxShadow: "0 0 15px rgba(128, 0, 32, 0.6)",
        transition: { duration: 0.3 }
      }
    },
    scale: {
      hover: { 
        scale: 1.03,
        transition: { duration: 0.3 }
      }
    },
    tilt: {
      hover: { 
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      }
    },
    none: {}
  }

  // Define variant styles
  const variantStyles = {
    default: "bg-gothic-800 border border-gothic-700",
    bordered: "bg-transparent border-2 border-gothic-accent/70",
    minimal: "bg-gothic-900 backdrop-blur-sm border-b border-gothic-gold/30"
  }

  return (
    <motion.div
      className={cn(
        "rounded-md overflow-hidden p-5 transition-all duration-500",
        variantStyles[variant],
        className
      )}
      initial="initial"
      whileHover="hover"
      variants={hoverAnimations[hoverEffect]}
      {...props}
    >
      {imageUrl && (
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-sm">
          <Image 
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gothic-900/90 to-transparent" />
        </div>
      )}
      
      {title && (
        <h3 className={cn(
          "text-lg font-display text-gothic-gold",
          subtitle ? "mb-1" : "mb-3"
        )}>
          {title}
        </h3>
      )}
      
      {subtitle && (
        <p className="text-sm text-gothic-silver/80 mb-3 font-gothic">
          {subtitle}
        </p>
      )}
      
      {children}
    </motion.div>
  )
}
