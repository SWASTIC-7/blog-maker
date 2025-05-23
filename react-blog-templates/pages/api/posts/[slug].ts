import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const post = await Post.findOne({ slug });
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching post' });
      }
      break;

    case 'PUT':
      try {
        const { title, content } = req.body;
        const post = await Post.findOneAndUpdate(
          { slug },
          { title, content, updatedAt: Date.now() },
          { new: true }
        );
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
      } catch (error) {
        res.status(500).json({ error: 'Error updating post' });
      }
      break;

    case 'DELETE':
      try {
        const post = await Post.findOneAndDelete({ slug });
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 