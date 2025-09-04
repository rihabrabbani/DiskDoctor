'use client';

import { motion } from 'framer-motion';
import { LocationData } from '@/data/locations';
import { Star, Quote } from 'lucide-react';

interface LocationTestimonialsProps {
  location: LocationData;
}

const testimonials = [
  {
    name: 'Sarah Mitchell',
    title: 'Small Business Owner',
    location: 'Columbia, MD',
    rating: 5,
    text: 'Lost 5 years of business data when our server crashed. Disk Doctor recovered everything in 3 days. Their team was professional, transparent about the process, and delivered exactly what they promised. Highly recommend!',
    recovered: 'Business files, accounting records, customer database'
  },
  {
    name: 'Dr. Michael Rodriguez',
    title: 'Medical Practice',
    location: 'Baltimore, MD',
    rating: 5,
    text: 'Patient records are critical to our practice. When our RAID array failed, Disk Doctor handled our data with complete confidentiality and recovered everything. Their secure process gave us complete peace of mind.',
    recovered: 'Patient records, medical images, practice management data'
  },
  {
    name: 'Jennifer Chen',
    title: 'Photography Studio',
    location: 'Washington, DC',
    rating: 5,
    text: 'My external drive with client wedding photos crashed right before delivery. I was devastated! Disk Doctor recovered every single photo. They saved my business and my reputation. Worth every penny!',
    recovered: 'Wedding photos, RAW files, edited images'
  },
  {
    name: 'Robert Thompson',
    title: 'Government Contractor',
    location: 'Arlington, VA',
    rating: 5,
    text: 'Security and data integrity are paramount in our work. Disk Doctor met all our compliance requirements and successfully recovered critical project files from a failed SSD. Excellent service!',
    recovered: 'Project files, technical documentation, presentations'
  },
  {
    name: 'Lisa Park',
    title: 'University Professor',
    location: 'Rockville, MD',
    rating: 5,
    text: 'Years of research data seemed lost when my laptop died. Disk Doctor not only recovered my files but also provided detailed explanations of what happened. Professional and educational experience!',
    recovered: 'Research data, academic papers, student records'
  },
  {
    name: 'Mark Wilson',
    title: 'IT Manager',
    location: 'Annapolis, MD',
    rating: 5,
    text: 'Multiple drive failures in our RAID 5 array. Other companies said it was impossible to recover. Disk Doctor proved them wrong and recovered 100% of our data. True experts in their field!',
    recovered: 'Email archives, shared files, database backups'
  }
];

export default function LocationTestimonials({ location }: LocationTestimonialsProps) {
  // Filter testimonials to show local ones first, then others
  const localTestimonials = testimonials.filter(t => 
    t.location.includes(location.city) || 
    location.nearbyAreas.some(area => t.location.includes(area))
  );
  
  const otherTestimonials = testimonials.filter(t => 
    !t.location.includes(location.city) && 
    !location.nearbyAreas.some(area => t.location.includes(area))
  );
  
  const displayTestimonials = [...localTestimonials, ...otherTestimonials].slice(0, 6);

  return (
    <section className="py-20 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6">
            What {location.city} Customers Say About Us
          </h2>
          <p className="text-xl text-[var(--color-text-light)] max-w-3xl mx-auto leading-relaxed">
            Real stories from satisfied customers who trusted us with their critical data recovery needs
            in {location.fullName} and surrounding areas.
          </p>
          
          {/* Overall Rating */}
          <motion.div
            className="inline-flex items-center bg-[var(--color-surface-100)] rounded-full px-8 py-4 shadow-[var(--shadow-md)] mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mr-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text)]">4.9/5</div>
              <div className="text-sm text-[var(--color-text-light)]">39 Reviews</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-[var(--color-surface-100)] rounded-xl p-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="h-12 w-12 text-[var(--color-primary)]" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[var(--color-text-light)] mb-6 leading-relaxed line-clamp-4">
                "{testimonial.text}"
              </p>

              {/* Data Recovered */}
              <div className="mb-6 p-4 bg-[var(--color-surface-100)] rounded-lg">
                <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2">Data Recovered:</h4>
                <p className="text-sm text-[var(--color-text-light)]">{testimonial.recovered}</p>
              </div>

              {/* Customer Info */}
              <div className="border-t border-[var(--color-border)] pt-4">
                <h4 className="font-semibold text-[var(--color-text)]">{testimonial.name}</h4>
                <p className="text-sm text-[var(--color-text-light)]">{testimonial.title}</p>
                <p className="text-sm text-[var(--color-accent)] font-medium">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-text-inverse)] mb-6">
            Join Our Satisfied Customers in {location.city}
          </h3>
          <p className="text-xl text-[var(--color-text-inverse)]/90 mb-8 max-w-2xl mx-auto">
            Don't let data loss stress you out. Our proven recovery process has helped thousands 
            of customers in {location.fullName} get their valuable data back.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={`tel:${location.phone}`}
              className="inline-flex items-center px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Call {location.phone} Now
            </motion.a>
            
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-[var(--color-text-inverse)]/20 backdrop-blur-sm text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-text-inverse)]/30 transition-all duration-300 border border-[var(--color-text-inverse)]/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Your Free Quote
            </motion.a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-[var(--color-text-inverse)]/80 text-sm">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center mr-2">
                <span className="text-[var(--color-text-inverse)] font-bold text-xs">✓</span>
              </div>
              No Data, No Charge
            </div>
            <div className="flex items-center">
              <div className="h-6 w-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center mr-2">
                <span className="text-[var(--color-text-inverse)] font-bold text-xs">✓</span>
              </div>
              Free Evaluation
            </div>
            <div className="flex items-center">
              <div className="h-6 w-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center mr-2">
                <span className="text-[var(--color-text-inverse)] font-bold text-xs">✓</span>
              </div>
              Secure Process
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
