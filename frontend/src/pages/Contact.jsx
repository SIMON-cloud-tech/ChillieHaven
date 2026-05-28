import Reach from '../components/jsx/Reach';
import SEO from '../components/SEO/Seo';

function Contact() {
  const baseUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const pageUrl = `${baseUrl}/contact`;

  return (
    <>
      <SEO
        title="Contact Chillie Haven"
        description="Order fresh chillies from Chillie Haven or get in touch for fast delivery across Nairobi."
        keywords="contact Chillie Haven, chilli delivery contact, fresh chillies Nairobi, order chillies online"
        ogUrl={pageUrl}
        canonicalUrl={pageUrl}
      />
      <div className="page">
        <Reach />
      </div>
    </>
  );
}

export default Contact;