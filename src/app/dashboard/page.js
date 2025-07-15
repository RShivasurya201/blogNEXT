'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SellerBlogDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/posts');
      const posts = await res.json();
      setBlogs(posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing post
        const response = await fetch('/api/posts', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug: editingSlug,
            title,
            content,
          }),
        });

        if (response.ok) {
          alert('Blog updated!');
          fetchBlogs(); // Refresh the list
        } else {
          alert('Failed to update blog');
        }
      } else {
        // Create new post
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
          }),
        });

        if (response.ok) {
          alert('Blog created!');
          fetchBlogs(); // Refresh the list
        } else {
          alert('Failed to create blog');
        }
      }

      setTitle('');
      setContent('');
      setIsEditing(false);
      setEditingSlug(null);
    } catch (error) {
      alert('Error saving blog');
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setIsEditing(true);
    setEditingSlug(blog.slug);
  };

  const handleDelete = async (slug) => {
    const confirmDelete = confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/posts?slug=${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Blog deleted!');
        fetchBlogs(); // Refresh the list
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      alert('Error deleting blog');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#FF5722' }}>Blog Dashboard</h1>
        <Link 
          href="/blog"
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          View All Posts
        </Link>
      </div>

      {/* Create/Edit Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: '2rem',
          backgroundColor: '#fff3e0',
          padding: '1rem',
          borderRadius: '8px',
          maxWidth: '600px',
        }}
      >
        <h2>{isEditing ? 'Update Blog' : 'Create Blog'}</h2>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: isEditing ? '#FF9800' : '#FF5722',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isEditing ? 'Update Blog' : 'Create Blog'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingSlug(null);
                setTitle('');
                setContent('');
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#9e9e9e',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Blog List */}
      <div>
        <h2>All Blogs</h2>
        {blogs.length === 0 ? (
          <p>No blogs found. Create one!</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {blogs.map((blog) => (
              <div
                key={blog.slug}
                style={{
                  backgroundColor: '#fbe9e7',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>{blog.title}</h3>
                <p style={{ margin: '0 0 15px 0', color: '#666' }}>
                  {blog.content.substring(0, 150)}...
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link
                    href={`/blog/${blog.slug}`}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleEdit(blog)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.slug)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}