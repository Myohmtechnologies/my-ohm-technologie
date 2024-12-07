import { NextResponse } from 'next/server';
import { BlogService } from '@/services/blogService';
import type { BlogPost } from '@/types';

// GET /api/blog/[slug]
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await BlogService.getPostBySlug(params.slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error fetching blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[slug]
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const updates: Partial<BlogPost> = await request.json();
    const result = await BlogService.updatePost(params.slug, updates);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Blog post updated successfully',
      newSlug: result.newSlug
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error updating blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[slug]
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const success = await BlogService.deletePost(params.slug);

    if (!success) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Blog post deleted successfully' 
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error deleting blog post' },
      { status: 500 }
    );
  }
}
