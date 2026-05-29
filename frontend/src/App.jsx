import { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Navbar from './components/jsx/Navbar';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Contact from './pages/Contact';
import Clientele from './pages/Clientele';
import About from './pages/About';
import BlogPage from "./pages/BlogPage";
import Blogs from './pages/Blogs';
import Footer from './components/jsx/Footer'
const App = () => {

  // ✅ GLOBAL CART STATE
  const [cart, setCart] = useState([]);

  return (
    <>
      {/* ✅ ROUTES */}
      <HashRouter>
        <Navbar cart={cart} setCart={setCart} />
      <Routes>
        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} />}
        />
        <Route
          path="/products"
          element={<ProductsPage cart={cart} setCart={setCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clientele" element={<Clientele />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
      </Routes>
      <Footer />
      </HashRouter>
    </>
  );
};

export default App;