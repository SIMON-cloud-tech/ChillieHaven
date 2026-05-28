// App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Hero from './components/jsx/Hero.jsx';

const App = () => {
  // ✅ single source of truth — cart lives here
  const [cart, setCart] = useState([]);

  return (
    <>
      <Navbar cart={cart} setCart={setCart} />   {/* icon + drawer */}
      <Hero />
      <About />
      <How-it-works />
      <Products cart={cart} setCart={setCart} /> {/* add to cart */}
      <Contact />
      <Why />
      <Cta />
      <Footer />
    </>
  );
};

export default App;