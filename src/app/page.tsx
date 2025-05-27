'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesPerView = 3;
  
  // Data recovery case studies and success stories
  const carouselItems = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      alt: "Hard drive data recovery process",
      category: "HARD DRIVE RECOVERY",
      title: "Critical Business Data Recovered from Failed Enterprise Drive"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      alt: "RAID server recovery",
      category: "RAID RECOVERY",
      title: "Complete RAID 5 Array Restoration for Healthcare Provider"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1720048169387-84bbb8fd8ec9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "SSD data recovery",
      category: "SSD RECOVERY",
      title: "Advanced SSD Recovery Using Specialized Firmware Tools"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1533749047139-189de3cf06d3?auto=format&fit=crop&w=800&q=80",
      alt: "Mobile device recovery",
      category: "MOBILE RECOVERY",
      title: "Emergency Recovery of Legal Evidence from Water-Damaged Phone"
    }
  ];

  // Data recovery services
  const recoveryServices = [
    {
      id: "hard-drive",
      icon: "M20 6a2 2 0 002-2V2a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2h16zm-2 4H6v6h12V10z",
      title: "Hard Drive Recovery",
      description: "Professional recovery from mechanical and logical failures in HDDs and SSDs with Class 100 cleanroom facilities."
    },
    {
      id: "raid-server",
      icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z",
      title: "RAID & Server Recovery",
      description: "Expert recovery from all RAID configurations including 0, 1, 5, 6, 10, and complex enterprise storage systems."
    },
    {
      id: "forensic",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Forensic Recovery",
      description: "Court-admissible data recovery with proper chain of custody for legal investigations and litigation support."
    },
    {
      id: "emergency",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Emergency Recovery",
      description: "24/7 emergency data recovery services for critical business operations with same-day evaluation available."
    }
  ];

  // Client testimonials from real data recovery scenarios
  const testimonials = [
    {
      id: 1,
      quote: "DiskDoctor saved our law firm when our main server crashed during a major case. They recovered 100% of our client files within 48 hours. Absolutely professional and reliable service.",
      author: "Robert Chen",
      position: "Managing Partner",
      company: "Chen & Associates Legal",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80"
    },
    {
      id: 2,
      quote: "After our accounting department's drive failed, we thought we lost years of financial records. DiskDoctor's forensic team recovered everything, even files we thought were permanently deleted.",
      author: "Maria Rodriguez",
      position: "CFO",
      company: "TechStart Innovations",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80"
    },
    {
      id: 3,
      quote: "The photographers' nightmare - a corrupted memory card with an entire wedding shoot. DiskDoctor recovered every single photo. They literally saved my business and reputation.",
      author: "James Thompson",
      position: "Professional Photographer",
      company: "Thompson Photography Studio",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80"
    }
  ];

  const slides = [...carouselItems, ...carouselItems, ...carouselItems];

  // Animation effects on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Set initial position to show the middle set of slides
    const initialPosition = carouselItems.length;
    setActiveSlide(initialPosition);
    
    // Auto-advance carousel every 5 seconds
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Handle slide transition completion
    if (activeSlide <= 0) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setActiveSlide(carouselItems.length);
          setTimeout(() => {
            if (carouselRef.current) carouselRef.current.style.transition = 'transform 500ms ease';
          }, 50);
        }
      }, 500);
    } else if (activeSlide >= slides.length - slidesPerView) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setActiveSlide(carouselItems.length);
          setTimeout(() => {
            if (carouselRef.current) carouselRef.current.style.transition = 'transform 500ms ease';
          }, 50);
        }
      }, 500);
    }
  }, [activeSlide, carouselItems.length, slides.length]);

  const handlePrev = () => {
    setActiveSlide(prev => prev - 1);
  };

  const handleNext = () => {
    setActiveSlide(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-[var(--font-sans)]">
      {/* Header with Data Recovery Focus */}
      <header className="sticky top-0 z-50 bg-[var(--color-surface-100)] backdrop-blur-lg border-b border-[var(--color-border)] shadow-[var(--shadow-sm)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-surface-200)] transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/" className="text-2xl font-bold tracking-tight text-[var(--color-primary)] flex items-center">
                <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6a2 2 0 002-2V2a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2h16zm-2 4H6v6h12V10z"/>
                </svg>
                DiskDoctor
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="#services" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">SERVICES</Link>
              <Link href="#about" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">ABOUT US</Link>
              <Link href="#case-studies" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">CASE STUDIES</Link>
              <Link href="#contact" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">CONTACT</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="tel:+1-800-DISKDOC" className="hidden sm:block font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-300">
                📞 1-800-DISKDOC
              </Link>
              <Link href="#quote" className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-medium transition-all duration-300">
                FREE QUOTE
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-[var(--color-border)] pt-4">
              <nav className="flex flex-col space-y-3">
                <Link href="#services" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 py-2">SERVICES</Link>
                <Link href="#about" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 py-2">ABOUT US</Link>
                <Link href="#case-studies" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 py-2">CASE STUDIES</Link>
                <Link href="#contact" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 py-2">CONTACT</Link>
                <Link href="tel:+1-800-DISKDOC" className="text-sm font-medium text-[var(--color-primary)] transition-colors duration-300 py-2 border-t border-[var(--color-border)] pt-3">📞 1-800-DISKDOC</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Data Recovery Focus */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-72 h-72 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="animate-on-scroll opacity-0 transition-opacity duration-1000">
              <div className="mb-6">
                <span className="inline-block bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-sm font-medium">
                  TRUSTED SINCE 1991 • 95% SUCCESS RATE
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-[var(--color-text-primary)]">
                Your Data is <span className="text-[var(--color-primary)]">Recoverable</span>
              </h1>
              <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl leading-relaxed">
                Professional data recovery from hard drives, SSDs, RAID systems, and all digital media. When your data matters, trust the experts with over 30 years of experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="#quote" className="px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-semibold transition-all duration-300 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] text-center">
                  Get Free Evaluation
                </Link>
                <Link href="tel:+1-800-DISKDOC" className="px-8 py-4 bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] font-semibold hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-hover)] transition-all duration-300 text-center">
                  📞 Emergency: 1-800-DISKDOC
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-primary)]">95%</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-primary)]">30+</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-primary)]">50K+</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Cases Recovered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-primary)]">24/7</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Emergency Service</div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="relative h-[400px] lg:h-[500px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80"
                  alt="Professional data recovery laboratory with technician working on hard drive"
                  fill
                  className="object-cover rounded-2xl shadow-[var(--shadow-lg)]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-[var(--color-accent)] rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute top-1/2 -right-6 h-16 w-16 bg-[var(--color-primary)] rounded-full opacity-60 animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Recovery Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[var(--color-text-primary)]">
              Professional <span className="text-[var(--color-primary)]">Data Recovery</span> Services
            </h2>
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Comprehensive data recovery solutions for individuals, businesses, and government agencies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {recoveryServices.map((service, index) => (
              <div 
                key={service.id}
                className="bg-[var(--color-surface-100)] border border-[var(--color-border)] p-6 lg:p-8 rounded-2xl hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-primary-200)] transition-all duration-300 group animate-on-scroll opacity-0 transition-opacity duration-1000"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="rounded-full w-16 h-16 bg-[var(--color-primary-50)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary-100)] transition-colors duration-300">
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {service.description}
                </p>
                <a href="#" className="inline-flex items-center text-[var(--color-primary)] font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300">
                  Learn more
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16">
            <Link href="#contact" className="px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-inverse)] rounded-lg transition-all duration-300 inline-flex items-center font-medium shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:scale-105">
              <span>Start Your Recovery</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Recovery Process Section */}
      <section className="py-16 lg:py-24 bg-[var(--color-surface-200)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[var(--color-text-primary)]">
              Our Recovery <span className="text-[var(--color-primary)]">Process</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Professional, secure, and transparent data recovery in 4 simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                step: "01",
                image: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=800&q=80",
                title: "Free Evaluation",
                description: "Send us your device for a comprehensive diagnostic assessment at no cost.",
                color: "var(--color-primary)"
              },
              {
                step: "02", 
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
                title: "Expert Analysis",
                description: "Our certified technicians analyze your device in our ISO Class 100 cleanroom.",
                color: "var(--color-accent)"
              },
              {
                step: "03",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", 
                title: "Data Recovery",
                description: "Advanced tools and proprietary techniques recover your valuable data safely.",
                color: "var(--color-primary-400)"
              },
              {
                step: "04",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",
                title: "Secure Delivery",
                description: "Your recovered data is securely transferred to new media and delivered to you.",
                color: "var(--color-accent-400)"
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 animate-on-scroll opacity-0 transition-opacity duration-1000 hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64 lg:h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10"></div>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.step}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-white text-lg font-semibold leading-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: step.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Carousel */}
      <section id="case-studies" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4 md:mb-0">
              Recovery <span className="text-[var(--color-primary)]">Success Stories</span>
            </h2>
            <div className="flex items-center">
              <button 
                onClick={handlePrev}
                className="p-3 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface-200)] hover:border-[var(--color-border-hover)] transition-all duration-300 mr-3"
                aria-label="Previous case study"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="p-3 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface-200)] hover:border-[var(--color-border-hover)] transition-all duration-300"
                aria-label="Next case study"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Responsive Carousel */}
          <div className="overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(calc(-${activeSlide * 100 / slides.length}% - ${8 * activeSlide}px))` 
              }}
            >
              {slides.map((slide, index) => (
                <div 
                  key={`${slide.id}-${index}`} 
                  className="min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.33%-16px)] px-2 flex-shrink-0"
                >
                  <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 h-full group">
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
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-black/80 text-white text-xs px-3 py-1 rounded-lg font-medium">
                          {slide.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2">
                        {slide.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-3 leading-relaxed">
                        Discover how our advanced recovery techniques and expert technicians successfully restored critical data when others said it was impossible.
                      </p>
                      <a href="#" className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] hover:underline group-hover:translate-x-1 transition-transform duration-300">
                        Read Case Study
                        <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicator Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx + carouselItems.length)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  (activeSlide - carouselItems.length) % carouselItems.length === idx 
                    ? 'bg-[var(--color-primary)] w-10' 
                    : 'bg-[var(--color-border)] w-6 hover:bg-[var(--color-border-hover)]'
                }`}
                aria-label={`Go to case study ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Client Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[var(--color-text-primary)]">
              Client <span className="text-[var(--color-primary)]">Success Stories</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Real stories from clients who trusted DiskDoctor with their most critical data recovery needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 lg:p-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 animate-on-scroll opacity-0 transition-opacity duration-1000 hover:border-[var(--color-primary-200)] group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4 border-2 border-[var(--color-primary-100)] group-hover:border-[var(--color-primary-200)] transition-colors duration-300">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">{testimonial.author}</div>
                    <div className="text-sm text-[var(--color-text-secondary)]">{testimonial.position}</div>
                    <div className="text-sm text-[var(--color-primary)]">{testimonial.company}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <svg className="h-8 w-8 text-[var(--color-primary-300)] mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[var(--color-text-secondary)] italic leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[var(--color-accent-500)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
              Need <span className="text-[var(--color-primary)]">Emergency</span> Data Recovery?
            </h2>
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              Don't let data loss stop your business. Contact our emergency recovery team now for immediate assistance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.836l1.498 4.493a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.493 1.498a1 1 0 01.684.949V17a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">24/7 Emergency Line</h3>
                <p className="text-[var(--color-primary)] font-bold">1-800-DISKDOC</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Email Support</h3>
                <p className="text-[var(--color-primary)] font-bold">emergency@diskdoctor.com</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Nationwide Service</h3>
                <p className="text-[var(--color-primary)] font-bold">Free Pickup Available</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="tel:+1-800-DISKDOC" className="px-8 py-4 bg-[var(--color-accent-600)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-semibold transition-all duration-300 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] text-center">
                📞 Call Emergency Line
              </Link>
              <Link href="#quote" className="px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-inverse)] rounded-lg font-semibold transition-all duration-300 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] text-center">
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[var(--color-surface-200)] border-t border-[var(--color-border)] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0">
              <Link href="/" className="text-2xl font-bold tracking-tight inline-flex items-center text-[var(--color-primary)]">
                <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6a2 2 0 002-2V2a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2h16zm-2 4H6v6h12V10z"/>
                </svg>
                DiskDoctor
                <span className="ml-2 text-xs bg-[var(--color-primary)] text-[var(--color-text-inverse)] px-2 py-0.5 rounded">
                  DATA RECOVERY SPECIALISTS
                </span>
              </Link>
            </div>
            
            <div className="flex space-x-6">
              {[
                { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors duration-300 p-2 rounded-lg hover:bg-[var(--color-surface-100)]"
                  aria-label={social.name}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                title: 'Services',
                links: ['Hard Drive Recovery', 'RAID Recovery', 'SSD Recovery', 'Mobile Recovery']
              },
              {
                title: 'Company',
                links: ['About Us', 'Certifications', 'Careers', 'News']
              },
              {
                title: 'Support',
                links: ['Emergency Service', 'Case Studies', 'FAQ', 'Recovery Process']
              },
              {
                title: 'Contact',
                links: ['1-800-DISKDOC', 'Locations', 'Free Evaluation', 'Get Quote']
              }
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4 text-[var(--color-text-primary)]">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-[var(--color-text-tertiary)] mb-4 md:mb-0">
              © 2023 DiskDoctor Data Recovery. All rights reserved. | Trusted since 1991
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {['Privacy Policy', 'Terms of Service', 'Data Security', 'Certifications'].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Emergency Contact Banner */}
      
    </div>
  );
}
