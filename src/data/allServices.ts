export interface ServicePageData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  layoutType: 'hero-left' | 'hero-split' | 'hero-split' | 'hero-split' | 'hero-video' | 'hero-carousel';
  features: string[];
  detailedFeatures?: {
    title: string;
    description: string;
    icon: string;
  }[];
  process: {
    title: string;
    steps: string[];
    detailedSteps?: {
      title: string;
      description: string;
      duration: string;
      icon: string;
    }[];
  };
  benefits: string[];
  detailedBenefits?: {
    title: string;
    description: string;
    metric: string;
  }[];
  technicalSpecs?: {
    title: string;
    specifications: {
      category: string;
      items: string[];
    }[];
  };
  pricingTiers?: {
    name: string;
    price: string;
    description: string;
    features: string[];
    recommended?: boolean;
  }[];
  caseStudies?: {
    title: string;
    description: string;
    result: string;
    image: string;
  }[];
  testimonials?: {
    name: string;
    company: string;
    text: string;
    rating: number;
    image?: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
  additionalContent?: {
    title: string;
    description: string;
    image: string;
  };
  ctaSection: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton?: string;
    urgencyText?: string;
  };
}

export const allServices: ServicePageData[] = [
  {
  id: 'data-security',
  title: 'Data Security',
  subtitle: 'Comprehensive Data Protection & Security Solutions',
  description: 'Advanced data security services including encryption implementation, secure data destruction, compliance auditing, and breach response with military-grade protection standards.',
  heroImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
  layoutType: 'hero-split',
  features: [
    'Data Encryption Services',
    'Secure Data Destruction',
    'Compliance Auditing',
    'Breach Response',
    'Access Control Implementation',
    'Data Loss Prevention',
    'Security Policy Development',
    'Forensic Analysis'
  ],
  detailedFeatures: [
    {
      title: 'Military-Grade Encryption',
      description: 'Implementation of AES-256 and other advanced encryption standards for maximum data protection.',
      icon: '🔐'
    },
    {
      title: 'Compliance Management',
      description: 'Comprehensive compliance solutions for GDPR, HIPAA, SOX, PCI DSS, and other regulatory requirements.',
      icon: '📋'
    },
    {
      title: 'Incident Response',
      description: '24/7 emergency response team for data breaches with immediate containment and recovery protocols.',
      icon: '🚨'
    }
  ],
  process: {
    title: 'Data Security Implementation',
    steps: [
      'Security Assessment',
      'Risk Analysis',
      'Protection Implementation',
      'Monitoring & Maintenance'
    ],
    detailedSteps: [
      {
        title: 'Comprehensive Security Audit',
        description: 'Thorough assessment of current data security posture, vulnerabilities, and compliance gaps.',
        duration: '2-5 days',
        icon: '🔍'
      },
      {
        title: 'Risk & Threat Analysis',
        description: 'Detailed analysis of potential threats, attack vectors, and business impact scenarios.',
        duration: '1-3 days',
        icon: '⚠️'
      },
      {
        title: 'Security Solution Deployment',
        description: 'Implementation of encryption, access controls, monitoring systems, and security policies.',
        duration: '1-4 weeks',
        icon: '🛡️'
      },
      {
        title: 'Ongoing Security Management',
        description: 'Continuous monitoring, threat detection, and security maintenance with regular updates.',
        duration: 'Ongoing',
        icon: '📊'
      }
    ]
  },
  benefits: [
    'Military-Grade Protection',
    'Compliance Guaranteed',
    '24/7 Monitoring',
    'Zero-Trust Architecture'
  ],
  detailedBenefits: [
    {
      title: 'Advanced Threat Protection',
      description: 'State-of-the-art security solutions protecting against advanced persistent threats and zero-day attacks.',
      metric: '99.9% Threat Detection'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Guaranteed compliance with all major data protection regulations and industry standards.',
      metric: '100% Compliance Rate'
    },
    {
      title: 'Rapid Incident Response',
      description: 'Emergency response team available 24/7 with average response time under 15 minutes.',
      metric: 'Sub-15 Minute Response'
    }
  ],
  technicalSpecs: {
    title: 'Data Security Specifications',
    specifications: [
      {
        category: 'Encryption Standards',
        items: ['AES-256 Encryption', 'RSA 4096-bit Keys', 'Elliptic Curve Cryptography', 'Perfect Forward Secrecy', 'Hardware Security Modules']
      },
      {
        category: 'Compliance Frameworks',
        items: ['GDPR', 'HIPAA', 'SOX', 'PCI DSS', 'ISO 27001', 'NIST Cybersecurity Framework', 'SOC 2 Type II']
      },
      {
        category: 'Security Technologies',
        items: ['Zero-Trust Architecture', 'Multi-Factor Authentication', 'Data Loss Prevention', 'Endpoint Detection & Response', 'Security Information Event Management']
      },
      {
        category: 'Incident Response',
        items: ['24/7 SOC Monitoring', 'Threat Hunting', 'Digital Forensics', 'Malware Analysis', 'Breach Containment']
      }
    ]
  },
  pricingTiers: [
    {
      name: 'Security Basic',
      price: '$1,999',
      description: 'Essential data security for small businesses',
      features: ['Security assessment', 'Basic encryption', 'Compliance guidance', 'Email support', 'Quarterly reviews']
    },
    {
      name: 'Security Professional',
      price: '$4,999',
      description: 'Comprehensive security solution for enterprises',
      features: ['Full security audit', 'Advanced encryption', 'Compliance management', '24/7 monitoring', 'Incident response'],
      recommended: true
    },
    {
      name: 'Security Enterprise',
      price: '$9,999',
      description: 'Military-grade security for critical operations',
      features: ['Custom security architecture', 'Zero-trust implementation', 'Dedicated SOC', 'On-site security team', 'Regulatory liaison']
    }
  ],
  caseStudies: [
    {
      title: 'Healthcare HIPAA Compliance',
      description: 'Implemented comprehensive data security solution for 500-bed hospital ensuring full HIPAA compliance.',
      result: 'Zero compliance violations, 99.9% uptime achieved',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80'
    }
  ],
  testimonials: [
    {
      name: 'Jennifer Walsh',
      company: 'CISO, Regional Bank',
      text: 'DiskDoctor\'s security team transformed our data protection posture. Their expertise in financial compliance is outstanding.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80'
    }
  ],
  faq: [
    {
      question: 'What compliance standards do you support?',
      answer: 'We support all major compliance frameworks including GDPR, HIPAA, SOX, PCI DSS, ISO 27001, and custom regulatory requirements.'
    },
    {
      question: 'How quickly can you respond to a security incident?',
      answer: 'Our 24/7 incident response team can respond within 15 minutes for emergency situations with immediate containment protocols.'
    }
  ],
  additionalContent: {
    title: 'Enterprise Security Excellence',
    description: 'Military-grade data security solutions designed for the most demanding enterprise environments with comprehensive compliance and threat protection.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=80'
  },
  ctaSection: {
    title: 'Protect Your Critical Data Assets',
    description: 'Advanced data security solutions with military-grade protection and guaranteed compliance for your most sensitive information.',
    primaryButton: 'Secure My Data',
    secondaryButton: 'Security Assessment',
    urgencyText: '🚨 24/7 emergency security response available'
  }
},

{
  id: 'email-security',
  title: 'Email Security',
  subtitle: 'Advanced Email Protection & Threat Defense',
  description: 'Comprehensive email security solutions including anti-phishing, malware protection, encryption, and compliance management with advanced threat intelligence.',
  heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  layoutType: 'hero-split',
  features: [
    'Advanced Phishing Protection',
    'Email Encryption Services',
    'Malware & Ransomware Defense',
    'Data Loss Prevention',
    'Compliance Management',
    'Threat Intelligence',
    'Email Archiving',
    'Security Awareness Training'
  ],
  detailedFeatures: [
    {
      title: 'AI-Powered Threat Detection',
      description: 'Machine learning algorithms that detect and block sophisticated phishing attacks and business email compromise.',
      icon: '🤖'
    },
    {
      title: 'End-to-End Encryption',
      description: 'Military-grade email encryption ensuring confidential communications remain secure in transit and at rest.',
      icon: '🔒'
    },
    {
      title: 'Real-Time Threat Intelligence',
      description: 'Global threat intelligence network providing real-time updates on emerging email-based threats.',
      icon: '🌐'
    }
  ],
  process: {
    title: 'Email Security Implementation',
    steps: [
      'Email Risk Assessment',
      'Security Solution Design',
      'Deployment & Configuration',
      'Monitoring & Management'
    ],
    detailedSteps: [
      {
        title: 'Email Environment Analysis',
        description: 'Comprehensive assessment of current email infrastructure, security gaps, and threat exposure.',
        duration: '1-2 days',
        icon: '📧'
      },
      {
        title: 'Security Architecture Planning',
        description: 'Design of layered email security solution including gateway protection, encryption, and policy management.',
        duration: '2-3 days',
        icon: '🏗️'
      },
      {
        title: 'Solution Implementation',
        description: 'Deployment of email security tools, configuration of policies, and integration with existing systems.',
        duration: '1-2 weeks',
        icon: '⚙️'
      },
      {
        title: 'Security Operations',
        description: 'Ongoing monitoring, threat analysis, policy tuning, and security awareness training programs.',
        duration: 'Ongoing',
        icon: '👁️'
      }
    ]
  },
  benefits: [
    'Zero-Day Protection',
    'Business Email Security',
    'Regulatory Compliance',
    'User Training Included'
  ],
  detailedBenefits: [
    {
      title: 'Advanced Threat Prevention',
      description: 'Protection against sophisticated attacks including spear phishing, CEO fraud, and ransomware delivery.',
      metric: '99.9% Attack Prevention'
    },
    {
      title: 'Business Continuity',
      description: 'Ensure uninterrupted email operations while maintaining the highest security standards.',
      metric: '99.99% Email Uptime'
    },
    {
      title: 'Compliance Assurance',
      description: 'Meet regulatory requirements for email retention, encryption, and data protection.',
      metric: '100% Compliance Rate'
    }
  ],
  technicalSpecs: {
    title: 'Email Security Specifications',
    specifications: [
      {
        category: 'Threat Protection',
        items: ['Anti-Phishing', 'Anti-Malware', 'Ransomware Protection', 'Business Email Compromise', 'Advanced Persistent Threats', 'Zero-Day Exploits']
      },
      {
        category: 'Email Platforms',
        items: ['Microsoft 365', 'Google Workspace', 'Exchange Server', 'Lotus Notes', 'Postfix/Sendmail', 'Cloud Email Services']
      },
      {
        category: 'Security Technologies',
        items: ['Machine Learning Detection', 'Behavioral Analysis', 'Sandboxing', 'URL Rewriting', 'Attachment Analysis', 'DMARC/SPF/DKIM']
      },
      {
        category: 'Compliance Support',
        items: ['GDPR', 'HIPAA', 'SOX', 'PCI DSS', 'SEC Rule 17a-4', 'FINRA', 'Legal Hold']
      }
    ]
  },
  pricingTiers: [
    {
      name: 'Email Basic',
      price: '$4.99',
      description: 'Per user/month - Essential email protection',
      features: ['Anti-phishing protection', 'Malware scanning', 'Basic encryption', 'Email support', 'Monthly reports']
    },
    {
      name: 'Email Professional',
      price: '$9.99',
      description: 'Per user/month - Advanced email security',
      features: ['Advanced threat protection', 'DLP policies', 'Email archiving', 'Security training', 'Real-time monitoring'],
      recommended: true
    },
    {
      name: 'Email Enterprise',
      price: '$19.99',
      description: 'Per user/month - Complete email security suite',
      features: ['AI-powered protection', 'Custom policies', 'Dedicated support', 'Compliance management', 'Threat intelligence']
    }
  ],
  caseStudies: [
    {
      title: 'Law Firm Email Protection',
      description: 'Implemented comprehensive email security for 200-attorney law firm handling sensitive client communications.',
      result: 'Zero successful phishing attacks, full attorney-client privilege protection',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80'
    }
  ],
  testimonials: [
    {
      name: 'David Richardson',
      company: 'IT Director, Manufacturing',
      text: 'Email security solution stopped multiple ransomware attempts. The AI detection is incredibly accurate with minimal false positives.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    }
  ],
  faq: [
    {
      question: 'How effective is the phishing protection?',
      answer: 'Our AI-powered phishing protection achieves 99.9% detection rates while maintaining extremely low false positive rates through advanced machine learning.'
    },
    {
      question: 'Can you integrate with our existing email system?',
      answer: 'Yes, we support all major email platforms including Microsoft 365, Google Workspace, and on-premises Exchange servers.'
    }
  ],
  additionalContent: {
    title: 'Next-Generation Email Security',
    description: 'Advanced email security platform combining AI-powered threat detection with comprehensive compliance management and user education.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80'
  },
  ctaSection: {
    title: 'Secure Your Email Communications',
    description: 'Advanced email security with AI-powered threat detection and comprehensive compliance management.',
    primaryButton: 'Protect Email Now',
    secondaryButton: 'Email Security Assessment',
    urgencyText: '📧 Stop email threats before they reach your inbox'
  }
},

{
  id: 'data-backup',
  title: 'Data Backup',
  subtitle: 'Comprehensive Backup & Disaster Recovery Solutions',
  description: 'Enterprise-grade backup solutions with automated scheduling, cloud integration, and disaster recovery planning to ensure your data is always protected and recoverable.',
  heroImage: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1200&q=80',
  layoutType: 'hero-left',
  features: [
    'Automated Backup Scheduling',
    'Cloud & Hybrid Backup',
    'Disaster Recovery Planning',
    'Real-time Sync',
    'Version Control',
    'Encryption & Security',
    'Compliance Management',
    'Rapid Recovery'
  ],
  detailedFeatures: [
    {
      title: 'Intelligent Backup Automation',
      description: 'AI-driven backup scheduling that adapts to your usage patterns and business requirements for optimal protection.',
      icon: '🤖'
    },
    {
      title: 'Hybrid Cloud Architecture',
      description: 'Seamless integration of on-premises and cloud storage for maximum flexibility and cost optimization.',
      icon: '☁️'
    },
    {
      title: 'Disaster Recovery Orchestration',
      description: 'Complete disaster recovery planning with automated failover and business continuity management.',
      icon: '🔄'
    }
  ],
  process: {
    title: 'Backup Implementation Process',
    steps: [
      'Data Assessment',
      'Backup Strategy Design',
      'System Implementation',
      'Testing & Validation'
    ],
    detailedSteps: [
      {
        title: 'Comprehensive Data Audit',
        description: 'Analysis of data types, volumes, change rates, and business criticality to design optimal backup strategy.',
        duration: '1-3 days',
        icon: '📊'
      },
      {
        title: 'Backup Architecture Planning',
        description: 'Design of backup infrastructure including retention policies, recovery objectives, and compliance requirements.',
        duration: '2-5 days',
        icon: '🏗️'
      },
      {
        title: 'Solution Deployment',
        description: 'Implementation of backup systems, configuration of policies, and integration with existing infrastructure.',
        duration: '1-3 weeks',
        icon: '⚙️'
      },
      {
        title: 'Recovery Testing Program',
        description: 'Comprehensive testing of backup integrity and recovery procedures with documented validation results.',
        duration: '3-7 days',
        icon: '🧪'
      }
    ]
  },
  benefits: [
    'Zero Data Loss',
    'Automated Protection',
    'Rapid Recovery',
    'Compliance Ready'
  ],
  detailedBenefits: [
    {
      title: 'Business Continuity Assurance',
      description: 'Guaranteed data protection with RPO/RTO objectives meeting your business continuity requirements.',
      metric: 'Sub-1 Hour Recovery'
    },
    {
      title: 'Cost-Effective Protection',
      description: 'Optimized backup strategy reducing storage costs while maintaining comprehensive data protection.',
      metric: '60% Cost Reduction'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Automated compliance reporting and retention management for regulatory requirements.',
      metric: '100% Compliance Rate'
    }
  ],
  technicalSpecs: {
    title: 'Backup Solution Specifications',
    specifications: [
      {
        category: 'Backup Types',
        items: ['Full Backups', 'Incremental Backups', 'Differential Backups', 'Continuous Data Protection', 'Application-Aware Backups', 'Image-Based Backups']
      },
      {
        category: 'Storage Destinations',
        items: ['On-Premises Storage', 'Public Cloud (AWS, Azure, GCP)', 'Private Cloud', 'Hybrid Cloud', 'Tape Libraries', 'Object Storage']
      },
      {
        category: 'Supported Platforms',
        items: ['Windows Servers', 'Linux Servers', 'VMware vSphere', 'Hyper-V', 'Physical Servers', 'Cloud Workloads', 'Databases', 'SaaS Applications']
      },
      {
        category: 'Enterprise Features',
        items: ['Global Deduplication', 'Encryption at Rest', 'Encryption in Transit', 'Immutable Backups', 'Air-Gapped Storage', 'Ransomware Protection']
      }
    ]
  },
  pricingTiers: [
    {
      name: 'Backup Starter',
      price: '$99',
      description: 'Monthly - Basic backup for small businesses',
      features: ['Up to 1TB backup', 'Daily backups', 'Cloud storage', '30-day retention', 'Email support']
    },
    {
      name: 'Backup Professional',
      price: '$299',
      description: 'Monthly - Advanced backup with disaster recovery',
      features: ['Up to 10TB backup', 'Continuous protection', 'Hybrid storage', '1-year retention', 'Priority support'],
      recommended: true
    },
    {
      name: 'Backup Enterprise',
      price: '$999',
      description: 'Monthly - Enterprise backup and disaster recovery',
      features: ['Unlimited backup', 'Custom retention', 'Dedicated infrastructure', 'SLA guarantee', '24/7 support']
    }
  ],
  caseStudies: [
    {
      title: 'Manufacturing Disaster Recovery',
      description: 'Implemented comprehensive backup and disaster recovery solution for global manufacturing company.',
      result: 'Zero data loss during facility fire, 2-hour recovery time',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'
    }
  ],
  testimonials: [
    {
      name: 'Mark Stevens',
      company: 'Operations Director',
      text: 'The backup solution saved our business during a ransomware attack. Recovery was seamless and complete within hours.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
    }
  ],
  faq: [
    {
      question: 'How often should we backup our data?',
      answer: 'Backup frequency depends on your recovery objectives and data change rate. We typically recommend continuous protection for critical systems and daily backups for standard data.'
    },
    {
      question: 'What is the difference between backup and disaster recovery?',
      answer: 'Backup focuses on data protection, while disaster recovery includes complete business continuity with infrastructure recovery, failover procedures, and business process restoration.'
    }
  ],
  additionalContent: {
    title: 'Enterprise Backup Excellence',
    description: 'Military-grade backup solutions designed for enterprise environments with comprehensive disaster recovery and business continuity planning.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  ctaSection: {
    title: 'Protect Your Business with Reliable Backup',
    description: 'Comprehensive backup solutions that ensure your data is always protected and recoverable when you need it most.',
    primaryButton: 'Setup Backup Solution',
    secondaryButton: 'Backup Assessment',
    urgencyText: '🛡️ Don\'t risk data loss - implement professional backup today'
  }
},

{
  id: 'email-recovery',
  title: 'Email Recovery',
  subtitle: 'Professional Email & Communication Recovery',
  description: 'Expert recovery of emails, contacts, calendars, and communication data from corrupted PST files, damaged servers, and deleted mailboxes with full metadata preservation.',
  heroImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
  layoutType: 'hero-split',
  features: [
    'PST/OST File Recovery',
    'Exchange Server Recovery',
    'Office 365 Recovery',
    'IMAP/POP3 Recovery',
    'Calendar & Contact Recovery',
    'Attachment Recovery',
    'Metadata Preservation',
    'Multi-format Export'
  ],
  detailedFeatures: [
    {
      title: 'Advanced PST Reconstruction',
      description: 'Specialized algorithms for repairing corrupted PST and OST files with complete email thread reconstruction.',
      icon: '📧'
    },
    {
      title: 'Exchange Server Expertise',
      description: 'Complete Exchange Server recovery including mailbox databases, public folders, and server configuration.',
      icon: '🏢'
    },
    {
      title: 'Cloud Email Recovery',
      description: 'Recovery from Office 365, Google Workspace, and other cloud email platforms with API integration.',
      icon: '☁️'
    }
  ],
  process: {
    title: 'Email Recovery Process',
    steps: [
      'Email System Analysis',
      'Corruption Assessment',
      'Data Reconstruction',
      'Recovery Validation'
    ],
    detailedSteps: [
      {
        title: 'Email Environment Assessment',
        description: 'Comprehensive analysis of email system architecture, storage format, and corruption extent.',
        duration: '30-90 minutes',
        icon: '🔍'
      },
      {
        title: 'Mailbox Structure Analysis',
        description: 'Detailed examination of mailbox databases, PST files, and message store corruption patterns.',
        duration: '45-120 minutes',
        icon: '🔎'
      },
      {
        title: 'Email Data Recovery',
        description: 'Advanced recovery techniques for emails, attachments, contacts, and calendar data with metadata preservation.',
        duration: '2-24 hours',
        icon: '⚡'
      },
      {
        title: 'Message Integrity Verification',
        description: 'Complete validation of recovered emails including thread reconstruction and attachment verification.',
        duration: '1-4 hours',
        icon: '✅'
      }
    ]
  },
  benefits: [
    'All Email Platforms',
    'Complete Message Recovery',
    'Metadata Preserved',
    'Multiple Export Formats'
  ],
  detailedBenefits: [
    {
      title: 'Universal Email Support',
      description: 'Recovery support for all major email platforms including Exchange, Office 365, Gmail, and legacy systems.',
      metric: '100% Platform Coverage'
    },
    {
      title: 'Complete Data Recovery',
      description: 'Recovery of emails, attachments, contacts, calendars, tasks, and notes with full metadata preservation.',
      metric: '99% Data Recovery Rate'
    },
    {
      title: 'Flexible Output Options',
      description: 'Export recovered data in multiple formats including PST, EML, MSG, MBOX, and direct import options.',
      metric: '15+ Export Formats'
    }
  ],
  technicalSpecs: {
    title: 'Email Recovery Specifications',
    specifications: [
      {
        category: 'Email Platforms',
        items: ['Microsoft Exchange (all versions)', 'Office 365/Microsoft 365', 'Google Workspace/Gmail', 'Lotus Notes/Domino', 'Zimbra', 'Thunderbird', 'Apple Mail']
      },
      {
        category: 'File Formats',
        items: ['PST (Personal Storage Table)', 'OST (Offline Storage Table)', 'EDB (Exchange Database)', 'NSF (Notes Storage Facility)', 'MBOX', 'EML/MSG Files']
      },
      {
        category: 'Recovery Scenarios',
        items: ['Corrupted PST Files', 'Exchange Server Crashes', 'Accidental Deletion', 'Hardware Failures', 'Virus/Malware Damage', 'Migration Failures']
      },
      {
        category: 'Export Options',
        items: ['PST Files', 'Live Exchange Import', 'Office 365 Import', 'EML Files', 'MSG Files', 'MBOX Format', 'PDF Reports']
      }
    ]
  },
  pricingTiers: [
    {
      name: 'Email Basic',
      price: '$199',
      description: 'Standard email recovery service',
      features: ['Single PST recovery', 'Up to 2GB mailbox', 'Basic export options', 'Email support', '3-5 day turnaround']
    },
    {
      name: 'Email Professional',
      price: '$399',
      description: 'Advanced email recovery with server support',
      features: ['Multiple mailboxes', 'Up to 50GB data', 'All export formats', 'Exchange recovery', 'Priority processing'],
      recommended: true
    },
    {
      name: 'Email Enterprise',
      price: '$799',
      description: 'Enterprise email system recovery',
      features: ['Unlimited mailboxes', 'Server-level recovery', 'Same-day service', 'On-site support', 'Migration assistance']
    }
  ],
  caseStudies: [
    {
      title: 'Law Firm Email Recovery',
      description: 'Recovered 5 years of legal correspondence from corrupted Exchange server after storage failure.',
      result: '100% email recovery, all case files preserved',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80'
    }
  ],
  testimonials: [
    {
      name: 'Patricia Williams',
      company: 'Legal Practice Manager',
      text: 'DiskDoctor recovered years of case correspondence we thought was lost forever. Their expertise saved our practice.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80'
    }
  ],
  faq: [
    {
      question: 'Can you recover permanently deleted emails?',
      answer: 'Yes, we can often recover permanently deleted emails from PST files, Exchange databases, and even cloud email systems depending on the retention policies.'
    },
    {
      question: 'What about large corporate email systems?',
      answer: 'We handle enterprise-scale email recovery including complete Exchange server restoration and multi-terabyte mailbox environments.'
    }
  ],
  additionalContent: {
    title: 'Professional Email Recovery Solutions',
    description: 'Comprehensive email recovery services for all platforms with advanced techniques for the most challenging corruption scenarios.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80'
  },
  ctaSection: {
    title: 'Recover Your Critical Email Communications',
    description: 'Professional email recovery services for all platforms with guaranteed data integrity and complete message reconstruction.',
    primaryButton: 'Recover Email Data',
    secondaryButton: 'Email Recovery Consultation',
    urgencyText: '📧 24/7 emergency email recovery available'
  }
}
,
  {
    id: 'windows-recovery',
    title: 'Windows Recovery',
    subtitle: 'Expert Windows Data Recovery Services',
    description: 'Professional data recovery for Windows systems including corrupted files, deleted documents, system crashes, and advanced malware damage recovery with 95% success rate.',
    heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-left',
    features: [
      'Windows 7, 8, 10, 11 Recovery',
      'NTFS File System Recovery',
      'Registry Corruption Repair',
      'Blue Screen Data Recovery',
      'Partition Recovery',
      'Boot Failure Recovery',
      'Malware Damage Recovery',
      'System File Recovery'
    ],
    detailedFeatures: [
      {
        title: 'Advanced NTFS Recovery',
        description: 'Specialized algorithms for NTFS file system recovery including journal replay and metadata reconstruction.',
        icon: '🔧'
      },
      {
        title: 'Boot Sector Repair',
        description: 'Expert repair of Master Boot Record (MBR) and GUID Partition Table (GPT) corruption.',
        icon: '🚀'
      },
      {
        title: 'Registry Reconstruction',
        description: 'Complete Windows registry recovery and repair for system stability restoration.',
        icon: '⚙️'
      }
    ],
    process: {
      title: 'Windows Recovery Process',
      steps: [
        'System Analysis & Diagnosis',
        'Recovery Method Selection',
        'Data Extraction & Repair',
        'File Integrity Verification'
      ],
      detailedSteps: [
        {
          title: 'Comprehensive System Analysis',
          description: 'Deep analysis of Windows installation, file system structure, and damage assessment using advanced diagnostic tools.',
          duration: '30-60 minutes',
          icon: '🔍'
        },
        {
          title: 'Recovery Strategy Planning',
          description: 'Selection of optimal recovery methods based on damage type, data importance, and time constraints.',
          duration: '15-30 minutes',
          icon: '📋'
        },
        {
          title: 'Data Extraction Process',
          description: 'Careful extraction of recoverable data using sector-by-sector analysis and advanced algorithms.',
          duration: '2-24 hours',
          icon: '💾'
        },
        {
          title: 'Quality Assurance',
          description: 'Thorough verification of recovered files, integrity checks, and format validation.',
          duration: '1-3 hours',
          icon: '✅'
        }
      ]
    },
    benefits: [
      '95% Success Rate',
      'No Data, No Charge',
      'Same-Day Service Available',
      'Secure Recovery Process'
    ],
    detailedBenefits: [
      {
        title: 'Industry-Leading Success Rate',
        description: 'Our Windows recovery success rate exceeds industry standards through advanced techniques and experienced technicians.',
        metric: '95% Success Rate'
      },
      {
        title: 'Risk-Free Service',
        description: 'We only charge when we successfully recover your data, ensuring complete customer satisfaction.',
        metric: '100% Risk-Free'
      },
      {
        title: 'Rapid Turnaround',
        description: 'Emergency same-day service available for critical business data with express processing.',
        metric: '4-Hour Express'
      }
    ],
    technicalSpecs: {
      title: 'Windows Recovery Capabilities',
      specifications: [
        {
          category: 'Supported Windows Versions',
          items: ['Windows 11', 'Windows 10', 'Windows 8.1', 'Windows 8', 'Windows 7', 'Windows Vista', 'Windows XP', 'Windows Server 2019/2016/2012/2008']
        },
        {
          category: 'File Systems',
          items: ['NTFS', 'FAT32', 'FAT16', 'exFAT', 'ReFS']
        },
        {
          category: 'Recovery Scenarios',
          items: ['Accidental Deletion', 'System Crashes', 'Virus/Malware Damage', 'Hardware Failure', 'Partition Loss', 'Format Recovery']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'Standard Recovery',
        price: '$299',
        description: 'Basic Windows data recovery for common scenarios',
        features: ['Up to 500GB recovery', 'Standard turnaround (3-5 days)', 'Basic file types', 'Email support']
      },
      {
        name: 'Professional Recovery',
        price: '$499',
        description: 'Advanced recovery for complex Windows issues',
        features: ['Up to 2TB recovery', 'Priority processing (1-2 days)', 'All file types', 'Phone & email support', 'Partial recovery options'],
        recommended: true
      },
      {
        name: 'Emergency Recovery',
        price: '$799',
        description: 'Same-day emergency Windows recovery service',
        features: ['Unlimited capacity', 'Same-day service', 'All file types', '24/7 phone support', 'On-site service available']
      }
    ],
    caseStudies: [
      {
        title: 'Corporate Server Recovery',
        description: 'Recovered critical business data from a corrupted Windows Server 2019 after ransomware attack.',
        result: '98% data recovery, 2TB of business-critical files restored',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        company: 'Tech Solutions Inc.',
        text: 'DiskDoctor saved our business when our main server crashed. They recovered everything we thought was lost forever.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'Can you recover data from a computer that won\'t boot?',
        answer: 'Yes, we specialize in recovering data from non-booting Windows systems. We can extract data directly from the hard drive even when the operating system is completely corrupted.'
      },
      {
        question: 'How long does Windows data recovery typically take?',
        answer: 'Standard recovery takes 3-5 business days, but we offer same-day emergency service for critical situations. Complex cases may require additional time.'
      }
    ],
    additionalContent: {
      title: 'Advanced Windows Recovery Technology',
      description: 'Our specialized tools can recover data from severely corrupted Windows installations, including advanced malware damage and system file corruption.',
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Don\'t Let Windows Crashes Cost You Your Data',
      description: 'Our Windows recovery experts are standing by to help recover your critical files. Free evaluation included.',
      primaryButton: 'Start Recovery Now',
      secondaryButton: 'Get Free Quote',
      urgencyText: '⚡ Same-day service available for emergency cases'
    }
  },
  {
    id: 'mac-recovery',
    title: 'Mac Recovery',
    subtitle: 'Professional Mac Data Recovery',
    description: 'Specialized recovery services for macOS systems, HFS+, APFS file systems, T2/M1 chip devices, and complete Apple ecosystem data recovery.',
    heroImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-split',
    features: [
      'macOS Big Sur, Monterey, Ventura, Sonoma',
      'APFS & HFS+ Recovery',
      'Time Machine Backup Recovery',
      'Encrypted Volume Recovery',
      'Fusion Drive Recovery',
      'T2 & M1/M2 Chip Support',
      'FileVault 2 Recovery',
      'SSD TRIM Recovery'
    ],
    detailedFeatures: [
      {
        title: 'APFS File System Expertise',
        description: 'Advanced recovery techniques for Apple\'s modern APFS file system including snapshots and encryption.',
        icon: '🍎'
      },
      {
        title: 'T2/M1/M2 Chip Recovery',
        description: 'Specialized tools and techniques for Apple Silicon and T2 security chip data recovery.',
        icon: '💻'
      },
      {
        title: 'FileVault Decryption',
        description: 'Secure recovery from FileVault 2 encrypted drives with proper authentication.',
        icon: '🔐'
      }
    ],
    process: {
      title: 'Mac Recovery Process',
      steps: [
        'Apple System Diagnosis',
        'FileVault Decryption',
        'APFS Structure Analysis',
        'Data Reconstruction'
      ],
      detailedSteps: [
        {
          title: 'Apple Hardware Analysis',
          description: 'Comprehensive diagnosis of Mac hardware including logic board, storage controller, and security chip assessment.',
          duration: '45-90 minutes',
          icon: '🔍'
        },
        {
          title: 'Security Protocol Handling',
          description: 'Proper handling of FileVault encryption, T2 chip security, and Apple ID authentication requirements.',
          duration: '30-60 minutes',
          icon: '🛡️'
        },
        {
          title: 'APFS Recovery Process',
          description: 'Advanced APFS structure analysis including container recovery, volume mounting, and snapshot restoration.',
          duration: '3-12 hours',
          icon: '⚡'
        },
        {
          title: 'Data Validation & Transfer',
          description: 'Thorough verification of recovered Mac data including metadata, resource forks, and file permissions.',
          duration: '1-4 hours',
          icon: '📁'
        }
      ]
    },
    benefits: [
      'Apple Certified Technicians',
      'FileVault 2 Compatible',
      'T2 & M1 Chip Support',
      'Confidential Process'
    ],
    detailedBenefits: [
      {
        title: 'Apple Ecosystem Specialists',
        description: 'Our technicians are certified in Apple hardware and software with deep macOS expertise.',
        metric: '15+ Years Experience'
      },
      {
        title: 'Latest Mac Support',
        description: 'Full support for the latest Mac models including MacBook Air M2, MacBook Pro M2, and Mac Studio.',
        metric: '100% Mac Coverage'
      },
      {
        title: 'Privacy Protection',
        description: 'Strict confidentiality protocols with secure data handling throughout the recovery process.',
        metric: 'GDPR Compliant'
      }
    ],
    technicalSpecs: {
      title: 'Mac Recovery Specifications',
      specifications: [
        {
          category: 'Supported Mac Models',
          items: ['MacBook Pro (All generations)', 'MacBook Air (All generations)', 'iMac (All generations)', 'Mac Pro', 'Mac Studio', 'Mac mini']
        },
        {
          category: 'macOS Versions',
          items: ['macOS Sonoma 14.x', 'macOS Ventura 13.x', 'macOS Monterey 12.x', 'macOS Big Sur 11.x', 'macOS Catalina 10.15', 'Earlier versions supported']
        },
        {
          category: 'File Systems & Features',
          items: ['APFS (All variants)', 'HFS+', 'FileVault 2 Encryption', 'Time Machine Backups', 'Fusion Drives', 'Core Storage']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'Mac Basic',
        price: '$349',
        description: 'Standard Mac data recovery service',
        features: ['Up to 1TB recovery', 'HFS+ & APFS support', 'Standard processing (3-5 days)', 'Email support']
      },
      {
        name: 'Mac Professional',
        price: '$549',
        description: 'Advanced Mac recovery with encryption support',
        features: ['Up to 4TB recovery', 'FileVault 2 decryption', 'T2/M1 chip support', 'Priority processing (1-2 days)', 'Phone support'],
        recommended: true
      },
      {
        name: 'Mac Emergency',
        price: '$899',
        description: 'Same-day Mac recovery service',
        features: ['Unlimited capacity', 'All Mac models', 'Same-day service', 'On-site pickup available', '24/7 support']
      }
    ],
    caseStudies: [
      {
        title: 'MacBook Pro M1 Recovery',
        description: 'Successfully recovered encrypted data from a water-damaged MacBook Pro M1 with T2 chip complications.',
        result: '92% data recovery from encrypted APFS volume',
        image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Creative Studio Recovery',
        description: 'Recovered 8TB of video projects from a failed Fusion Drive in an iMac Pro used for film production.',
        result: '100% project file recovery, saved $50K in recreation costs',
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Michael Chen',
        company: 'Creative Director',
        text: 'My MacBook Pro crashed with years of design work. DiskDoctor recovered everything perfectly, including all my Photoshop files.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      },
      {
        name: 'Lisa Rodriguez',
        company: 'Photography Studio',
        text: 'Professional service for my iMac recovery. They handled my FileVault encryption perfectly and recovered all my RAW files.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'Can you recover data from Macs with T2 or M1 chips?',
        answer: 'Yes, we have specialized tools and expertise for T2 security chip and Apple Silicon (M1/M2) Mac recovery, including encrypted volumes.'
      },
      {
        question: 'Do you need my FileVault password for recovery?',
        answer: 'For FileVault-encrypted drives, we typically need either your password, recovery key, or access to your Apple ID for authentication.'
      },
      {
        question: 'Can you recover from liquid-damaged Macs?',
        answer: 'Yes, we handle liquid damage recovery. We can often recover data even when the Mac itself is beyond repair.'
      }
    ],
    additionalContent: {
      title: 'Apple Ecosystem Recovery Excellence',
      description: 'Complete recovery solutions for the entire Apple ecosystem including iMac, MacBook, Mac Pro, and integration with iCloud and Time Machine backups.',
      image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Mac Data Recovery Specialists',
      description: 'Trust the Mac experts with your valuable data. We support all Mac models and macOS versions.',
      primaryButton: 'Recover My Mac Data',
      secondaryButton: 'Mac Recovery Quote',
      urgencyText: '🍎 Specialized Apple-certified recovery technicians'
    }
  },
  {
    id: 'photo-recovery',
    title: 'Photo Recovery',
    subtitle: 'Recover Your Precious Memories',
    description: 'Specialized photo and video recovery from memory cards, cameras, phones, corrupted storage devices with advanced RAW file reconstruction and metadata preservation.',
    heroImage: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-split',
    features: [
      'RAW & JPEG Recovery',
      'Memory Card Recovery',
      'Camera Internal Storage',
      'Corrupted Photo Repair',
      'Video File Recovery',
      'Metadata Preservation',
      '4K/8K Video Recovery',
      'Drone Footage Recovery'
    ],
    detailedFeatures: [
      {
        title: 'Professional RAW Recovery',
        description: 'Advanced recovery for all RAW formats including Canon CR3, Nikon NEF, Sony ARW, and proprietary formats.',
        icon: '📷'
      },
      {
        title: 'Memory Card Specialists',
        description: 'Expert recovery from SD, CF, MicroSD, and XQD cards including physically damaged cards.',
        icon: '💾'
      },
      {
        title: 'Photo Repair Technology',
        description: 'Advanced algorithms to repair corrupted JPEG headers and reconstruct damaged image files.',
        icon: '🔧'
      }
    ],
    process: {
      title: 'Photo Recovery Process',
      steps: [
        'Media Analysis',
        'File Signature Detection',
        'Image Reconstruction',
        'Quality Verification'
      ],
      detailedSteps: [
        {
          title: 'Storage Media Assessment',
          description: 'Detailed analysis of memory cards, camera storage, or device memory to assess damage and recovery potential.',
          duration: '20-45 minutes',
          icon: '🔍'
        },
        {
          title: 'Photo Signature Scanning',
          description: 'Deep scanning for photo file signatures including RAW, JPEG, TIFF, and video formats.',
          duration: '1-8 hours',
          icon: '🔎'
        },
        {
          title: 'Image Reconstruction',
          description: 'Advanced reconstruction of photo files including header repair and metadata recovery.',
          duration: '2-12 hours',
          icon: '🖼️'
        },
        {
          title: 'Quality Control',
          description: 'Manual verification of recovered photos, thumbnail generation, and organization by date/camera.',
          duration: '30 minutes - 2 hours',
          icon: '✨'
        }
      ]
    },
    benefits: [
      'Support All Camera Brands',
      'RAW Format Specialist',
      'Metadata Preservation',
      'Preview Before Recovery'
    ],
    detailedBenefits: [
      {
        title: 'Universal Camera Support',
        description: 'Recovery support for all major camera brands and formats from smartphones to professional DSLRs.',
        metric: '200+ Camera Models'
      },
      {
        title: 'Professional Results',
        description: 'Specialized in professional photography recovery with full metadata and EXIF data preservation.',
        metric: '99% Photo Quality'
      },
      {
        title: 'Preview Technology',
        description: 'Advanced preview system allows you to see recoverable photos before committing to full recovery.',
        metric: 'See Before You Pay'
      }
    ],
    technicalSpecs: {
      title: 'Photo Recovery Capabilities',
      specifications: [
        {
          category: 'Supported Photo Formats',
          items: ['RAW (CR3, NEF, ARW, DNG, etc.)', 'JPEG/JPG', 'TIFF', 'PNG', 'BMP', 'GIF', 'HEIC/HEIF', 'WebP']
        },
        {
          category: 'Video Formats',
          items: ['MP4', 'MOV', 'AVI', 'MKV', 'AVCHD', 'XAVC', '4K/8K formats', 'Drone footage (DJI, etc.)']
        },
        {
          category: 'Storage Media',
          items: ['SD Cards (all sizes)', 'CompactFlash', 'MicroSD', 'XQD Cards', 'CFexpress', 'Camera internal memory', 'USB drives', 'External hard drives']
        },
        {
          category: 'Camera Brands',
          items: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Olympus', 'Panasonic', 'Leica', 'GoPro', 'DJI', 'Smartphone cameras']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'Photo Basic',
        price: '$199',
        description: 'Standard photo recovery for personal use',
        features: ['Up to 1000 photos', 'JPEG recovery', 'Memory card recovery', 'Standard processing', 'Email delivery']
      },
      {
        name: 'Photo Professional',
        price: '$399',
        description: 'Professional photo recovery with RAW support',
        features: ['Up to 10,000 photos', 'RAW & JPEG recovery', 'Video recovery included', 'Metadata preservation', 'Priority processing', 'Cloud delivery'],
        recommended: true
      },
      {
        name: 'Photo Studio',
        price: '$699',
        description: 'Complete recovery for professional photographers',
        features: ['Unlimited photos', 'All formats supported', 'Drone footage recovery', 'Same-day service', 'On-site pickup', 'Dedicated support']
      }
    ],
    caseStudies: [
      {
        title: 'Wedding Photography Recovery',
        description: 'Recovered entire wedding shoot from corrupted CF card after photographer\'s camera malfunctioned.',
        result: '847 RAW files recovered with full metadata intact',
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Drone Footage Restoration',
        description: 'Recovered 4K drone footage from damaged MicroSD card after crash during commercial shoot.',
        result: '4 hours of 4K footage recovered, saved $15K reshoot',
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Emma Thompson',
        company: 'Wedding Photographer',
        text: 'DiskDoctor saved my entire business. They recovered a complete wedding shoot from a corrupted memory card. Incredible service!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80'
      },
      {
        name: 'David Park',
        company: 'Travel Photographer',
        text: 'Lost years of travel photos when my hard drive failed. They recovered everything, including RAW files I thought were gone forever.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'Can you recover photos from a formatted memory card?',
        answer: 'Yes, we can often recover photos from formatted memory cards as long as new data hasn\'t overwritten the original files. Success rates are typically 80-95%.'
      },
      {
        question: 'Do you recover RAW files from professional cameras?',
        answer: 'Absolutely! We specialize in RAW file recovery for all major camera brands and can recover Canon CR3, Nikon NEF, Sony ARW, and many other RAW formats.'
      },
      {
        question: 'Can you fix corrupted photo files?',
        answer: 'Yes, we have advanced tools to repair corrupted JPEG headers, fix RAW file structure issues, and reconstruct damaged image data.'
      },
      {
        question: 'How do you handle large collections of photos?',
        answer: 'We have specialized workflows for large photo collections, including automatic organization by date, camera model, and location metadata.'
      }
    ],
    additionalContent: {
      title: 'Professional Photography Recovery Solutions',
      description: 'Specialized recovery for professional photographers with studio-grade equipment, including medium format cameras, tethered shooting recovery, and backup workflow consulting.',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Don\'t Lose Your Precious Memories',
      description: 'Professional photo recovery specialists ready to restore your irreplaceable photos and videos.',
      primaryButton: 'Recover My Photos',
      secondaryButton: 'Free Photo Evaluation',
      urgencyText: '📸 Same-day service for urgent photo recovery needs'
    }
  },
  {
    id: 'mobile-recovery',
    title: 'Mobile Recovery',
    subtitle: 'Smartphone & Tablet Data Recovery',
    description: 'Professional mobile device recovery for iOS and Android phones, tablets, smartwatches with chip-level repair and advanced forensic techniques.',
    heroImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-split',
    features: [
      'iPhone & Android Recovery',
      'Water Damage Recovery',
      'Broken Screen Recovery',
      'Factory Reset Recovery',
      'App Data Recovery',
      'Chip-Level Repair',
      'Forensic Data Recovery',
      'Cloud Data Recovery'
    ],
    detailedFeatures: [
      {
        title: 'Chip-Level Data Recovery',
        description: 'Direct recovery from NAND flash memory chips for the most reliable data retrieval.',
        icon: '🔬'
      },
      {
        title: 'Advanced Forensic Techniques',
        description: 'Utilization of professional forensic tools and methods for comprehensive data recovery.',
        icon: '🕵️‍♂️'
      },
      {
        title: 'Cloud and App Data Recovery',
        description: 'Expert recovery of data from cloud backups and third-party apps on mobile devices.',
        icon: '☁️'
      }
    ],
    process: {
      title: 'Mobile Recovery Process',
      steps: [
        'Device Assessment',
        'Chip-Level Analysis',
        'Data Extraction',
        'Content Verification'
      ],
      detailedSteps: [
        {
          title: 'Mobile Device Diagnostics',
          description: 'Complete diagnostic of the mobile device to identify all possible data recovery avenues.',
          duration: '30-60 minutes',
          icon: '🔍'
        },
        {
          title: 'NAND Chip Reading',
          description: 'Reading data directly from the memory chips using specialized hardware for chip-off recovery.',
          duration: '1-4 hours',
          icon: '💻'
        },
        {
          title: 'Data Reconstruction',
          description: 'Rebuilding lost data structures and extracting files using advanced software tools.',
          duration: '2-8 hours',
          icon: '⚙️'
        },
        {
          title: 'Data Integrity Verification',
          description: 'Ensuring recovered data is intact, complete, and correctly formatted.',
          duration: '1-3 hours',
          icon: '✅'
        }
      ]
    },
    benefits: [
      'All Mobile Brands',
      'No Jailbreak Required',
      'Physical Damage Support',
      'Privacy Protected'
    ],
    detailedBenefits: [
      {
        title: 'Comprehensive Mobile Support',
        description: 'We support data recovery for all mobile brands and models, ensuring no data is beyond reach.',
        metric: '100% Mobile Coverage'
      },
      {
        title: 'No Data, No Fee Guarantee',
        description: 'You only pay if we successfully recover your data, making our service risk-free.',
        metric: '100% Satisfaction Guarantee'
      },
      {
        title: 'Rapid Response Times',
        description: 'Get your data back quickly with our expedited recovery options for critical data.',
        metric: '24-Hour Turnaround'
      }
    ],
    technicalSpecs: {
      title: 'Mobile Recovery Specifications',
      specifications: [
        {
          category: 'Supported Devices',
          items: ['iPhone (all models)', 'Android Phones (all models)', 'iPad (all models)', 'Android Tablets (all models)', 'Smartwatches (all brands)']
        },
        {
          category: 'Recovery Methods',
          items: ['Chip-Off Recovery', 'JTAG Recovery', 'NAND Flash Recovery', 'Logical Data Recovery', 'Cloud Data Recovery']
        },
        {
          category: 'Damage Types',
          items: ['Water Damage', 'Fire Damage', 'Physical Damage', 'Software Corruption', 'Malware Infection']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'Mobile Basic',
        price: '$199',
        description: 'Standard mobile data recovery service',
        features: ['Up to 64GB', 'Logical recovery', 'Standard turnaround (3-5 days)', 'Email support']
      },
      {
        name: 'Mobile Advanced',
        price: '$399',
        description: 'Advanced recovery for physically damaged devices',
        features: ['Up to 256GB', 'Chip-level recovery', 'Priority processing (1-2 days)', 'Phone & email support'],
        recommended: true
      },
      {
        name: 'Mobile Forensic',
        price: '$799',
        description: 'Comprehensive forensic data recovery service',
        features: ['Unlimited data', 'All damage types', 'Same-day service', 'On-site evaluation', '24/7 support']
      }
    ],
    caseStudies: [
      {
        title: 'iPhone Water Damage Recovery',
        description: 'Recovered 100% of data from an iPhone XS Max submerged in water for 12 hours.',
        result: 'All photos, messages, and app data recovered successfully.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Samsung Galaxy Crash Recovery',
        description: 'Retrieved critical business data from a Samsung Galaxy S10+ after a severe crash.',
        result: '95% of data recovered including emails, contacts, and documents.',
        image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'John Doe',
        company: 'Mobile Repair Shop',
        text: 'DiskDoctor is my go-to solution for data recovery. Their mobile recovery service is outstanding, and my clients are always satisfied.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80'
      },
      {
        name: 'Jane Smith',
        company: 'Tech Innovators',
        text: 'We trust DiskDoctor for all our data recovery needs. Their expertise in mobile forensics has saved us time and again.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'Can you recover data from a phone with a broken screen?',
        answer: 'Yes, we can recover data from phones with broken screens using chip-level recovery techniques that bypass the need for a functional display.'
      },
      {
        question: 'What if my phone is water damaged?',
        answer: 'We offer specialized water damage recovery services that can restore data from phones that have been submerged in water, even for extended periods.'
      },
      {
        question: 'Do I need to unlock my phone for recovery?',
        answer: 'For most recovery cases, you do not need to unlock your phone. However, having the passcode can expedite the recovery process for logical data extraction.'
      }
    ],
    additionalContent: {
      title: 'Advanced Mobile Recovery Technology',
      description: 'Cutting-edge mobile recovery technology for the most challenging cases, including chip-level repairs and forensic data recovery.',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Mobile Data Recovery Experts',
      description: 'Specialized mobile recovery for all smartphone and tablet brands with highest success rates.',
      primaryButton: 'Recover Mobile Data',
      secondaryButton: 'Mobile Recovery Quote'
    }
  },
  {
    id: 'raid-recovery',
    title: 'RAID Recovery',
    subtitle: 'Enterprise RAID System Recovery',
    description: 'Expert RAID recovery services for all configurations including 0, 1, 5, 6, 10, and complex enterprise arrays with 24/7 emergency support.',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-video',
    features: [
      'RAID 0, 1, 5, 6, 10 Recovery',
      'NAS & SAN Recovery',
      'Virtual RAID Recovery',
      'Multiple Drive Failure',
      'Rebuild Failure Recovery',
      'Hot Swap Recovery',
      'Data Migration Services',
      '24/7 Emergency Support'
    ],
    detailedFeatures: [
      {
        title: 'Comprehensive RAID Support',
        description: 'Expertise in all RAID levels and configurations, ensuring effective recovery from any RAID setup.',
        icon: '💼'
      },
      {
        title: 'NAS & SAN Recovery',
        description: 'Specialized recovery solutions for Network Attached Storage and Storage Area Networks.',
        icon: '🌐'
      },
      {
        title: 'Virtual RAID Recovery',
        description: 'Recovery from virtualized RAID environments and software-defined storage systems.',
        icon: '🖥️'
      }
    ],
    process: {
      title: 'RAID Recovery Process',
      steps: [
        'Array Configuration Analysis',
        'Drive Order Reconstruction',
        'Parity Calculation',
        'Data Assembly & Verification'
      ],
      detailedSteps: [
        {
          title: 'RAID Array Analysis',
          description: 'Thorough analysis of the RAID array configuration, including RAID level, disk order, and parity information.',
          duration: '30-60 minutes',
          icon: '🔍'
        },
        {
          title: 'Disk Imaging',
          description: 'Creating sector-by-sector images of all disks in the array for safe data recovery.',
          duration: '1-4 hours',
          icon: '💾'
        },
        {
          title: 'Data Recovery Execution',
          description: 'Performing the actual data recovery using advanced RAID recovery software and techniques.',
          duration: '2-12 hours',
          icon: '⚙️'
        },
        {
          title: 'Post-Recovery Testing',
          description: 'Testing recovered data for integrity, completeness, and usability.',
          duration: '1-3 hours',
          icon: '✅'
        }
      ]
    },
    benefits: [
      'Enterprise Grade Recovery',
      '24/7 Emergency Service',
      'No Rebuild Attempts',
      'Business Continuity Focus'
    ],
    detailedBenefits: [
      {
        title: 'Mission-Critical RAID Recovery',
        description: 'Specialized recovery for mission-critical business systems and enterprise storage.',
        metric: '99% Success Rate'
      },
      {
        title: 'Comprehensive Service',
        description: 'From RAID 0 to RAID 10, we handle all types of RAID configurations and failures.',
        metric: 'All RAID Levels Supported'
      },
      {
        title: 'Rapid Response & Recovery',
        description: 'Immediate response to RAID failures with expedited recovery options to minimize downtime.',
        metric: '24/7 Availability'
      }
    ],
    technicalSpecs: {
      title: 'RAID Recovery Specifications',
      specifications: [
        {
          category: 'Supported RAID Levels',
          items: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10', 'RAID 50', 'RAID 60']
        },
        {
          category: 'Storage Systems',
          items: ['NAS (Network Attached Storage)', 'SAN (Storage Area Network)', 'DAS (Direct Attached Storage)', 'Cloud Storage Systems']
        },
        {
          category: 'File Systems',
          items: ['NTFS', 'FAT32', 'exFAT', 'HFS+', 'APFS', 'EXT4', 'XFS', 'Btrfs']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'RAID Basic',
        price: '$499',
        description: 'Standard RAID recovery service for common issues',
        features: ['Up to 2TB', 'RAID 0, 1, 5 recovery', 'Standard turnaround (5-7 days)', 'Email support']
      },
      {
        name: 'RAID Advanced',
        price: '$899',
        description: 'Advanced recovery for complex RAID configurations',
        features: ['Up to 8TB', 'RAID 6, 10 recovery', 'Priority processing (2-4 days)', 'Phone & email support'],
        recommended: true
      },
      {
        name: 'RAID Emergency',
        price: '$1499',
        description: 'Immediate recovery for critical RAID failures',
        features: ['Unlimited capacity', 'Same-day service', 'All RAID levels', '24/7 phone support', 'On-site service available']
      }
    ],
    caseStudies: [
      {
        title: 'Enterprise RAID 5 Recovery',
        description: 'Recovered 100% of data from a failed RAID 5 array in a Dell PowerVault NAS used for critical business operations.',
        result: 'All data recovered, including virtual machines and databases, with zero downtime.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'RAID 10 Data Recovery',
        description: 'Successfully recovered data from a RAID 10 array after multiple drive failures in a high-performance computing environment.',
        result: '95% of data recovered, including large media files and project data.',
        image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Robert Brown',
        company: 'IT Manager',
        text: 'DiskDoctor is our trusted partner for RAID recovery. Their expertise and quick turnaround have saved our business multiple times.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80'
      },
      {
        name: 'Emily White',
        company: 'Data Center Director',
        text: 'We rely on DiskDoctor for all our data recovery needs. Their RAID recovery service is top-notch and highly reliable.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'What is RAID recovery?',
        answer: 'RAID recovery is the process of restoring data from a RAID (Redundant Array of Independent Disks) system after a failure or data loss incident.'
      },
      {
        question: 'Can all RAID levels be recovered?',
        answer: 'Yes, we can recover data from all RAID levels including RAID 0, 1, 5, 6, 10, and more. Each RAID level has specific recovery techniques we employ.'
      },
      {
        question: 'How long does RAID recovery take?',
        answer: 'The time required for RAID recovery depends on the complexity of the RAID configuration and the extent of the damage. We offer expedited services for critical situations.'
      }
    ],
    additionalContent: {
      title: 'Enterprise RAID Recovery Expertise',
      description: 'Meeting the highest standards for RAID recovery in enterprise environments, with a focus on business continuity and data integrity.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Enterprise RAID Recovery Specialists',
      description: '24/7 emergency RAID recovery service for mission-critical business systems.',
      primaryButton: 'Emergency RAID Recovery',
      secondaryButton: 'RAID Assessment',
      urgencyText: '🚨 24/7 emergency service available'
    }
  },
  {
    id: 'file-recovery',
    title: 'File Recovery',
    subtitle: 'Comprehensive File Recovery Services',
    description: 'Professional recovery of documents, spreadsheets, presentations, databases, and all file types with format repair and conversion services.',
    heroImage: 'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-carousel',
    features: [
      'Document Recovery',
      'Database Recovery',
      'Archive File Recovery',
      'Corrupted File Repair',
      'Version Recovery',
      'Format Conversion',
      'Email & Calendar Recovery',
      'Cloud File Recovery'
    ],
    detailedFeatures: [
      {
        title: 'Advanced Document Recovery',
        description: 'Specialized recovery for Microsoft Office documents, PDFs, and other critical file types.',
        icon: '📄'
      },
      {
        title: 'Database Repair & Recovery',
        description: 'Expert recovery for SQL databases, Access files, and other database formats.',
        icon: '🗄️'
      },
      {
        title: 'Email & Calendar Data Recovery',
        description: 'Recovery of emails, contacts, calendars, and tasks from popular email clients and services.',
        icon: '📧'
      }
    ],
    process: {
      title: 'File Recovery Process',
      steps: [
        'File Type Identification',
        'Structure Analysis',
        'Content Extraction',
        'Format Reconstruction'
      ],
      detailedSteps: [
        {
          title: 'File Identification & Analysis',
          description: 'Identifying and analyzing the file types and structures present on the storage media.',
          duration: '30-60 minutes',
          icon: '🔍'
        },
        {
          title: 'Corruption Assessment',
          description: 'Assessing the extent of corruption or damage to the files and determining the best recovery approach.',
          duration: '15-30 minutes',
          icon: '⚙️'
        },
        {
          title: 'Data Extraction Techniques',
          description: 'Employing advanced techniques to extract recoverable data from damaged or corrupted files.',
          duration: '2-8 hours',
          icon: '💾'
        },
        {
          title: 'File Repair & Reconstruction',
          description: 'Repairing and reconstructing files to restore them to a usable state, including format conversion if needed.',
          duration: '1-4 hours',
          icon: '🛠️'
        }
      ]
    },
    benefits: [
      'All File Formats',
      'Metadata Preservation',
      'Partial Recovery Available',
      'Format Conversion'
    ],
    detailedBenefits: [
      {
        title: 'Comprehensive File Format Support',
        description: 'We support recovery for all file formats, ensuring no important file type is left behind.',
        metric: '100% File Format Coverage'
      },
      {
        title: 'Expert Metadata Recovery',
        description: 'Preservation of file metadata, timestamps, and properties during the recovery process.',
        metric: 'Full Metadata Recovery'
      },
      {
        title: 'Flexible Recovery Options',
        description: 'Options for partial recovery of large files and conversion to different formats as needed.',
        metric: 'Custom Recovery Solutions'
      }
    ],
    technicalSpecs: {
      title: 'File Recovery Specifications',
      specifications: [
        {
          category: 'Supported File Types',
          items: ['Documents (DOCX, PDF, TXT, etc.)', 'Spreadsheets (XLSX, CSV, etc.)', 'Presentations (PPTX, etc.)', 'Databases (MDB, ACCDB, etc.)', 'Emails (PST, OST, etc.)']
        },
        {
          category: 'Recovery Methods',
          items: ['Logical Recovery', 'File Carving', 'Signature Recovery', 'Metadata Analysis']
        },
        {
          category: 'Storage Media',
          items: ['Hard Drives (HDD, SSD)', 'USB Flash Drives', 'Memory Cards', 'Cloud Storage', 'Network Drives']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'File Basic',
        price: '$149',
        description: 'Standard file recovery service',
        features: ['Up to 500MB', 'Basic file types', 'Standard turnaround (3-5 days)', 'Email support']
      },
      {
        name: 'File Professional',
        price: '$299',
        description: 'Advanced file recovery with metadata preservation',
        features: ['Up to 2GB', 'All file types', 'Priority processing (1-2 days)', 'Phone & email support'],
        recommended: true
      },
      {
        name: 'File Enterprise',
        price: '$499',
        description: 'Comprehensive recovery for business documents and databases',
        features: ['Unlimited data', 'All file types', 'Same-day service', 'On-site evaluation', '24/7 support']
      }
    ],
    caseStudies: [
      {
        title: 'Accidental Deletion Recovery',
        description: 'Recovered critical business documents and emails after accidental deletion from a server.',
        result: 'All deleted files recovered, including complex folder structures and large attachments.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Database Disaster Recovery',
        description: 'Restored a corrupted SQL database for a financial institution, recovering years of transaction data.',
        result: '100% of critical data recovered, database fully functional after recovery.',
        image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Alice Green',
        company: 'Finance Corp',
        text: 'DiskDoctor recovered our financial data from a damaged server. Their service was fast, professional, and effective.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80'
      },
      {
        name: 'Bob Blue',
        company: 'Tech Solutions',
        text: 'We had a major data loss incident, and DiskDoctor was able to recover all our important files and documents. Highly recommend!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'What file types can you recover?',
        answer: 'We can recover all file types including documents, spreadsheets, presentations, databases, emails, and more. If it\'s a file, we can probably recover it.'
      },
      {
        question: 'How long does file recovery take?',
        answer: 'The duration of file recovery depends on the amount of data and the complexity of the recovery. We offer expedited services for urgent cases.'
      },
      {
        question: 'Can you recover files from cloud storage?',
        answer: 'Yes, we can recover files from popular cloud storage services as well as network drives and attached storage devices.'
      }
    ],
    additionalContent: {
      title: 'Comprehensive File Recovery Solutions',
      description: 'Tailored recovery solutions for all file types and storage media, ensuring maximum data recovery and integrity.',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Professional File Recovery Service',
      description: 'Recover all your important documents and files with our comprehensive recovery solutions.',
      primaryButton: 'Recover Files Now',
      secondaryButton: 'File Recovery Quote'
    }
  },
  {
    id: 'virtual-recovery',
    title: 'Virtual Recovery',
    subtitle: 'Virtual Machine & Cloud Data Recovery',
    description: 'Expert virtual machine recovery services for VMware, Hyper-V, VirtualBox, and cloud platforms with snapshot restoration and virtual disk repair.',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-split',
    features: [
      'VMware vSphere Recovery',
      'Hyper-V VM Recovery',
      'VirtualBox Recovery',
      'Cloud VM Recovery',
      'Virtual Disk Repair',
      'Snapshot Recovery',
      'Container Recovery',
      'Hypervisor Recovery'
    ],
    detailedFeatures: [
      {
        title: 'Multi-Platform VM Support',
        description: 'Complete recovery support for all major virtualization platforms including VMware, Hyper-V, and VirtualBox.',
        icon: '🖥️'
      },
      {
        title: 'Cloud Infrastructure Recovery',
        description: 'Specialized recovery for AWS EC2, Azure VMs, Google Cloud instances, and private cloud environments.',
        icon: '☁️'
      },
      {
        title: 'Virtual Disk Reconstruction',
        description: 'Advanced techniques for repairing corrupted VMDK, VHD, and VHDX virtual disk files.',
        icon: '💾'
      }
    ],
    process: {
      title: 'Virtual Recovery Process',
      steps: [
        'VM Environment Analysis',
        'Virtual Disk Assessment',
        'Data Extraction & Repair',
        'VM Reconstruction'
      ],
      detailedSteps: [
        {
          title: 'Virtualization Platform Analysis',
          description: 'Comprehensive analysis of the virtual environment, hypervisor configuration, and VM settings.',
          duration: '30-90 minutes',
          icon: '🔍'
        },
        {
          title: 'Virtual Disk Examination',
          description: 'Deep examination of virtual disk files, snapshots, and delta files to assess recovery potential.',
          duration: '45-120 minutes',
          icon: '🔎'
        },
        {
          title: 'VM Data Recovery',
          description: 'Extraction and recovery of data from corrupted virtual machines using specialized tools.',
          duration: '2-24 hours',
          icon: '⚡'
        },
        {
          title: 'VM Restoration & Testing',
          description: 'Complete reconstruction of virtual machines with full functionality testing and validation.',
          duration: '1-6 hours',
          icon: '✅'
        }
      ]
    },
    benefits: [
      'All VM Platforms',
      'Cloud Native Support',
      'Snapshot Recovery',
      'Zero Downtime Migration'
    ],
    detailedBenefits: [
      {
        title: 'Universal VM Compatibility',
        description: 'Support for all major virtualization platforms and cloud providers with specialized recovery techniques.',
        metric: '100% Platform Coverage'
      },
      {
        title: 'Advanced Snapshot Management',
        description: 'Expert recovery from corrupted snapshots and complex snapshot chains across all platforms.',
        metric: '95% Snapshot Recovery'
      },
      {
        title: 'Business Continuity Focus',
        description: 'Minimize downtime with hot migration capabilities and live recovery options.',
        metric: 'Near-Zero Downtime'
      }
    ],
    technicalSpecs: {
      title: 'Virtual Recovery Capabilities',
      specifications: [
        {
          category: 'Virtualization Platforms',
          items: ['VMware vSphere/ESXi', 'Microsoft Hyper-V', 'Oracle VirtualBox', 'Citrix XenServer', 'KVM/QEMU', 'Proxmox VE']
        },
        {
          category: 'Cloud Platforms',
          items: ['AWS EC2', 'Microsoft Azure', 'Google Cloud Platform', 'DigitalOcean', 'Linode', 'Private Cloud']
        },
        {
          category: 'Virtual Disk Formats',
          items: ['VMDK (VMware)', 'VHD/VHDX (Hyper-V)', 'VDI (VirtualBox)', 'QCOW2 (KVM)', 'OVF/OVA', 'RAW Images']
        },
        {
          category: 'Recovery Scenarios',
          items: ['VM Corruption', 'Snapshot Failures', 'Storage Failures', 'Hypervisor Crashes', 'Configuration Loss', 'Migration Failures']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'VM Basic',
        price: '$399',
        description: 'Standard virtual machine recovery',
        features: ['Single VM recovery', 'Up to 100GB', 'Standard platforms', 'Email support', '5-7 day turnaround']
      },
      {
        name: 'VM Professional',
        price: '$699',
        description: 'Advanced VM recovery with cloud support',
        features: ['Multiple VMs', 'Up to 1TB', 'All platforms including cloud', 'Priority support', '2-3 day turnaround'],
        recommended: true
      },
      {
        name: 'VM Enterprise',
        price: '$1299',
        description: 'Enterprise virtual infrastructure recovery',
        features: ['Unlimited VMs', 'Unlimited data', 'Same-day service', 'On-site support', '24/7 phone support']
      }
    ],
    caseStudies: [
      {
        title: 'VMware vSphere Disaster Recovery',
        description: 'Recovered entire virtual infrastructure after storage array failure affecting 50+ virtual machines.',
        result: '98% of VMs recovered with full functionality restored',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'AWS EC2 Instance Recovery',
        description: 'Restored critical cloud applications after misconfigured snapshot deletion in AWS environment.',
        result: 'All application data recovered, 2-hour total downtime',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Alex Kumar',
        company: 'CloudTech Solutions',
        text: 'DiskDoctor saved our entire virtual infrastructure. Their expertise in VMware recovery is unmatched.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'Can you recover VMs from all virtualization platforms?',
        answer: 'Yes, we support recovery from all major platforms including VMware, Hyper-V, VirtualBox, and cloud providers like AWS and Azure.'
      },
      {
        question: 'What if my VM snapshots are corrupted?',
        answer: 'We have specialized tools to recover from corrupted snapshots and can often restore VMs even when snapshot chains are broken.'
      },
      {
        question: 'Do you support cloud VM recovery?',
        answer: 'Absolutely! We provide comprehensive cloud VM recovery for AWS, Azure, Google Cloud, and other major cloud platforms.'
      }
    ],
    additionalContent: {
      title: 'Enterprise Virtualization Recovery',
      description: 'Complete virtual infrastructure recovery solutions for enterprise environments with advanced hypervisor support and cloud integration.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Virtual Infrastructure Recovery Experts',
      description: 'Restore your virtual environment quickly with our specialized VM recovery services.',
      primaryButton: 'Recover Virtual Machines',
      secondaryButton: 'VM Recovery Assessment',
      urgencyText: '🔄 24/7 emergency VM recovery available'
    }
  },
  {
    id: 'remote-recovery',
    title: 'Remote Recovery',
    subtitle: 'Secure Remote Data Recovery Services',
    description: 'Professional remote data recovery with encrypted connections, allowing secure recovery without shipping devices, supporting emergency situations worldwide.',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-split',
    features: [
      'Secure Remote Access',
      'Encrypted Data Transfer',
      'Real-time Recovery Status',
      'Global Remote Support',
      'Emergency Remote Service',
      'Cloud-based Recovery',
      'Network Drive Recovery',
      'Remote Diagnostics'
    ],
    detailedFeatures: [
      {
        title: 'Military-Grade Encryption',
        description: 'All remote connections use AES-256 encryption with secure tunneling protocols for maximum data protection.',
        icon: '🔐'
      },
      {
        title: 'Global Remote Access',
        description: 'Worldwide remote recovery services with 24/7 availability for emergency data recovery situations.',
        icon: '🌐'
      },
      {
        title: 'Real-time Monitoring',
        description: 'Live monitoring and status updates throughout the remote recovery process with detailed progress reports.',
        icon: '📊'
      }
    ],
    process: {
      title: 'Remote Recovery Process',
      steps: [
        'Secure Connection Setup',
        'Remote System Analysis',
        'Encrypted Data Recovery',
        'Secure Data Transfer'
      ],
      detailedSteps: [
        {
          title: 'Security Protocol Establishment',
          description: 'Setting up secure VPN connections and encrypted channels for safe remote access to your systems.',
          duration: '15-30 minutes',
          icon: '🛡️'
        },
        {
          title: 'Remote System Assessment',
          description: 'Comprehensive remote analysis of storage systems, network drives, and cloud environments.',
          duration: '30-60 minutes',
          icon: '🔍'
        },
        {
          title: 'Remote Data Extraction',
          description: 'Secure extraction of recoverable data using advanced remote recovery tools and techniques.',
          duration: '1-12 hours',
          icon: '📡'
        },
        {
          title: 'Encrypted Data Delivery',
          description: 'Secure transfer of recovered data through encrypted channels with integrity verification.',
          duration: '30 minutes - 4 hours',
          icon: '🚀'
        }
      ]
    },
    benefits: [
      'No Device Shipping',
      'Instant Emergency Response',
      'Military-Grade Security',
      'Global Availability'
    ],
    detailedBenefits: [
      {
        title: 'Zero Physical Handling',
        description: 'No need to ship sensitive equipment - all recovery performed remotely with complete data security.',
        metric: '100% Remote Process'
      },
      {
        title: 'Immediate Response Time',
        description: 'Start recovery within minutes of contact - perfect for emergency business continuity situations.',
        metric: 'Sub-5 Minute Response'
      },
      {
        title: 'Maximum Data Protection',
        description: 'Advanced encryption and security protocols ensure your data remains completely confidential.',
        metric: 'Military-Grade Security'
      }
    ],
    technicalSpecs: {
      title: 'Remote Recovery Specifications',
      specifications: [
        {
          category: 'Security Protocols',
          items: ['AES-256 Encryption', 'SSL/TLS Tunneling', 'VPN Connections', 'Multi-factor Authentication', 'Zero-knowledge Architecture']
        },
        {
          category: 'Supported Systems',
          items: ['Windows Servers', 'Linux Servers', 'macOS Systems', 'Network Attached Storage', 'Cloud Storage', 'Virtual Machines']
        },
        {
          category: 'Remote Capabilities',
          items: ['File System Recovery', 'Database Recovery', 'Email Recovery', 'Cloud Data Recovery', 'Network Drive Recovery']
        },
        {
          category: 'Global Coverage',
          items: ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East', 'Africa']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'Remote Basic',
        price: '$299',
        description: 'Standard remote recovery service',
        features: ['Up to 50GB recovery', 'Secure connection', 'Standard business hours', 'Email support']
      },
      {
        name: 'Remote Professional',
        price: '$499',
        description: 'Advanced remote recovery with priority support',
        features: ['Up to 500GB recovery', 'Priority connection', 'Extended hours support', 'Phone & email support', 'Real-time monitoring'],
        recommended: true
      },
      {
        name: 'Remote Emergency',
        price: '$899',
        description: '24/7 emergency remote recovery service',
        features: ['Unlimited data recovery', 'Immediate response', '24/7 availability', 'Dedicated technician', 'Live status updates']
      }
    ],
    caseStudies: [
      {
        title: 'International Business Recovery',
        description: 'Recovered critical financial data remotely for a multinational corporation across 3 continents within 6 hours.',
        result: '100% data recovery, zero business interruption',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Emergency Server Recovery',
        description: 'Performed emergency remote recovery of email server data during ransomware attack for law firm.',
        result: 'All emails recovered, 4-hour total downtime',
        image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Maria Santos',
        company: 'Global Finance Corp',
        text: 'Remote recovery service was a lifesaver. They recovered our data without any security concerns and with minimal downtime.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'Is remote data recovery secure?',
        answer: 'Yes, we use military-grade encryption and secure protocols. All connections are fully encrypted and monitored for security.'
      },
      {
        question: 'What types of systems support remote recovery?',
        answer: 'We can remotely recover from Windows, Linux, macOS systems, network drives, cloud storage, and virtual machines.'
      },
      {
        question: 'How quickly can you start remote recovery?',
        answer: 'Emergency remote recovery can begin within 5 minutes of initial contact, with secure connections established immediately.'
      }
    ],
    additionalContent: {
      title: 'Secure Global Recovery Network',
      description: 'Advanced remote recovery infrastructure with global coverage, ensuring secure and rapid data recovery anywhere in the world.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Instant Remote Recovery Available Now',
      description: 'Start your secure remote recovery immediately without shipping hardware or compromising security.',
      primaryButton: 'Start Remote Recovery',
      secondaryButton: 'Remote Assessment',
      urgencyText: '🌐 Available 24/7 worldwide for emergency situations'
    }
  },
  {
    id: 'data-cloning',
    title: 'Data Cloning',
    subtitle: 'Professional Data Cloning & Migration',
    description: 'Expert data cloning services for system migration, backup creation, forensic imaging, and secure data transfer with bit-for-bit accuracy.',
    heroImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-left',
    features: [
      'Bit-for-bit Cloning',
      'System Migration',
      'Forensic Imaging',
      'Bad Sector Handling',
      'Encrypted Drive Cloning',
      'Cross-platform Cloning',
      'Large Scale Cloning',
      'Verification & Validation'
    ],
    detailedFeatures: [
      {
        title: 'Forensic-Grade Accuracy',
        description: 'Bit-perfect cloning with cryptographic verification ensuring 100% data integrity and forensic admissibility.',
        icon: '🔬'
      },
      {
        title: 'Advanced Bad Sector Management',
        description: 'Intelligent handling of bad sectors and unstable drives with multiple read attempts and error correction.',
        icon: '⚙️'
      },
      {
        title: 'Encrypted Volume Support',
        description: 'Specialized cloning of encrypted drives including BitLocker, FileVault, and LUKS encrypted volumes.',
        icon: '🔐'
      }
    ],
    process: {
      title: 'Data Cloning Process',
      steps: [
        'Source Drive Analysis',
        'Clone Strategy Planning',
        'Bit-level Cloning',
        'Integrity Verification'
      ],
      detailedSteps: [
        {
          title: 'Drive Health Assessment',
          description: 'Comprehensive analysis of source drive health, bad sectors, and optimal cloning strategy selection.',
          duration: '30-60 minutes',
          icon: '🔍'
        },
        {
          title: 'Cloning Configuration',
          description: 'Setup of specialized cloning hardware and software with optimal parameters for source drive condition.',
          duration: '15-30 minutes',
          icon: '⚙️'
        },
        {
          title: 'Sector-by-Sector Cloning',
          description: 'Bit-perfect replication of source drive including all sectors, partitions, and metadata.',
          duration: '1-24 hours',
          icon: '💾'
        },
        {
          title: 'Clone Verification',
          description: 'Comprehensive verification using cryptographic hashes and functional testing of cloned drive.',
          duration: '30 minutes - 2 hours',
          icon: '✅'
        }
      ]
    },
    benefits: [
      '100% Bit-Perfect Accuracy',
      'Forensic Documentation',
      'Bad Sector Recovery',
      'Multi-Platform Support'
    ],
    detailedBenefits: [
      {
        title: 'Absolute Data Fidelity',
        description: 'Guaranteed bit-for-bit accuracy with cryptographic verification and forensic-grade documentation.',
        metric: '100% Accuracy Guaranteed'
      },
      {
        title: 'Failing Drive Expertise',
        description: 'Specialized techniques for cloning unstable drives with bad sectors and intermittent failures.',
        metric: '95% Unstable Drive Success'
      },
      {
        title: 'Enterprise Scalability',
        description: 'Simultaneous cloning of multiple drives with batch processing and automated verification.',
        metric: 'Up to 20 Drives Simultaneously'
      }
    ],
    technicalSpecs: {
      title: 'Data Cloning Specifications',
      specifications: [
        {
          category: 'Source Drive Types',
          items: ['SATA HDDs/SSDs', 'NVMe SSDs', 'IDE/PATA Drives', 'SCSI Drives', 'USB Storage', 'SD Cards/Flash Media']
        },
        {
          category: 'Cloning Methods',
          items: ['Hardware-based Cloning', 'Software-based Cloning', 'Forensic Imaging', 'Live System Cloning', 'Network Cloning']
        },
        {
          category: 'File Systems',
          items: ['NTFS', 'FAT32/exFAT', 'HFS+/APFS', 'EXT2/3/4', 'XFS', 'Btrfs', 'ReFS']
        },
        {
          category: 'Encryption Support',
          items: ['BitLocker', 'FileVault 2', 'LUKS', 'TrueCrypt/VeraCrypt', 'PGP Disk', 'Hardware Encryption']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'Clone Basic',
        price: '$199',
        description: 'Standard data cloning service',
        features: ['Single drive clone', 'Up to 1TB', 'Standard verification', 'Email support', '1-2 day turnaround']
      },
      {
        name: 'Clone Professional',
        price: '$349',
        description: 'Advanced cloning with forensic documentation',
        features: ['Multiple drives', 'Up to 4TB', 'Forensic verification', 'Detailed reporting', 'Priority processing'],
        recommended: true
      },
      {
        name: 'Clone Enterprise',
        price: '$599',
        description: 'Large-scale enterprise cloning service',
        features: ['Batch cloning', 'Unlimited capacity', 'Same-day service', 'On-site service', 'Custom solutions']
      }
    ],
    caseStudies: [
      {
        title: 'Legal Evidence Preservation',
        description: 'Created forensic-grade clones of 50 computers for legal proceedings with full chain of custody documentation.',
        result: '100% forensically sound clones, court admissible',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Server Migration Project',
        description: 'Cloned critical business servers for migration to new hardware with zero downtime deployment.',
        result: 'Seamless migration, 99.9% uptime maintained',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'James Wilson',
        company: 'Digital Forensics Lab',
        text: 'DiskDoctor\'s cloning service meets all our forensic standards. Perfect documentation and bit-perfect accuracy every time.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'What is the difference between cloning and backup?',
        answer: 'Cloning creates an exact bit-for-bit copy including all sectors, while backup typically copies only files. Clones are bootable and include everything.'
      },
      {
        question: 'Can you clone a failing hard drive?',
        answer: 'Yes, we specialize in cloning unstable drives using advanced techniques to recover data from bad sectors and failing mechanisms.'
      },
      {
        question: 'Are cloned drives forensically sound?',
        answer: 'Absolutely. Our forensic cloning process includes cryptographic verification and detailed chain of custody documentation.'
      }
    ],
    additionalContent: {
      title: 'Professional Cloning Technology',
      description: 'State-of-the-art cloning equipment and techniques ensuring perfect data replication for migration, backup, and forensic purposes.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Professional Data Cloning Services',
      description: 'Expert cloning services for system migration, forensic imaging, and secure data backup with guaranteed accuracy.',
      primaryButton: 'Start Cloning Service',
      secondaryButton: 'Cloning Consultation',
      urgencyText: '⚡ Same-day cloning available for urgent projects'
    }
  },
  {
    id: 'data-duplication',
    title: 'Data Duplication',
    subtitle: 'Secure Data Duplication & Backup Solutions',
    description: 'Professional data duplication services for backup creation, disaster recovery planning, and secure data archiving with multiple format options.',
    heroImage: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-split',
    features: [
      'Multi-format Duplication',
      'Automated Backup Solutions',
      'Disaster Recovery Planning',
      'Cloud Backup Integration',
      'Incremental Backups',
      'Data Synchronization',
      'Archive Management',
      'Compliance Documentation'
    ],
    detailedFeatures: [
      {
        title: 'Intelligent Duplication',
        description: 'Smart duplication with deduplication, compression, and incremental backup capabilities for efficient storage.',
        icon: '🧠'
      },
      {
        title: 'Multi-Platform Backup',
        description: 'Cross-platform duplication supporting Windows, macOS, Linux, and cloud storage destinations.',
        icon: '🌐'
      },
      {
        title: 'Compliance & Archiving',
        description: 'Regulatory compliance support with proper documentation and long-term archival strategies.',
        icon: '📋'
      }
    ],
    process: {
      title: 'Data Duplication Process',
      steps: [
        'Backup Strategy Design',
        'Duplication Setup',
        'Automated Execution',
        'Verification & Testing'
      ],
      detailedSteps: [
        {
          title: 'Backup Requirements Analysis',
          description: 'Assessment of data types, volume, retention requirements, and recovery objectives for optimal strategy.',
          duration: '45-90 minutes',
          icon: '📊'
        },
        {
          title: 'Duplication Infrastructure Setup',
          description: 'Configuration of backup hardware, software, and network infrastructure for reliable data duplication.',
          duration: '1-3 hours',
          icon: '🔧'
        },
        {
          title: 'Initial Data Duplication',
          description: 'Complete initial backup with optimization for speed and efficiency using advanced algorithms.',
          duration: '2-48 hours',
          icon: '💾'
        },
        {
          title: 'Restore Testing & Validation',
          description: 'Comprehensive testing of backup integrity and restore procedures to ensure reliability.',
          duration: '1-4 hours',
          icon: '✅'
        }
      ]
    },
    benefits: [
      'Automated Scheduling',
      'Space Optimization',
      'Multi-destination Backup',
      'Real-time Monitoring'
    ],
    detailedBenefits: [
      {
        title: 'Set-and-Forget Automation',
        description: 'Fully automated backup schedules with intelligent retry and error handling for reliable data protection.',
        metric: '99.9% Backup Success Rate'
      },
      {
        title: 'Storage Efficiency',
        description: 'Advanced deduplication and compression reducing storage requirements by up to 80%.',
        metric: '80% Storage Savings'
      },
      {
        title: 'Comprehensive Monitoring',
        description: 'Real-time monitoring with alerts and detailed reporting for complete backup visibility.',
        metric: '24/7 Monitoring'
      }
    ],
    technicalSpecs: {
      title: 'Data Duplication Capabilities',
      specifications: [
        {
          category: 'Backup Destinations',
          items: ['Local Storage (HDD/SSD)', 'Network Attached Storage', 'Cloud Storage (AWS, Azure, Google)', 'Tape Libraries', 'Optical Media']
        },
        {
          category: 'Backup Types',
          items: ['Full Backups', 'Incremental Backups', 'Differential Backups', 'Synthetic Backups', 'Continuous Data Protection']
        },
        {
          category: 'Supported Data Types',
          items: ['File System Data', 'Database Backups', 'Virtual Machines', 'Email Systems', 'Application Data']
        },
        {
          category: 'Compliance Standards',
          items: ['SOX Compliance', 'HIPAA Requirements', 'GDPR Compliance', 'PCI DSS Standards', 'Custom Retention Policies']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'Backup Basic',
        price: '$99',
        description: 'Basic data duplication setup',
        features: ['Up to 500GB', 'Single destination', 'Weekly backups', 'Email notifications', 'Basic monitoring']
      },
      {
        name: 'Backup Professional',
        price: '$249',
        description: 'Advanced backup solution with multiple destinations',
        features: ['Up to 5TB', 'Multiple destinations', 'Daily backups', 'Real-time monitoring', 'Priority support'],
        recommended: true
      },
      {
        name: 'Backup Enterprise',
        price: '$599',
        description: 'Enterprise backup and disaster recovery solution',
        features: ['Unlimited data', 'Custom retention', 'Continuous protection', 'Dedicated support', 'Compliance reporting']
      }
    ],
    caseStudies: [
      {
        title: 'Healthcare Data Protection',
        description: 'Implemented HIPAA-compliant backup solution for medical practice with 99.9% uptime requirements.',
        result: 'Zero data loss incidents, full compliance achieved',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Financial Services Backup',
        description: 'Deployed enterprise backup solution for investment firm with strict regulatory requirements.',
        result: '10TB daily backups, 5-minute RPO achieved',
        image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Dr. Sarah Chen',
        company: 'Medical Practice',
        text: 'Their backup solution gives us complete peace of mind. HIPAA compliant and never failed us in 3 years.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'How often should I backup my data?',
        answer: 'Backup frequency depends on your data change rate and recovery objectives. We typically recommend daily backups for business data and weekly for personal data.'
      },
      {
        question: 'Can you integrate with existing backup systems?',
        answer: 'Yes, we can work with existing backup infrastructure and enhance it with additional capabilities and monitoring.'
      },
      {
        question: 'What about compliance requirements?',
        answer: 'We provide backup solutions that meet various compliance standards including HIPAA, SOX, GDPR, and PCI DSS with proper documentation.'
      }
    ],
    additionalContent: {
      title: 'Enterprise Backup Architecture',
      description: 'Scalable backup solutions designed for enterprise environments with advanced features like global deduplication and cloud integration.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Protect Your Business with Reliable Backup',
      description: 'Comprehensive backup solutions that ensure your data is always protected and recoverable when you need it most.',
      primaryButton: 'Setup Backup Solution',
      secondaryButton: 'Backup Assessment',
      urgencyText: '🛡️ Don\'t risk data loss - implement professional backup today'
    }
  },
  {
    id: 'linux-recovery',
    title: 'Linux Recovery',
    subtitle: 'Expert Linux & Open Source Data Recovery',
    description: 'Professional data recovery for Linux distributions, open source systems, and enterprise Linux servers with advanced file system support and kernel-level recovery techniques.',
    heroImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-left',
    features: [
      'All Linux Distributions Support',
      'EXT2/3/4 File System Recovery',
      'Btrfs & XFS Recovery',
      'LVM & RAID Recovery',
      'LUKS Encryption Support',
      'Server System Recovery',
      'Kernel Panic Recovery',
      'Open Source Tool Integration'
    ],
    detailedFeatures: [
      {
        title: 'Advanced EXT Recovery',
        description: 'Specialized recovery techniques for EXT2/3/4 file systems including journal replay and inode reconstruction.',
        icon: '🐧'
      },
      {
        title: 'Enterprise Linux Support',
        description: 'Complete support for Red Hat Enterprise Linux, CentOS, Ubuntu Server, SUSE, and other enterprise distributions.',
        icon: '🏢'
      },
      {
        title: 'LVM & Software RAID',
        description: 'Expert recovery from Logical Volume Manager configurations and Linux software RAID arrays.',
        icon: '💾'
      }
    ],
    process: {
      title: 'Linux Recovery Process',
      steps: [
        'Distribution Analysis',
        'File System Assessment',
        'Kernel-Level Recovery',
        'Data Validation'
      ],
      detailedSteps: [
        {
          title: 'Linux System Analysis',
          description: 'Comprehensive analysis of Linux distribution, kernel version, file systems, and storage configuration.',
          duration: '45-90 minutes',
          icon: '🔍'
        },
        {
          title: 'File System Examination',
          description: 'Detailed examination of EXT, Btrfs, XFS, and other Linux file systems to assess damage and recovery potential.',
          duration: '30-75 minutes',
          icon: '🔎'
        },
        {
          title: 'Advanced Recovery Techniques',
          description: 'Kernel-level data recovery using specialized Linux tools and custom recovery algorithms.',
          duration: '2-18 hours',
          icon: '⚙️'
        },
        {
          title: 'System Integrity Verification',
          description: 'Thorough validation of recovered data including file permissions, symbolic links, and system integrity.',
          duration: '1-4 hours',
          icon: '✅'
        }
      ]
    },
    benefits: [
      'All Linux Distributions',
      'Open Source Compatible',
      'Enterprise Server Support',
      'Command Line Access'
    ],
    detailedBenefits: [
      {
        title: 'Universal Linux Support',
        description: 'Recovery support for all major Linux distributions from desktop Ubuntu to enterprise Red Hat systems.',
        metric: '100+ Distributions'
      },
      {
        title: 'Advanced File System Expertise',
        description: 'Deep expertise in Linux file systems including modern Btrfs and traditional EXT file systems.',
        metric: '98% Recovery Success'
      },
      {
        title: 'Enterprise-Grade Recovery',
        description: 'Specialized recovery for mission-critical Linux servers and high-availability systems.',
        metric: '24/7 Linux Support'
      }
    ],
    technicalSpecs: {
      title: 'Linux Recovery Specifications',
      specifications: [
        {
          category: 'Supported Distributions',
          items: ['Ubuntu/Debian', 'Red Hat Enterprise Linux', 'CentOS/Rocky Linux', 'SUSE/openSUSE', 'Fedora', 'Arch Linux', 'Gentoo', 'Alpine Linux']
        },
        {
          category: 'File Systems',
          items: ['EXT2/3/4', 'Btrfs', 'XFS', 'ReiserFS', 'JFS', 'ZFS on Linux', 'F2FS', 'NILFS2']
        },
        {
          category: 'Storage Technologies',
          items: ['LVM (Logical Volume Manager)', 'Linux Software RAID', 'Device Mapper', 'LUKS Encryption', 'Loop Devices', 'Network File Systems']
        },
        {
          category: 'Recovery Scenarios',
          items: ['Kernel Panics', 'File System Corruption', 'Accidental Deletion', 'Hardware Failures', 'Partition Table Damage', 'Boot Loader Issues']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'Linux Basic',
        price: '$299',
        description: 'Standard Linux data recovery service',
        features: ['Single partition recovery', 'Up to 1TB data', 'EXT file systems', 'Standard processing', 'Email support']
      },
      {
        name: 'Linux Professional',
        price: '$549',
        description: 'Advanced Linux recovery with enterprise support',
        features: ['Multiple partitions', 'Up to 5TB data', 'All file systems', 'LVM & RAID support', 'Priority processing'],
        recommended: true
      },
      {
        name: 'Linux Enterprise',
        price: '$999',
        description: 'Enterprise Linux server recovery service',
        features: ['Server farm recovery', 'Unlimited data', 'Same-day service', '24/7 support', 'On-site service available']
      }
    ],
    caseStudies: [
      {
        title: 'Red Hat Enterprise Server Recovery',
        description: 'Recovered critical database server running RHEL 8 after catastrophic file system corruption in production environment.',
        result: '100% data recovery, 6-hour total downtime',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Ubuntu Web Server Restoration',
        description: 'Restored web application data from corrupted Btrfs file system on Ubuntu Server 22.04 LTS.',
        result: 'All application data recovered, zero customer impact',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Carlos Rodriguez',
        company: 'DevOps Engineer',
        text: 'DiskDoctor saved our production Linux server. Their knowledge of EXT4 and LVM is exceptional. Critical data fully recovered.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      },
      {
        name: 'Anna Kowalski',
        company: 'System Administrator',
        text: 'Professional Linux recovery service. They understood our complex Btrfs RAID setup and recovered everything perfectly.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'Can you recover from encrypted Linux partitions?',
        answer: 'Yes, we support recovery from LUKS-encrypted partitions and can work with various Linux encryption methods when proper credentials are provided.'
      },
      {
        question: 'Do you support modern file systems like Btrfs?',
        answer: 'Absolutely! We have extensive experience with Btrfs, including snapshot recovery, RAID configurations, and subvolume restoration.'
      },
      {
        question: 'Can you recover from LVM configurations?',
        answer: 'Yes, we specialize in LVM recovery including physical volume reconstruction, volume group restoration, and logical volume repair.'
      },
      {
        question: 'What about server distributions like RHEL?',
        answer: 'We provide full support for all enterprise Linux distributions including RHEL, CentOS, SUSE Enterprise, and Ubuntu Server.'
      }
    ],
    additionalContent: {
      title: 'Open Source Recovery Excellence',
      description: 'Leveraging both proprietary and open source tools to provide comprehensive Linux data recovery with deep understanding of Linux internals and file systems.',
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'Linux Data Recovery Specialists',
      description: 'Expert Linux recovery services for all distributions and configurations with enterprise-grade reliability.',
      primaryButton: 'Recover Linux Data',
      secondaryButton: 'Linux Recovery Consultation',
      urgencyText: '🐧 24/7 Linux server recovery available'
    }
  },
  {
    id: 'unix-recovery',
    title: 'UNIX Recovery',
    subtitle: 'Professional UNIX & Legacy System Recovery',
    description: 'Expert data recovery for UNIX systems including Solaris, AIX, HP-UX, FreeBSD, and legacy mainframe systems with specialized tools and decades of experience.',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    layoutType: 'hero-split',
    features: [
      'Solaris & AIX Recovery',
      'HP-UX & OpenVMS Support',
      'FreeBSD & NetBSD Recovery',
      'Legacy Mainframe Systems',
      'UFS & ZFS File Systems',
      'Tape Drive Recovery',
      'Proprietary UNIX Variants',
      'Mission-Critical Recovery'
    ],
    detailedFeatures: [
      {
        title: 'Enterprise UNIX Expertise',
        description: 'Decades of experience with enterprise UNIX systems including Sun Solaris, IBM AIX, and HP-UX environments.',
        icon: '🏛️'
      },
      {
        title: 'Legacy System Specialists',
        description: 'Specialized recovery for legacy UNIX systems, mainframes, and proprietary UNIX variants no longer in mainstream use.',
        icon: '📜'
      },
      {
        title: 'Advanced File System Support',
        description: 'Expert recovery from UFS, ZFS, JFS, VxFS, and other UNIX file systems with deep technical knowledge.',
        icon: '💽'
      }
    ],
    process: {
      title: 'UNIX Recovery Process',
      steps: [
        'System Architecture Analysis',
        'File System Identification',
        'Legacy Tool Deployment',
        'Data Reconstruction'
      ],
      detailedSteps: [
        {
          title: 'UNIX System Assessment',
          description: 'Comprehensive analysis of UNIX variant, hardware architecture, and storage subsystem configuration.',
          duration: '1-3 hours',
          icon: '🔍'
        },
        {
          title: 'File System Analysis',
          description: 'Detailed examination of UFS, ZFS, or proprietary file systems to determine optimal recovery approach.',
          duration: '45-120 minutes',
          icon: '🔎'
        },
        {
          title: 'Specialized Recovery Execution',
          description: 'Deployment of UNIX-specific recovery tools and techniques adapted for legacy system architectures.',
          duration: '3-24 hours',
          icon: '⚙️'
        },
        {
          title: 'System Validation & Migration',
          description: 'Complete validation of recovered data and optional migration to modern systems if required.',
          duration: '2-8 hours',
          icon: '✅'
        }
      ]
    },
    benefits: [
      'Legacy System Expertise',
      'Mission-Critical Support',
      'Tape Media Recovery',
      'Mainframe Experience'
    ],
    detailedBenefits: [
      {
        title: 'Unmatched UNIX Experience',
        description: 'Over 25 years of experience with enterprise UNIX systems and legacy mainframe environments.',
        metric: '25+ Years UNIX Expertise'
      },
      {
        title: 'Critical System Recovery',
        description: 'Specialized in mission-critical UNIX system recovery for financial, government, and enterprise environments.',
        metric: '99% Mission-Critical Success'
      },
      {
        title: 'Complete Legacy Support',
        description: 'Full support for obsolete UNIX variants and legacy systems that other providers cannot handle.',
        metric: '100% Legacy Coverage'
      }
    ],
    technicalSpecs: {
      title: 'UNIX Recovery Capabilities',
      specifications: [
        {
          category: 'UNIX Variants',
          items: ['Sun Solaris (all versions)', 'IBM AIX', 'HP-UX', 'SCO UNIX', 'Unixware', 'IRIX', 'Tru64 UNIX', 'OpenVMS']
        },
        {
          category: 'BSD Systems',
          items: ['FreeBSD', 'NetBSD', 'OpenBSD', 'DragonFly BSD', 'BSD/OS', 'SunOS', 'Ultrix']
        },
        {
          category: 'File Systems',
          items: ['UFS (all variants)', 'ZFS', 'JFS', 'VxFS (Veritas)', 'QFS', 'XFS', 'ReiserFS', 'HFS']
        },
        {
          category: 'Storage Technologies',
          items: ['SCSI Arrays', 'Fibre Channel', 'SAN Storage', 'Tape Libraries', 'Optical Storage', 'Legacy Disk Arrays']
        }
      ]
    },
    pricingTiers: [
      {
        name: 'UNIX Basic',
        price: '$599',
        description: 'Standard UNIX data recovery service',
        features: ['Single system recovery', 'Up to 2TB data', 'Standard UNIX variants', 'Standard processing', 'Email support']
      },
      {
        name: 'UNIX Professional',
        price: '$1299',
        description: 'Advanced UNIX recovery with legacy support',
        features: ['Multiple systems', 'Up to 10TB data', 'All UNIX variants', 'Legacy system support', 'Priority processing'],
        recommended: true
      },
      {
        name: 'UNIX Enterprise',
        price: '$2499',
        description: 'Mission-critical UNIX recovery service',
        features: ['Enterprise environments', 'Unlimited data', 'Same-day service', 'On-site support', 'Mainframe recovery']
      }
    ],
    caseStudies: [
      {
        title: 'Banking Mainframe Recovery',
        description: 'Recovered critical financial data from legacy IBM AIX system after storage array failure at major bank.',
        result: '100% transaction data recovered, zero financial impact',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Solaris Server Restoration',
        description: 'Restored scientific computing data from corrupted ZFS pool on Sun Solaris 11 research system.',
        result: '15TB of research data recovered, project timeline maintained',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80'
      }
    ],
    testimonials: [
      {
        name: 'Robert Chen',
        company: 'Financial Systems Director',
        text: 'DiskDoctor was the only company that could handle our legacy AIX system. Their mainframe expertise saved our critical operations.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      },
      {
        name: 'Dr. Margaret Foster',
        company: 'Research Institute',
        text: 'Incredible expertise with our old Solaris system. They recovered decades of research data that we thought was lost forever.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80'
      }
    ],
    faq: [
      {
        question: 'Can you recover from legacy UNIX systems?',
        answer: 'Yes, we specialize in legacy UNIX recovery including discontinued systems like IRIX, Tru64, and various proprietary UNIX variants.'
      },
      {
        question: 'Do you support mainframe UNIX systems?',
        answer: 'Absolutely! We have extensive experience with mainframe UNIX environments and can handle complex enterprise configurations.'
      },
      {
        question: 'What about obsolete hardware platforms?',
        answer: 'We maintain access to legacy hardware and have specialized tools for recovering data from obsolete UNIX hardware platforms.'
      },
      {
        question: 'Can you migrate data to modern systems?',
        answer: 'Yes, we offer data migration services to help transition recovered data from legacy UNIX systems to modern platforms.'
      }
    ],
    additionalContent: {
      title: 'Legacy UNIX System Mastery',
      description: 'Unparalleled expertise in legacy UNIX and mainframe systems with specialized tools and knowledge accumulated over decades of enterprise experience.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    },
    ctaSection: {
      title: 'UNIX & Legacy System Experts',
      description: 'Professional UNIX recovery services for mission-critical systems with decades of specialized experience.',
      primaryButton: 'Recover UNIX Data',
      secondaryButton: 'UNIX Recovery Consultation',
      urgencyText: '🏛️ Legacy system expertise available 24/7'
    }
  }
];
