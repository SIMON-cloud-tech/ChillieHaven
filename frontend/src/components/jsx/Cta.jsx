// src/components/CTA.jsx
import "../css/cta.css";
import { useNavigate } from 'react-router-dom';
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const CTA = () => {
  const navigate = useNavigate();
  const handleJoinChannel = () => {
    const message = encodeURIComponent(
      "Hey 👋 I’d like to join your WhatsApp updates channel for chilli orders."
    );

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="cta-section">
      <div className="cta-overlay">

        <div className="cta-content">

          {/* HEADING */}
          <h2 className="cta-title">
            Fresh Chillies. Fast Delivery. Real Heat 🌶️
          </h2>

          {/* PARAGRAPH */}
          <p className="cta-text">
            Join thousands of customers getting fresh farm chillies delivered
            directly to South B, Syokimau, Embakasi, Imara Daima and nearby estates.
          </p>

          {/* BUTTONS */}
          <div className="cta-buttons">

            <a href="#products" className="cta-btn cta-btn--primary" onClick={()=> navigate('/products')}>
              Get Fresh Chillies
            </a>

            <button
              className="cta-btn cta-btn--secondary"
              onClick={handleJoinChannel}
            >
              Join WhatsApp Channel
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTA;