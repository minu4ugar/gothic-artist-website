"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, PlayCircle, Calendar, Disc, UserRound } from 'lucide-react'

import { PageLayout } from '@/components/layout/page-layout'
import { Button } from '@/components/ui/button'
import { AnimatedText } from '@/components/ui/animated-text'
import { AnimatedContainer } from '@/components/ui/animated-container'
import { GothicCard } from '@/components/ui/gothic-card'

export default function HomePage() {
  // Parallax scrolling effect
  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  // Custom cursor effect
  const [mousePosition, setMousePosition] = React.useState({x: 0, y: 0})
  const [cursorVariant, setCursorVariant] = React.useState("default")
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    window.addEventListener("mousemove", mouseMove)
    
    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])
  
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 40,
      width: 40,
      backgroundColor: "rgba(128, 0, 32, 0.4)",
      mixBlendMode: "difference" as "difference",
      transition: {
        type: "spring",
        mass: 0.6
      }
    }
  }
  
  // Enter and exit hover states
  const enterHover = () => setCursorVariant("hover")
  const exitHover = () => setCursorVariant("default")

  // Latest album data
  const latestAlbum = {
    title: "Shadows of Eternity",
    releaseDate: "February 24, 2025",
    coverImage: "https://placehold.co/600x600/1a1a1a/b8860b?text=Album+Cover",
    tracks: [
      { title: "Midnight Whispers", duration: "4:32" },
      { title: "Echoes in Darkness", duration: "5:17" },
      { title: "Velvet Silence", duration: "3:58" },
      { title: "Crimson Tears", duration: "6:21" },
    ]
  }

  // Tour dates
  const tourDates = [
    { city: "London", venue: "Gothic Cathedral", date: "April 15, 2025" },
    { city: "Paris", venue: "Dark Elegance Hall", date: "April 22, 2025" },
    { city: "Berlin", venue: "Shadowlands Arena", date: "April 29, 2025" },
    { city: "New York", venue: "Obsidian Palace", date: "May 10, 2025" },
  ]

  return (
    <PageLayout>
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gothic-gold pointer-events-none z-50 hidden md:block mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
      />
      
      {/* Hero section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background elements with parallax effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: y1 }}
        >
          <div className="absolute inset-0 bg-gothic-900 opacity-80" />
          <Image
            src="https://placehold.co/1920x1080/1a1a1a/1a1a1a"
            alt="Background texture"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 z-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-gothic-gold rounded-full opacity-40"
              initial={{ 
                x: Math.random() * 100 - 50 + "vw", 
                y: Math.random() * 100 + "vh" 
              }}
              animate={{ 
                y: [
                  Math.random() * 100 + "vh", 
                  Math.random() * 20 + "vh"
                ],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        {/* Hero content */}
        <div className="container relative z-20 text-center px-4">
          <motion.div style={{ opacity }}>
            <AnimatedContainer animation="fadeIn" className="mb-6">
              <p className="text-gothic-silver/70 text-sm uppercase tracking-widest mb-3">
                Official Website
              </p>
              <AnimatedText 
                text="NOCTURNE ELEGANCE" 
                className="text-4xl md:text-6xl lg:text-7xl font-display text-gothic-gold mb-4"
                animationType="character"
                animationVariants="glowing"
              />
              <p className="text-gothic-silver/90 text-lg md:text-xl max-w-2xl mx-auto">
                Dark atmospheric melodies for the restless soul
              </p>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fadeIn" delay={0.8} className="mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  variant="gothic" 
                  size="lg"
                  className="group"
                  onMouseEnter={enterHover}
                  onMouseLeave={exitHover}
                >
                  <span>EXPLORE MUSIC</span>
                  <Disc className="ml-2 group-hover:animate-spin" size={16} />
                </Button>
                <Button 
                  variant="accent" 
                  size="lg"
                  className="group"
                  onMouseEnter={enterHover}
                  onMouseLeave={exitHover}
                >
                  <span>UPCOMING SHOWS</span>
                  <Calendar className="ml-2 group-hover:rotate-12 transition-transform" size={16} />
                </Button>
              </div>
            </AnimatedContainer>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth"
              })
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="text-gothic-gold" size={32} />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Latest release section */}
      <section className="py-20 bg-gothic-gradient">
        <div className="container px-4">
          <AnimatedContainer animation="slideUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-gothic-gold mb-4">
              Latest Release
            </h2>
            <p className="text-gothic-silver/70 max-w-2xl mx-auto">
              Experience our newest musical journey into the depths of darkness and beauty
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <AnimatedContainer animation="slideLeft">
              <div className="relative aspect-square max-w-md mx-auto">
                <Image
                  src={latestAlbum.coverImage}
                  alt={latestAlbum.title}
                  fill
                  className="object-cover rounded-md"
                />
                <motion.div 
                  className="absolute inset-0 bg-gothic-900/70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <motion.button
                    className="text-gothic-gold"
                    whileHover={{ scale: 1.1 }}
                    onMouseEnter={enterHover}
                    onMouseLeave={exitHover}
                  >
                    <PlayCircle size={64} />
                  </motion.button>
                </motion.div>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slideRight">
              <div className="bg-gothic-800/50 backdrop-blur-sm p-6 rounded-md border border-gothic-700/50">
                <h3 className="text-2xl font-display text-gothic-gold mb-2">
                  {latestAlbum.title}
                </h3>
                <p className="text-gothic-silver/80 mb-6">
                  Released: {latestAlbum.releaseDate}
                </p>
                
                <div className="space-y-3 mb-6">
                  {latestAlbum.tracks.map((track, index) => (
                    <motion.div 
                      key={track.title}
                      className="flex justify-between items-center p-3 border-b border-gothic-700/30 hover:bg-gothic-700/20 rounded-sm transition-colors cursor-pointer"
                      whileHover={{ x: 5 }}
                      onMouseEnter={enterHover}
                      onMouseLeave={exitHover}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.1 * index + 0.5 }
                      }}
                    >
                      <div className="flex items-center">
                        <span className="text-gothic-gold/70 mr-3">{index + 1}</span>
                        <span className="text-gothic-silver">{track.title}</span>
                      </div>
                      <span className="text-gothic-silver/60">{track.duration}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button variant="gothic" onMouseEnter={enterHover} onMouseLeave={exitHover}>
                    Stream Album
                  </Button>
                  <Button variant="outline" onMouseEnter={enterHover} onMouseLeave={exitHover}>
                    Buy Digital
                  </Button>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* Tour dates section */}
      <section className="py-20 bg-gothic-900 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8860b' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: '60px 60px'
          }}/>
        </div>
        
        <div className="container relative z-10 px-4">
          <AnimatedContainer animation="slideUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-gothic-gold mb-4">
              Upcoming Shows
            </h2>
            <p className="text-gothic-silver/70 max-w-2xl mx-auto">
              Experience the haunting melodies and mesmerizing performances live
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tourDates.map((tour, index) => (
              <AnimatedContainer 
                key={tour.city} 
                animation="slideUp" 
                delay={0.1 * index + 0.3}
              >
                <GothicCard
                  title={tour.city}
                  subtitle={tour.venue}
                  hoverEffect="glow"
                  className="h-full"
                  onMouseEnter={enterHover}
                  onMouseLeave={exitHover}
                >
                  <div className="mt-auto pt-4">
                    <p className="text-gothic-gold/90 mb-4">{tour.date}</p>
                    <Button variant="gothic" className="w-full">
                      Get Tickets
                    </Button>
                  </div>
                </GothicCard>
              </AnimatedContainer>
            ))}
          </div>
          
          <AnimatedContainer animation="fadeIn" delay={0.8} className="text-center mt-12">
            <Link href="/tour">
              <Button 
                variant="outline" 
                className="border-gothic-gold/50 text-gothic-gold"
                onMouseEnter={enterHover}
                onMouseLeave={exitHover}
              >
                View All Tour Dates
              </Button>
            </Link>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* About teaser section */}
      <section className="py-20 bg-gothic-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-accent-gradient opacity-10 -skew-x-12" />
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-accent-gradient opacity-10 -skew-x-12" />
        
        <div className="container relative z-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedContainer animation="slideLeft">
              <h2 className="text-3xl md:text-4xl font-display text-gothic-gold mb-6">
                The Darkness Behind the Music
              </h2>
              <p className="text-gothic-silver/90 mb-6">
                Nocturne Elegance emerged from the shadows of conventional music to create a unique blend of gothic atmospheres and haunting melodies that speak directly to the soul.
              </p>
              <p className="text-gothic-silver/80 mb-8">
                Our sonic journey explores themes of melancholy, beauty in darkness, and the eternal dance between light and shadow.
              </p>
              
              <Link href="/about">
                <Button 
                  variant="gothic" 
                  className="group"
                  onMouseEnter={enterHover}
                  onMouseLeave={exitHover}
                >
                  <span>DISCOVER OUR STORY</span>
                  <UserRound className="ml-2 group-hover:scale-110 transition-transform" size={16} />
                </Button>
              </Link>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slideRight">
              <div className="relative aspect-video rounded-md overflow-hidden border border-gothic-700/50">
                <Image
                  src="https://placehold.co/800x450/1a1a1a/b8860b?text=Band+Photo"
                  alt="Nocturne Elegance"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gothic-900/90 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    className="bg-gothic-900/50 backdrop-blur-sm rounded-full p-4 text-gothic-gold border border-gothic-gold/30"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 15px rgba(184, 134, 11, 0.5)"
                    }}
                    onMouseEnter={enterHover}
                    onMouseLeave={exitHover}
                  >
                    <PlayCircle size={48} />
                  </motion.button>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
