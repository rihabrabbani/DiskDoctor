import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dgzsfe5ci', 
  api_key: process.env.CLOUDINARY_API_KEY || '667377418472197', 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to upload image to Cloudinary
export const uploadToCloudinary = async (fileBuffer: Buffer, options: any = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: 'blog_images',
      resource_type: 'auto',
      ...options
    };

    // Convert buffer to data URI for Cloudinary upload
    const b64 = Buffer.from(fileBuffer).toString('base64');
    const dataURI = `data:image/jpeg;base64,${b64}`;
    
    cloudinary.uploader.upload(
      dataURI,
      uploadOptions,
      (error: any, result: any) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Helper function to extract Cloudinary URLs from HTML content
export const extractCloudinaryUrls = (htmlContent: string) => {
  const cloudinaryUrls: string[] = [];
  const imgRegex = /<img[^>]+src="([^"]*res\.cloudinary\.com[^"]*)"[^>]*>/g;
  let match;
  
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    cloudinaryUrls.push(match[1]);
  }
  
  return cloudinaryUrls;
};

export default cloudinary;
