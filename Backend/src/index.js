require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Store blog posts in memory (can be replaced with a database later)
const blogPosts = new Map();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../react-blog-templates/dist')));

// Serve the editor page at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../react-blog-templates/dist/index.html'));
});

// Preview endpoint
app.get('/preview', (req, res) => {
  res.sendFile(path.join(__dirname, '../../react-blog-templates/dist/index.html'));
});

// Publish blog endpoint
app.post('/publish', (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Create a URL-friendly slug from the title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Store the blog post
    blogPosts.set(slug, {
      title,
      content,
      createdAt: new Date().toISOString()
    });

    res.json({
      success: true,
      url: `/${slug}`,
      slug
    });
  } catch (error) {
    console.error('Publishing error:', error);
    res.status(500).json({ error: 'Failed to publish blog post' });
  }
});

// Dynamic blog post endpoint
app.get('/:slug', (req, res) => {
  const { slug } = req.params;
  
  if (blogPosts.has(slug)) {
    // If it's a blog post, serve the blog post page
    res.sendFile(path.join(__dirname, '../../react-blog-templates/dist/index.html'));
  } else {
    // If it's not a blog post, serve the main app
    res.sendFile(path.join(__dirname, '../../react-blog-templates/dist/index.html'));
  }
});

// Get all blog posts
app.get('/api/posts', (req, res) => {
  const posts = Array.from(blogPosts.entries()).map(([slug, post]) => ({
    slug,
    ...post
  }));
  res.json(posts);
});

// Get specific blog post
app.get('/api/posts/:slug', (req, res) => {
  const { slug } = req.params;
  const post = blogPosts.get(slug);
  
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  
  res.json({ slug, ...post });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 