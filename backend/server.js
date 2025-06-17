const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: './var.env' });


const app = express();
const PORT = 5000;
const uri = process.env.MONGODB_URI

// MongoDB Configuration

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database and Collection names
const DB_NAME = 'blogDB';
const COLLECTION_NAME = 'blogs';

// Global variable to store database connection
let db;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Successfully connected to MongoDB Atlas!");
    
    // Test the connection
    await db.command({ ping: 1 });
    console.log("Database ping successful!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Initialize MongoDB connection
connectToMongoDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Helper functions for MongoDB operations
const getBlogsCollection = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db.collection(COLLECTION_NAME);
};

// Routes

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'america') {
    res.json({ 
      success: true, 
      token: 'admin-token-' + Date.now(),
      message: 'Login successful' 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
});

// Get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogsCollection = getBlogsCollection();
    const blogs = await blogsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      blogs: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs'
    });
  }
});

// Get specific blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blogsCollection = getBlogsCollection();
    const blog = await blogsCollection.findOne({ id: req.params.id });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog'
    });
  }
});

// Add new blog
app.post('/api/blogs', upload.single('image'), async (req, res) => {
  try {
    const { title, content, excerpt, tags } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }
    
    const blogsCollection = getBlogsCollection();
    
    const newBlog = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt?.trim() || content.substring(0, 150) + '...',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      image: req.file ? `/uploads/${req.file.filename}` : null,
      imageOriginalName: req.file ? req.file.originalname : null,
      imageSize: req.file ? req.file.size : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const result = await blogsCollection.insertOne(newBlog);
    
    if (result.acknowledged) {
      res.status(201).json({
        success: true,
        blog: newBlog,
        message: 'Blog created successfully'
      });
    } else {
      throw new Error('Failed to insert blog');
    }
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog'
    });
  }
});

// Update blog
app.put('/api/blogs/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, excerpt, tags } = req.body;
    const blogId = req.params.id;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }
    
    const blogsCollection = getBlogsCollection();
    
    // Find existing blog
    const existingBlog = await blogsCollection.findOne({ id: blogId });
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Prepare update data
    const updateData = {
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt?.trim() || content.substring(0, 150) + '...',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      updatedAt: new Date().toISOString()
    };
    
    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (existingBlog.image) {
        const oldImagePath = path.join(__dirname, existingBlog.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Add new image info
      updateData.image = `/uploads/${req.file.filename}`;
      updateData.imageOriginalName = req.file.originalname;
      updateData.imageSize = req.file.size;
    }
    
    const result = await blogsCollection.updateOne(
      { id: blogId },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Get updated blog
    const updatedBlog = await blogsCollection.findOne({ id: blogId });
    
    res.json({
      success: true,
      blog: updatedBlog,
      message: 'Blog updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog'
    });
  }
});

// Delete blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blogsCollection = getBlogsCollection();
    const blogId = req.params.id;
    
    // Find the blog first to get image info
    const blog = await blogsCollection.findOne({ id: blogId });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    // Delete associated image if exists
    if (blog.image) {
      const imagePath = path.join(__dirname, blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Delete blog from database
    const result = await blogsCollection.deleteOne({ id: blogId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog'
    });
  }
});

// Get blogs by tag
app.get('/api/blogs/tag/:tag', async (req, res) => {
  try {
    const blogsCollection = getBlogsCollection();
    const tag = req.params.tag;
    
    const blogs = await blogsCollection
      .find({ tags: { $in: [tag] } })
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      blogs: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs by tag:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs by tag'
    });
  }
});

// Search blogs
app.get('/api/blogs/search/:query', async (req, res) => {
  try {
    const blogsCollection = getBlogsCollection();
    const query = req.params.query;
    
    const blogs = await blogsCollection
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      blogs: blogs
    });
  } catch (error) {
    console.error('Error searching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching blogs'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum 10MB allowed.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: error.message || 'Something went wrong'
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  try {
    await client.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Blog backend server running on http://localhost:${PORT}`);
});