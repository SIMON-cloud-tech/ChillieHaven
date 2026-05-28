// src/components/Hero.jsx
import { useNavigate } from 'react-router-dom';
import '../css/Hero.css';

const Hero = () => {
   const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-overlay">

        <div className="hero-content">

          {/* MAIN HEADLINE */}
          <h2 className="hero-title">
           Fresh Organic Chillies Delivered Daily
          </h2>

          {/* SUBTEXT */}
          <p className="hero-subtitle">
            We supply fresh, locally sourced chillies to homes and businesses in South B, Syokimau, Pipeline, Embakasi South, and surrounding areas.
          </p>

          <h4 className='marketing_strip'>Fast Delivery • Farm Fresh • Affordable Prices</h4>

          {/* CTA BUTTONS */}
          <div className="hero-cta">

            <button
              className="btn btn-primary"
              onClick={()=> navigate('/products')}
            >
              Get Fresh Chillies
            </button>

            <button
              className="btn btn-secondary"
              onClick={()=> navigate('/contact')}
            >
              Contact Us
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;