import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Preview() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // In a real application, you would get this from a state management solution
    // or pass it through the router query
    const savedTitle = localStorage.getItem('draftTitle');
    const savedContent = localStorage.getItem('draftContent');
    
    if (savedTitle) setTitle(savedTitle);
    if (savedContent) setContent(savedContent);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Preview</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Back to Editor
          </button>
        </div>

        <article className="prose lg:prose-xl">
          <h1>{title || 'Untitled Post'}</h1>
          <div className="whitespace-pre-wrap">{content}</div>
        </article>
      </div>
    </div>
  );
} 