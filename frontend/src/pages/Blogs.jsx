import BlogSection from "../components/jsx/BlogSection";
import SEO from '../components/SEO/Seo';

function Blogs() {
  const baseUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const pageUrl = `${baseUrl}/blogs`;

  return (
    <>
      <SEO
        title="Fresh Chillie Insights & Tips"
        description="Read Chillie Haven's blog for tips on growing, cooking, and ordering fresh chillies in Nairobi."
        keywords="chillie blog, fresh chilli tips, cooking with chillies, chilli farming Nairobi"
        ogUrl={pageUrl}
        canonicalUrl={pageUrl}
      />
      <div className="page">
        <BlogSection />
      </div>
    </>
  );
}

export default Blogs;