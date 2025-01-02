import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'; // AOS library styles
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // React Router for navigation

// Importing page components
import { Checkout, Home, NotFoundPage, Profile, Signup } from './pages';
import { GetIP } from './utils';
import { AppDispatch } from './store';
import { useDispatch } from "react-redux";
import { setCountryIPData } from './store/countryIP';

/**
 * App Component
 * Root component of the application, handling routing and global initializations.
 */
function App() {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Initialize AOS library for scroll animations
    try {
      Aos.init({
        once: true, // Ensures animations trigger only once per element
      });
    } catch (error) {
      console.error('Failed to initialize AOS:', error);
    }

    GetIP().then((res) => {
      dispatch(setCountryIPData(res.data))
    })
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

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Catch-All for 404 Pages */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
