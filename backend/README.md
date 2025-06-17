# DiskDoctor Blog Backend

This is the backend server for the DiskDoctor blog system.

## Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

The server will run on http://localhost:5000

## API Endpoints

- `POST /api/admin/login` - Admin authentication
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get specific blog post
- `POST /api/blogs` - Create new blog post (with image upload)
- `DELETE /api/blogs/:id` - Delete blog post

## Admin Credentials

- Username: `admin`
- Password: `america`

## File Storage

Blog data is stored in `blogs.json` and uploaded images are stored in the `uploads/` directory.
