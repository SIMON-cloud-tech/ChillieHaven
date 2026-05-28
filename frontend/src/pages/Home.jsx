import Hero from '../components/jsx/Hero.jsx';
import Story from '../components/jsx/Story.jsx';
import How from '../components/jsx/How.jsx';
import Products from '../components/jsx/Products.jsx';
import Cta from '../components/jsx/Cta.jsx';
import Reach  from '../components/jsx/Reach.jsx';
import Why from '../components/jsx/Why.jsx';
import BlogSection from '../components/jsx/BlogSection.jsx';
import SEO from '../components/SEO/Seo';

function Home({ cart, setCart }){
    const baseUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
    const pageUrl = `${baseUrl}/`;
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Chillie Haven',
      description: 'Fresh Chillie Haven delivers farm fresh chillies across Nairobi with fast local delivery and organic quality.',
      url: pageUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressRegion: 'Kenya'
      },
      telephone: 'orders@chilliehaven.co.ke'
    };

    return(
        <>
        <SEO
          title="Fresh Organic Chillies Delivered Daily"
          description="Chillie Haven delivers fresh farm chillies across Nairobi with fast same-day delivery to South B, Syokimau, Embakasi, and nearby areas."
          keywords="fresh chillies, chilli delivery Nairobi, organic chillies, farm fresh chillies, Chillie Haven"
          ogImage="/logo.svg"
          ogUrl={pageUrl}
          canonicalUrl={pageUrl}
          structuredData={structuredData}
        />
        <Hero />
        <Story />
        <How />
        <Products cart={cart} setCart={setCart} />
        <Cta />
        <Reach />
        <BlogSection />
        <Why />
        </>
    )
}
export default Home;