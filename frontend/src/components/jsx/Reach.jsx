import { useState, useCallback, memo } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../css/Contact.css';

// ─────────────────────────────────────────────
// 🔧 CONFIG
// ─────────────────────────────────────────────
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '254703433014';

const MAP_EMBED =
  import.meta.env.VITE_MAP_EMBED_URL ||
  'https://www.google.com/maps?q=Embakasi+South+Nairobi&z=11&output=embed';

// ─────────────────────────────────────────────
// 📍 CHILLIE CONTACT DATA
// ─────────────────────────────────────────────
const CONTACT_DETAILS = [
    {
    id: 'location',
    label: 'Location',
    value: 'Nairobi East (South B • Syokimau • Embakasi)',
    href: 'https://maps.google.com/?q=South+B+Nairobi',
    icon: <FaMapMarkerAlt />,
  },
  {
    id: 'phone',
    label: 'Phone / WhatsApp',
    value: '+254 703 433 014',
    href: 'tel:+254703433014',
    icon: <FaPhone />,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'chilliehaven@gmail.com',
    href: 'mailto:chilliehaven@gmail.com',
    icon: <FaEnvelope />,
  },
  {
    id: 'website',
    label: 'Website',
    value: 'www.chilliehaven.com',
    href: 'https://chilliehaven.com',
    icon: <FaMapMarkerAlt />
  }
];

const WORKING_HOURS = [
  { day: 'Monday – Friday', hours: '7:00 AM – 7:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

// ─────────────────────────────────────────────
// 🧩 ROW
// ─────────────────────────────────────────────
const DetailRow = memo(({ icon, label, value, href }) => (
  <a href={href} className="detail-row" target="_blank" rel="noopener noreferrer">
    <span className="detail-row__icon">{icon}</span>
    <span>
      <strong>{label}</strong>
      <p>{value}</p>
    </span>
  </a>
));

const EMPTY_FORM = { name: '', phone: '', email: '', message: '' };

const Reach = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback((e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

const text = `
Hi 👋

Hope you're well. I’m looking to get some fresh chillies.

My details:
• Name: ${form.name}
• Phone: ${form.phone}
• Email: ${form.email || 'N/A'}

I need:
${form.message}

I’m based around South B / Syokimau area but you can deliver to:
Pipeline, Tassia, Donholm, Embakasi South, Imara Daima or JKIA area.

Please let me know:
✔ Availability  
✔ Price  
✔ Delivery time  

Looking forward to your reply 🌶️
`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    setSubmitted(true);
    setForm(EMPTY_FORM);
    setTimeout(() => setSubmitted(false), 3000);
  }, [form]);

  return (
    <section className="contact-section">

      {/* HEADER */}
      <div className="contact-header">
        <h2 className="contact-title">Get Fresh Chillies</h2>
        <p className="contact-subtitle">
          Order fresh farm chillies directly in Nairobi East. Fast delivery within hours.
        </p>
      </div>

      {/* BODY */}
      <div className="contact-body">

        {/* LEFT */}
        <div className="contact-left">
          <h3>Contact & Delivery Info</h3>

          <div>
            {CONTACT_DETAILS.map(d => (
              <DetailRow key={d.id} {...d} />
            ))}
          </div>

          <div className="hours-card">
            <h4>Delivery Hours</h4>
            {WORKING_HOURS.map(w => (
              <p key={w.day}>{w.day}: {w.hours}</p>
            ))}
          </div>

          <div className="delivery-areas">
            <h4>We Deliver To:</h4>
            <p>South B • Syokimau • Pipeline • Tassia • Donholm • Embakasi South • Imara Daima • JKIA</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <h3>Place Your Order</h3>

          {submitted && (
            <p className="success">WhatsApp opened — complete your order 🌶️</p>
          )}

          <form onSubmit={handleSubmit} className='contact-form'>
            <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
            <textarea name="message" placeholder="What chillies do you need?" value={form.message} onChange={handleChange} required />

            <button type="submit">
              Order on WhatsApp 🌶️
            </button>
          </form>
        </div>

      </div>

      {/* MAP */}
      <div className="contact-map">
        <iframe src={MAP_EMBED} title="Delivery Area Map" loading="lazy" />
      </div>

    </section>
  );
};

export default Reach;