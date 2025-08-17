'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { serviceRoutes, mainNavItems } from '@/data/navigation';
import Image from 'next/image';
import Dark_logo from '@/../public/images/Dark_mode.png';
import Light_logo from '@/../public/images/light_mode.png';
import { useTheme } from '@/contexts/ThemeContext';

// Define variants with proper typing
const mobileMenuVariants: Variants = {
  hidden: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const menuItemsStagger = {
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Group services by category for desktop dropdown
  const groupedServices = serviceRoutes.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof serviceRoutes>);
  
  return (
    <motion.header 
      className="sticky top-0 z-50 bg-[var(--color-surface-100)]/95 backdrop-blur-lg border-b border-[var(--color-border)] shadow-[var(--shadow-sm)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Contact Info Bar */}
      <div className="hidden lg:block bg-[var(--color-surface-200)] border-b border-[var(--color-border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-[var(--color-primary)]">📞</span>
                <a href="tel:+15712028529" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  +1 (571) 202-8529
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--color-primary)]">✉️</span>
                <a href="mailto:shah4268@msn.com" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  shah4268@msn.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-[var(--color-text-secondary)]">
              <span className="flex items-center space-x-1">
                <span className="text-[var(--color-primary)]">📍</span>
                <span>Columbia, MD | Tysons, VA</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
        <motion.button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-surface-200)] transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle mobile menu"
        >
          <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
          >
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
          </motion.svg>
        </motion.button>
        
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  <Image 
                      src={theme === 'dark' ? Dark_logo : Light_logo}
                      alt="Disk Doctor Logo"                   
                      className="object-contain h-12 w-auto max-w-[180px]"
                      width={180}
                      height={32}
                      priority
                    />
                </motion.div>
            </Link>
          </motion.div>
        </div>
          
          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden lg:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 flex items-center">
                SERVICES
                <motion.svg 
                  className="ml-1 w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ rotate: isServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-[600px] bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-lg shadow-[var(--shadow-lg)] z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-6 grid grid-cols-2 gap-6">
                      {Object.entries(groupedServices).map(([category, services]) => (
                        <div key={category}>
                          <h4 className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-3 border-b border-[var(--color-border)] pb-2">
                            {category}
                          </h4>
                          <ul className="space-y-2">
                            {services.map((service) => (
                              <li key={service.href}>
                                <Link
                                  href={service.href}
                                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 block py-1 px-2 rounded hover:bg-[var(--color-surface-200)]"
                                >
                                  {service.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Add BLOG navigation item */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link 
                href="/blog" 
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                BLOG
              </Link>
            </motion.div>

            {mainNavItems.slice(1).map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
              >
                <Link 
                  href={item.href} 
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--color-surface-200)] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
            <Link href="tel:+1-800-DISKDOC" className="hidden sm:block font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors duration-300">
              📞 +1 (571) 202-8529
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                <Link href="mailto:shah4268@msn.com" className="px-2 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-medium text-center transition-all duration-300">
                Free Quote
                </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-4 pb-4 border-t border-[var(--color-border)] pt-4 overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              <motion.nav 
                className="flex flex-col space-y-1"
                variants={menuItemsStagger}
                initial="hidden"
                animate="visible"
              >
                {/* Mobile Services Section */}
                <motion.div variants={menuItemVariants}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between py-3 px-2 text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-200)] rounded-lg transition-colors"
                  >
                    <span>All Services</span>
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 mt-2 space-y-1 max-h-64 overflow-y-auto">
                          {Object.entries(groupedServices).map(([category, services]) => (
                            <div key={category} className="mb-3">
                              <h5 className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2">
                                {category}
                              </h5>
                              {services.map((service) => (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 py-1 px-2 rounded hover:bg-[var(--color-surface-200)]"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setMobileServicesOpen(false);
                                  }}
                                >
                                  {service.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Add BLOG to mobile menu */}
                <motion.div variants={menuItemVariants}>
                  <Link 
                    href="/blog" 
                    className="block text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-200)] transition-colors duration-300 py-3 px-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    BLOG
                  </Link>
                </motion.div>
                
                {/* Other Navigation Items */}
                {mainNavItems.slice(1).map((item) => (
                  <motion.div key={item.href} variants={menuItemVariants}>
                    <Link 
                      href={item.href} 
                      className="block text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-200)] transition-colors duration-300 py-3 px-2 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div variants={menuItemVariants}>
                  <Link 
                    href="tel:+15712028529" 
                    className="block text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-surface-200)] transition-colors duration-300 py-3 px-2 border-t border-[var(--color-border)] mt-3 pt-4 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📞 +1 (571) 202-8529 (Call Now)
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
