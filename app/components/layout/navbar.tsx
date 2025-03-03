"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AnimatedText } from '@/components/ui/animated-text'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Music', href: '/music' },
  { label: 'Tour', href: '/tour' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsScrolled(offset > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Desktop menu item animation
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
      }
    }),
    hover: { 
      color: '#b8860b',
      textShadow: "0 0 8px rgba(184, 134, 11, 0.7)",
      transition: { duration: 0.3 }
    }
  }

  // Mobile menu animations
  const menuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3 }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const mobileItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500',
        isScrolled 
          ? 'bg-gothic-900/90 backdrop-blur-md border-b border-gothic-700/50 py-3' 
          : 'bg-transparent',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <AnimatedText 
            text="Nocturne Elegance" 
            className="text-xl font-display text-gothic-gold"
            animationType="character"
            animationVariants="glowing"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={itemVariants}
            >
              <Link 
                href={link.href}
                className={cn(
                  "text-sm font-medium font-gothic transition-colors",
                  "hover:text-gothic-gold"
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gothic-silver hover:text-gothic-gold hover:bg-transparent"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-gothic-900/95 backdrop-blur-md md:hidden z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={mobileItemVariants}
                >
                  <Link 
                    href={link.href}
                    className="text-xl font-gothic text-gothic-silver hover:text-gothic-gold transition-colors px-8 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
