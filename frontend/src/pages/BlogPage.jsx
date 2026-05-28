import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SEO from '../components/SEO/Seo';
import '../components/css/BlogPage.css';

function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const baseUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const pageUrl = `${baseUrl}${typeof window !== 'undefined' ? window.location.pathname : `/blog/${slug}`}`;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/blogs`);
        const data = await res.json();

        // 🔒 ensure array safety
        if (!Array.isArray(data)) {
          throw new Error("Invalid blog data format");
        }

        const found = data.find(b => b.slug === slug);

        setBlog(found || null);
      } catch (err) {
        console.error(err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, API_BASE]);

  if (loading) return <p>Loading...</p>;

  if (!blog) {
    return (
      <div className="blog-page">
        <SEO
          title="Blog Not Found"
          description="The requested Chillie Haven blog post could not be found."
          noIndex={true}
          ogUrl={pageUrl}
          canonicalUrl={pageUrl}
        />
        <h2>Blog not found</h2>
      </div>
    );
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.shortDesc || blog.content.slice(0, 160),
    datePublished: blog.date,
    author: {
      '@type': 'Organization',
      name: blog.author || 'Chillie Haven'
    },
    url: pageUrl,
    image: blog.image ? `${baseUrl}${blog.image}` : `${baseUrl}/logo.svg`,
    publisher: {
      '@type': 'Organization',
      name: 'Chillie Haven',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`
      }
    }
  };

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.shortDesc || 'Read the latest Chillie Haven blog post for tips on chillies, cooking, and delivery in Nairobi.'}
        keywords={(blog.keywords || []).join(', ')}
        ogImage={blog.image ? `${baseUrl}${blog.image}` : '/logo.svg'}
        ogUrl={pageUrl}
        canonicalUrl={pageUrl}
        structuredData={structuredData}
      />
      <div className="blog-page">
        <h1>{blog.title}</h1>
        <small>{blog.date}</small>
        <p>{blog.content}</p>
      </div>
    </>
  );
}

export default BlogPage; 