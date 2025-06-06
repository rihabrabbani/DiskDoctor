'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
import { caseStudies } from '@/data/caseStudies';
import CarouselControls from '../ui/CarouselControls';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function CaseStudiesCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesPerView = 3;
  
  const slides = [...caseStudies, ...caseStudies, ...caseStudies];

  useEffect(() => {
    const initialPosition = caseStudies.length;
    setActiveSlide(initialPosition);
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (activeSlide <= 0) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setActiveSlide(caseStudies.length);
          setTimeout(() => {
            if (carouselRef.current) carouselRef.current.style.transition = 'transform 500ms ease';
          }, 50);
        }
      }, 500);
    } else if (activeSlide >= slides.length - slidesPerView) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setActiveSlide(caseStudies.length);
          setTimeout(() => {
            if (carouselRef.current) carouselRef.current.style.transition = 'transform 500ms ease';
          }, 50);
        }
      }, 500);
    }
  }, [activeSlide, slides.length, caseStudies.length]);

  const handlePrev = () => {
    setActiveSlide(prev => prev - 1);
  };

  const handleNext = () => {
    setActiveSlide(prev => prev + 1);
  };

  return (
    <section id="case-studies" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4 md:mb-0">
            Recovery <span className="text-[var(--color-primary)]">Success Stories</span>
          </h2>
          <CarouselControls 
            handlePrev={handlePrev}
            handleNext={handleNext}
            totalSlides={slides.length}
            activeSlide={activeSlide}
            displayedSlides={caseStudies.length}
          />
        </motion.div>
        
        {/* Responsive Carousel */}
        <div className="overflow-hidden">
          <motion.div 
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(calc(-${activeSlide * 100 / slides.length}% - ${8 * activeSlide}px))` 
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {slides.map((slide, index) => (
              <motion.div 
                key={`${slide.id}-${index}`} 
                className="min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.33%-16px)] px-2 flex-shrink-0"
                variants={cardVariants}
              >
                <motion.div 
                  className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 h-full group"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <motion.div 
                      className="absolute bottom-4 left-4 right-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-block bg-black/80 text-white text-xs px-3 py-1 rounded-lg font-medium">
                        {slide.category}
                      </span>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2">
                      {slide.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-3 leading-relaxed">
                      Discover how our advanced recovery techniques and expert technicians successfully restored critical data when others said it was impossible.
                    </p>
                    <motion.a 
                      href="#" 
                      className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] hover:underline"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Read Case Study
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
