import Products from "../components/jsx/Products";
import SEO from '../components/SEO/Seo';

function ProductPage({ cart, setCart }) {
  const baseUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const pageUrl = `${baseUrl}/products`;

  return (
    <>
      <SEO
        title="Fresh Chillies & Spice Products"
        description="Browse Chillie Haven's fresh chilli inventory and spice products with delivery across Nairobi."
        keywords="fresh chilli products, chilli inventory Nairobi, spice products, Chillie Haven delivery"
        ogUrl={pageUrl}
        canonicalUrl={pageUrl}
      />
      <div className="page">
        <Products cart={cart} setCart={setCart} />
      </div>
    </>
  );
}

export default ProductPage;