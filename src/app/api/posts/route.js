// src/app/api/posts/route.js

export const dynamic = "force-dynamic"; // Always run on the server

// In-memory storage for posts (in a real app, you'd use a database)
let posts = [
  {
    slug: "nextjs-routing-guide",
    title: "Next.js Routing Guide",
    content: "Updated at: " + new Date().toLocaleTimeString()
  },
  {
    slug: "how-to-bulk-up",
    title: "How to Bulk Up",
    content: "Eat big, lift big. Time: " + new Date().toLocaleTimeString()
  }
];

export async function GET() {
  return Response.json(posts);
}

export async function POST(request) {
  try {
    const { title, content } = await request.json();
    
    // Generate a slug from the title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const newPost = {
      slug,
      title,
      content
    };
    
    posts.push(newPost);
    
    return Response.json(newPost, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { slug, title, content } = await request.json();
    
    const postIndex = posts.findIndex(post => post.slug === slug);
    
    if (postIndex === -1) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    
    posts[postIndex] = {
      ...posts[postIndex],
      title,
      content
    };
    
    return Response.json(posts[postIndex]);
  } catch (error) {
    return Response.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return Response.json({ error: 'Slug parameter is required' }, { status: 400 });
    }
    
    const postIndex = posts.findIndex(post => post.slug === slug);
    
    if (postIndex === -1) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    
    const deletedPost = posts[postIndex];
    posts = posts.filter(post => post.slug !== slug);
    
    return Response.json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
