# Blog Backend Service

This backend service handles the publishing of blog posts and serves the blog editor interface.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
PORT=3001
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

- `GET /`: Serves the editor page
- `GET /preview`: Serves the preview page
- `POST /publish`: Publishes a new blog post
  - Body: `{ title: string, content: string }`
  - Returns: `{ success: true, url: string, slug: string }`
- `GET /api/posts`: Lists all blog posts
- `GET /api/posts/:slug`: Gets a specific blog post
- `GET /:slug`: Serves the blog post page for a specific slug

## How It Works

1. When you publish a blog post using the `/publish` endpoint, it creates a URL-friendly slug from the title
2. The blog post is stored and becomes accessible at `/{slug}`
3. All blog posts are served from the same domain, with different endpoints
4. The frontend application can fetch blog post data using the `/api/posts` endpoints

## Frontend Integration

The backend serves the static files from the `react-blog-templates/dist` directory. Make sure to build your frontend application before running the backend server.

To integrate with the frontend:
1. Use the `/publish` endpoint to create new blog posts
2. Use the `/api/posts` endpoints to fetch blog post data
3. Use the `/:slug` endpoints to serve individual blog posts 