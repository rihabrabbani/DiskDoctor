'use client';

import { motion } from 'framer-motion';
import { LocationData } from '@/data/locations';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

interface LocationContactProps {
  location: LocationData;
}

export default function LocationContact({ location }: LocationContactProps) {
  return (
    <section id="contact" className="py-20 bg-[var(--color-background)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Contact Our {location.city} Data Recovery Team
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Get immediate help from our {location.fullName} data recovery specialists. 
            We're here to help you recover your valuable data quickly and securely.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">
                Get in Touch
              </h3>

              {/* Phone */}
              <motion.div
                className="bg-[var(--color-surface-100)] rounded-xl p-6 mb-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-[var(--color-text-inverse)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                      Call for Immediate Help
                    </h4>
                    <a
                      href={`tel:${location.phone}`}
                      className="text-2xl font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                    >
                      {location.phone}
                    </a>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      24/7 Emergency Service Available
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="bg-[var(--color-surface-100)] rounded-xl p-6 mb-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-[var(--color-text-inverse)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                      Email Us
                    </h4>
                    <a
                      href="mailto:info@diskdoctorsamerica.com"
                      className="text-lg font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                    >
                      info@diskdoctorsamerica.com
                    </a>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      We respond within 30 minutes
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                className="bg-[var(--color-surface-100)] rounded-xl p-6 mb-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center mr-4 mt-1">
                    <MapPin className="h-6 w-6 text-[var(--color-text-inverse)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                      {location.isHeadOffice ? 'Head Office Location' : 'Service Area'}
                    </h4>
                    <p className="text-[var(--color-text-light)] leading-relaxed">
                      {location.address}
                    </p>
                    {location.isHeadOffice && (
                      <p className="text-sm text-[var(--color-text-light)] mt-2">
                        Serving {location.city} and surrounding areas
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div
                className="bg-[var(--color-surface-100)] rounded-xl p-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-[var(--color-text-inverse)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[var(--color-text)] mb-3">
                      Business Hours
                    </h4>
                    <div className="space-y-2 text-[var(--color-text-light)]">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-medium">8:30 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Emergency Service:</span>
                        <span className="font-medium text-[var(--color-accent)]">24/7 Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-[var(--color-surface-100)] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                  Get Your Free Evaluation
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 bg-[var(--color-surface-100)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 bg-[var(--color-surface-100)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 bg-[var(--color-surface-100)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 bg-[var(--color-surface-100)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="deviceType" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Device Type
                    </label>
                    <select
                      id="deviceType"
                      name="deviceType"
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 bg-[var(--color-surface-100)]"
                    >
                      <option value="">Select device type...</option>
                      <option value="hard-drive">Hard Drive</option>
                      <option value="ssd">SSD</option>
                      <option value="raid">RAID Array</option>
                      <option value="laptop">Laptop</option>
                      <option value="desktop">Desktop Computer</option>
                      <option value="mobile">Mobile Device</option>
                      <option value="server">Server</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Describe Your Data Loss Situation *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Please describe what happened to your device and what type of data you need recovered..."
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 bg-[var(--color-surface-100)] resize-none"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-semibold py-4 px-6 rounded-lg hover:bg-[var(--color-primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare className="h-5 w-5 inline mr-2" />
                    Get Free Evaluation
                  </motion.button>
                </form>

                <p className="text-sm text-[var(--color-text-light)] mt-4 text-center">
                  We'll contact you within 30 minutes during business hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Emergency CTA */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-[var(--color-text-inverse)] mb-4">
            Emergency Data Recovery in {location.city}?
          </h3>
          <p className="text-[var(--color-text-inverse)]/90 text-lg mb-6 max-w-2xl mx-auto">
            Don't wait! The sooner you contact us, the better your chances of successful data recovery.
          </p>
          <motion.a
            href={`tel:${location.phone}`}
            className="inline-flex items-center px-8 py-4 bg-[var(--color-surface-100)] text-[var(--color-primary)] font-bold rounded-lg hover:bg-[var(--color-surface-200)] transition-all duration-300 shadow-lg hover:shadow-xl text-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="h-6 w-6 mr-3" />
            Call Emergency Line: {location.phone}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
