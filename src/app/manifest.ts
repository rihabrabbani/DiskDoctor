import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DiskDoctor - Professional Data Recovery Services',
    short_name: 'DiskDoctor',
    description: 'Professional data recovery from hard drives, SSDs, RAID systems, and all digital media. Trusted since 1991 with a 95% success rate.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#00a864',
    icons: [
      {
        src: '/images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity', 'utilities'],
    lang: 'en',
    orientation: 'portrait-primary',
    scope: '/',
  }
}
