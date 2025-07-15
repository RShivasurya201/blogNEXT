'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
      });
      const postsData = await res.json();
      setPosts(postsData);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>All Blog Posts</h1>
        <Link 
          href="/dashboard"
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          Create New Post
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li 
              key={post.slug}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <Link 
                href={`/blog/${post.slug}`}
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                {post.title}
              </Link>
              <p style={{ marginTop: '5px', color: '#666', fontSize: '14px' }}>
                {post.content.substring(0, 100)}...
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
