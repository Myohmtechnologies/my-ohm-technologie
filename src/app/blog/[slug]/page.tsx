import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import BlogHead from '@/components/sections/BlogHead';
import BlogSection from '@/components/sections/BlogSection';
import { BlogService } from '@/services/blogService';

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  try {
    const blog = await BlogService.getPostBySlug(params.slug);

    if (!blog) {
      notFound();
    }

    // Generate table of contents from sections
    const tableOfContents = blog.sections?.map((section: any, index: number) => ({
      title: section.title,
      id: `section-${index}`,
    })) || [];

    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        
        <main className="flex-grow">
          <BlogHead 
            title={blog.title}
            description={blog.description}
            mainImage={blog.mainImage || '/images/blog-default.jpg'}
          />
          
          {/* Blog Meta */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center text-gray-600 gap-4">
              <span className="inline-block bg-[#6C8D2F] text-white px-4 py-1 rounded-full text-sm">
                {blog.category}
              </span>
              <span>{blog.author || 'My Ohm Technologies'}</span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>

          {/* Blog Content with Sections */}
          <BlogSection 
            sections={blog.sections || []}
            tableOfContents={tableOfContents}
          />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error in BlogDetailPage:', error);
    notFound();
  }
}
