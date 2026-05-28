// src/components/AboutUs.jsx

import '../css/About.css';

const Story = () => {
  return (
    <section className="about">
      
      {/* SECTION TITLE */}
      <h2 className="about-heading">About Us</h2>

      <div className="about-container">

        {/* IMAGE SECTION */}
        <div className="about-image"></div>

        {/* TEXT SECTION */}
        <div className="about-content">

          <h2 className="about-title">
            Trusted Chillie Supplier's Across Nairobi in  Kenya
          </h2>

          <p className="about-text">
            We are a Nairobi-based fresh chilli supplier committed to delivering high-quality, naturally grown chillies straight from local farms.
          </p>

          <p className="about-text">
            Our network covers SouthB, Syokimau, Cabanas, and Embakasi South, ensuring fast and reliable delivery for households and businesses.
            Our goal is to connect customers with naturally grown, fresh, and healthy chilli products sourced directly from local farmers.
          </p>

          <p className="about-text">
         Through fast delivery, affordable pricing, and reliable customer service, we continue to build trust with chilli lovers every day.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Story;