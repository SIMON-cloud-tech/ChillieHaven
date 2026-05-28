import { useState, useEffect, memo } from 'react';
import {
  FaSeedling,
  FaShoppingBasket,
  FaTruck
} from 'react-icons/fa';

import '../css/How.css';

/* ─────────────────────────────────────────────
   ICON COMPONENTS (PURE REACT ICONS)
───────────────────────────────────────────── */
const ICONS = {
  FaSeedling: FaSeedling,
  FaShoppingBasket: FaShoppingBasket,
  FaTruck: FaTruck,
};

/* ─────────────────────────────────────────────
   COLOR MAPPING FOR STEPS
───────────────────────────────────────────── */
const STEP_COLORS = {
  'Choose Your Chillies': 'green',      // Step 1 - Green
  'Place Your Order': 'yellow',         // Step 2 - Yellow
  'Fast Delivery': 'green',             // Step 3 - Green
};

/* ─────────────────────────────────────────────
   SINGLE CARD
───────────────────────────────────────────── */
const StepCard = memo(({ icon, title, description, index }) => {

  const IconComponent = ICONS[icon];
  const iconColor = STEP_COLORS[title] || 'green';

  return (
    <article
      className="step-card"
      style={{ animationDelay: `${index * 120}ms` }}
    >

      {/* ICON */}
      <div 
        className="step-card__icon" 
        data-color={iconColor}
        aria-hidden="true"
      >
        {IconComponent && <IconComponent />}
      </div>

      {/* NUMBER */}
      <span className="step-card__number">
        0{index + 1}
      </span>

      {/* TITLE */}
      <h3 className="step-card__title">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="step-card__desc">
        {description}
      </p>

    </article>
  );
});

StepCard.displayName = 'StepCard';

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const How = () => {

  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    import('../../data/How.json')
      .then(module => {
        setSteps(module.default.slice(0, 3));
      })
      .catch(() => {
        setError('Could not load content.');
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  /* LOADING */
  if (loading) {
    return (
      <section className="hiw-section" aria-busy="true">
        <div className="hiw-skeleton-grid">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="hiw-skeleton-card"
            />
          ))}
        </div>
      </section>
    );
  }

  /* ERROR */
  if (error) {
    return (
      <section className="hiw-section">
        <p className="hiw-error">{error}</p>
      </section>
    );
  }

  /* RENDER */
  return (
    <section
      className="hiw-section"
      aria-labelledby="hiw-heading"
    >

      {/* HEADER */}
      <div className="hiw-header">

        <h2
          id="hiw-heading"
          className="hiw-title"
        >
          How It Works
        </h2>

        <p className="hiw-subtitle">
          Getting fresh chillies delivered to your door has never been simpler.
          Three steps is all it takes — from browsing to doorstep.
        </p>

      </div>

      {/* GRID */}
      <div className="hiw-grid" role="list">

        {steps.map((step, i) => (
          <StepCard
            key={step.id}
            index={i}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}

      </div>

    </section>
  );
};

export default How;