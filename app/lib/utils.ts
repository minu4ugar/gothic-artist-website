import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

// Animation helper functions
export const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      delay,
      duration: 0.8,
      ease: "easeInOut"
    }
  }
})

export const slideUp = (delay: number = 0) => ({
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      delay,
      duration: 0.7,
      ease: "easeOut"
    }
  }
})

export const slideIn = (direction: 'left' | 'right', delay: number = 0) => ({
  hidden: { 
    x: direction === 'left' ? -50 : 50, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      delay,
      duration: 0.7,
      ease: "easeOut"
    }
  }
})

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren
    }
  }
})

export const letterAnimation = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
    },
  }),
}
