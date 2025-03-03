"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { cn } from '@/lib/utils'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  noFooter?: boolean
  pageKey?: string
}

export function PageLayout({ 
  children, 
  className,
  noFooter = false,
  pageKey = 'page' 
}: PageLayoutProps) {
  const [loading, setLoading] = useState(true)
  
  // Simulate page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.19, 1.0, 0.22, 1.0],
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
      }
    }
  }

  // Loader variants
  const loaderVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  // Gothic loading indicator design
  const LoadingIndicator = () => (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gothic-900"
      variants={loaderVariants}
      initial="initial"
      exit="exit"
    >
      <div className="relative">
        <motion.div
          className="h-20 w-20 rounded-full border-2 border-gothic-accent"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
            rotate: 360
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-2 border-gothic-gold"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gothic-900">
      <Navbar />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingIndicator key="loader" />
        ) : (
          <motion.main
            key={pageKey}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn("flex-grow", className)}
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>
      
      {!noFooter && <Footer />}
    </div>
  )
}
