import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, BlogPost as BlogPostType } from '../../services/api';
import BlogPreview from './BlogPreview';
import './BlogPost.css';
import { useTheme } from '../../context/ThemeContext';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        if (!slug) {
          throw new Error('No slug provided');
        }
        const post = await api.getBlogPost(slug);
        setBlogPost(post);
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return <div className="blog-post-loading">Loading...</div>;
  }

  if (error || !blogPost) {
    return <div className="blog-post-error">{error || 'Blog post not found'}</div>;
  }

  return (
    <div className="blog-post">
      <BlogPreview 
        blocks={blogPost.content}
        isPublished={true}
        currentTheme={currentTheme}
      />
    </div>
  );
};

export default BlogPost; 