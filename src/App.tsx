import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'; // AOS library styles
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // React Router for navigation

// Importing page components
import { Checkout, Home, NotFoundPage , Profile } from './pages';

/**
 * App Component
 * Root component of the application, handling routing and global initializations.
 */
function App() {
  useEffect(() => {
    // Initialize AOS library for scroll animations
    try {
      Aos.init({
        once: true, // Ensures animations trigger only once per element
      });
    } catch (error) {
      console.error('Failed to initialize AOS:', error);
    }
  }, []);

  return (
    <BrowserRouter>
      {/* Define application routes */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Checkout Page */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Catch-All for 404 Pages */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
