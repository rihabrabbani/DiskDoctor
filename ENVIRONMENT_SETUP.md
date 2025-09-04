# Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogDB?retryWrites=true&w=majority

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Application
NEXT_PUBLIC_BASE_URL=https://www.diskdoctorsamerica.com
NODE_ENV=production

# Google Services (for SEO)
GOOGLE_VERIFICATION_CODE=your_google_verification_code
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Social Media (update in structured data)
FACEBOOK_URL=https://www.facebook.com/diskdoctor
TWITTER_URL=https://www.twitter.com/diskdoctor
LINKEDIN_URL=https://www.linkedin.com/company/diskdoctor
YOUTUBE_URL=https://www.youtube.com/diskdoctor

# Contact Information
BUSINESS_PHONE=+1-571-202-8529
BUSINESS_EMAIL=shah4268@msn.com
BUSINESS_ADDRESS_1=10015 Old Columbia Rd Suite B 215, Columbia, MD 21046
BUSINESS_ADDRESS_2=8300 Boone Blvd Suite 513, Tysons, VA 22182

# SEO
SITE_NAME=DiskDoctor Data Recovery
SITE_DESCRIPTION=Professional data recovery from hard drives, SSDs, RAID systems, and all digital media. Trusted since 1991 with a 95% success rate.
SITE_KEYWORDS=data recovery, hard drive recovery, SSD recovery, RAID recovery, file recovery, photo recovery, mobile recovery, data security
```

## Required Setup Steps:

1. **MongoDB Atlas**: Set up a MongoDB Atlas cluster and get your connection string
2. **Cloudinary**: Create a Cloudinary account for image storage
3. **Google Search Console**: Get your verification code
4. **Google Analytics**: Set up GA4 and get your measurement ID
5. **Domain**: All URLs have been updated to www.diskdoctorsamerica.com
6. **Social Media**: Create and update social media accounts

## Vercel Deployment:

Add these environment variables in your Vercel dashboard:
- Go to your project settings
- Navigate to Environment Variables
- Add each variable from the list above
- Make sure to set them for Production, Preview, and Development environments
