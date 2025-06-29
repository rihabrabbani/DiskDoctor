import Link from 'next/link';
import { footerSections, socialLinks } from '@/data/navigation';

export default function Footer() {
  return (
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
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.href} 
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors duration-300 p-2 rounded-lg hover:bg-[var(--color-surface-100)]"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Disk Doctor
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Professional data recovery and computer repair services. We recover your precious data and fix your technology problems.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
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
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Service Areas
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[var(--color-primary)]">📍</span>
                <span className="text-[var(--color-text-secondary)]">Columbia, Maryland</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[var(--color-primary)]">📍</span>
                <span className="text-[var(--color-text-secondary)]">Tysons, Virginia</span>
              </div>
            </div>
          </div>

          {/* Quick Links from existing footer sections */}
          <div>
            <h3 className="font-semibold mb-4 text-[var(--color-text-primary)]">
              {footerSections[0]?.title || 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {(footerSections[0]?.links || []).map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link 
                    href={link.href} 
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-[var(--color-text-tertiary)] mb-4 md:mb-0">
            © 2023 DiskDoctor Data Recovery. All rights reserved. | Trusted since 1991
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <Link 
              href="/#about"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/#about"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link 
              href="/services/data-security"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              Data Security
            </Link>
            <Link 
              href="/#about"
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              Certifications
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
