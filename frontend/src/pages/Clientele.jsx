
import How from '../components/jsx/How';
import Why from '../components/jsx/Why';
import SEO from '../components/SEO/Seo';

function Clientele(){
  const baseUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const pageUrl = `${baseUrl}/clientele`;

    return(
      <>
        <SEO
          title="Trusted Chillie Suppliers in Nairobi"
          description="See why Chillie Haven is trusted by homes, restaurants, and businesses across Nairobi for fresh chillie supply."
          keywords="trusted chilli supplier Nairobi, Chillie Haven clientele, fresh chillies for restaurants, wholesale chillies Nairobi"
          ogUrl={pageUrl}
          canonicalUrl={pageUrl}
        />
        <div className="page">
            <How />
            <Why />
        </div>
      </>
    )
}
export default Clientele;