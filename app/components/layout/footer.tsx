"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube, Facebook, Mail, MusicIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedContainer } from '@/components/ui/animated-container'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Youtube size={20} />, href: '#', label: 'YouTube' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <MusicIcon size={20} />, href: '#', label: 'Spotify' },
  ]

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Music', href: '/music' },
    { label: 'Tour', href: '/tour' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className={cn(
      'relative bg-gothic-900 border-t border-gothic-700/30 py-12',
      className
    )}>
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gradient" />
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand & Social */}
          <AnimatedContainer animation="slideUp" delay={0.1} className="flex flex-col">
            <h3 className="text-xl font-display text-gothic-gold mb-4">Nocturne Elegance</h3>
            <p className="text-gothic-silver/80 mb-6 text-sm">
              Crafting dark atmospheric melodies for the restless soul. Follow us on social media for the latest updates.
            </p>
            
            <div className="flex space-x-4 mt-auto">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gothic-silver hover:text-gothic-gold transition-colors"
                  whileHover={{ 
                    scale: 1.1, 
                    color: '#b8860b',
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.3 + (i * 0.1) }
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </AnimatedContainer>
          
          {/* Quick Links */}
          <AnimatedContainer animation="slideUp" delay={0.2} className="flex flex-col">
            <h3 className="text-lg font-gothic text-gothic-gold mb-4">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="text-gothic-silver/90 hover:text-gothic-gold transition-colors text-sm py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </AnimatedContainer>
          
          {/* Newsletter */}
          <AnimatedContainer animation="slideUp" delay={0.3} className="flex flex-col">
            <h3 className="text-lg font-gothic text-gothic-gold mb-4">Join Our Dark Circle</h3>
            <p className="text-gothic-silver/80 mb-4 text-sm">
              Subscribe to receive exclusive content, early access to music, and tour announcements.
            </p>
            
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gothic-800 border border-gothic-700 rounded-l-md px-4 py-2 text-sm w-full focus:outline-none focus:border-gothic-gold focus:ring-1 focus:ring-gothic-gold/50 transition-all"
              />
              <button className="bg-gothic-accent hover:bg-gothic-accent/90 text-white px-4 rounded-r-md transition-colors flex items-center">
                <Mail size={16} />
              </button>
            </div>
          </AnimatedContainer>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gothic-700/30 text-center text-sm text-gothic-silver/60">
          <AnimatedContainer animation="fadeIn" delay={0.4}>
            © {new Date().getFullYear()} Nocturne Elegance. All rights reserved.
          </AnimatedContainer>
        </div>
      </div>
    </footer>
  )
}
