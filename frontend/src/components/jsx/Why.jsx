// src/components/WhyUs.jsx

import '../css/Why.css';
import { FaTruck, FaPepperHot, FaMapMarkerAlt } from "react-icons/fa";

const WhyUs = () => {
  return (
    <section className="whyus">

      <div className="whyus-container">

        {/* SECTION TITLE */}
        <h2 className="whyus-heading">
          Why Choose Our Chillies 🌶️
        </h2>

        {/* CARDS */}
        <div className="whyus-grid">

          {/* CARD 1 */}
          <div className="whyus-card">
            <div className="whyus-icon">
              <FaPepperHot />
            </div>
            <h3 className="whyus-title">Fresh Farm Chillies</h3>
            <p className="whyus-description">
              We source chillies directly from farmers for maximum freshness, heat, and flavor.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="whyus-card">
            <div className="whyus-icon">
              <FaTruck />
            </div>
            <h3 className="whyus-title">Fast Nairobi Delivery</h3>
            <p className="whyus-description">
              We deliver quickly across South B, Syokimau, Pipeline, Embakasi South and nearby estates.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="whyus-card">
            <div className="whyus-icon">
              <FaMapMarkerAlt />
            </div>
            <h3 className="whyus-title">Local & Trusted</h3>
            <p className="whyus-description">
              A Nairobi-based chilli supplier trusted by homes, vendors, and small businesses.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
};

export default WhyUs;