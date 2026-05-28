
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogUrl, 
  canonicalUrl,
  structuredData,
  noIndex = false,
  additionalMeta = []
}) => {
  const siteTitle = 'Chillie Haven';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription = description || 'Chillie Haven supplies fresh farm chillies across Nairobi with fast delivery, organic quality, and easy ordering.';
  const siteKeywords = keywords || 'fresh chillies, chilli delivery Nairobi, organic chillies, farm fresh chillies, fresh produce Kenya, Chillie Haven';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const baseUrl = import.meta.env.VITE_SITE_URL || origin || 'https://www.chilliehenaven.co.ke';
  const defaultImage = `${baseUrl}/logo.svg`;
  const canonical = canonicalUrl || `${baseUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content="Chillie Haven" />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl || canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl || canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={ogImage || defaultImage} />
      <meta property="twitter:image:alt" content="Chillie Haven fresh chillies" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#DE2D16" />
      <meta name="msapplication-TileColor" content="#DE2D16" />
      
      {/* Additional dynamic meta tags */}
      {additionalMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
export default SEO;
