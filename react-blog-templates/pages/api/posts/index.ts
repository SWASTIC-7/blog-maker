import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
      }
      break;

    case 'POST':
      try {
        const { title, content } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const post = await Post.create({
          title,
          content,
          slug,
        });
        
        res.status(201).json(post);
      } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 