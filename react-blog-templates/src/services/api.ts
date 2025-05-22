import { Block } from '../components/editor/BlogEditor';

const API_BASE_URL = 'http://localhost:3001';

export interface BlogPost {
  title: string;
  content: Block[];
  slug: string;
  createdAt: string;
}

export const api = {
  async publishBlog(title: string, blocks: Block[]): Promise<{ url: string; slug: string }> {
    const response = await fetch(`${API_BASE_URL}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content: blocks,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to publish blog');
    }

    return response.json();
  },

  async getBlogPost(slug: string): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/api/posts/${slug}`);
    
    if (!response.ok) {
      throw new Error('Blog post not found');
    }

    return response.json();
  },

  async getAllBlogPosts(): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE_URL}/api/posts`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }

    return response.json();
  },
}; 