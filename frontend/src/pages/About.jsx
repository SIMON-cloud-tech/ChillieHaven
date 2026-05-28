import Story from '../components/jsx/Story';
import SEO from '../components/SEO/Seo';

function About() {
  const baseUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const pageUrl = `${baseUrl}/about`;

  return (
    <>
      <SEO
        title="About Chillie Haven"
        description="Learn about Chillie Haven, Nairobi's trusted supplier of fresh farm chillies and local spice products."
        keywords="about Chillie Haven, chilli supplier Nairobi, fresh chilli producer, organic chillies"
        ogUrl={pageUrl}
        canonicalUrl={pageUrl}
      />
      <div className="page">
        <Story />
      </div>
    </>
  );
}

export default About;