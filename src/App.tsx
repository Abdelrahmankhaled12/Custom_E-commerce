import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'; // AOS library styles
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // React Router for navigation

// Importing page components
import { Checkout, EmailVerified, Guides, Home, NotFoundPage, Profile, Signup, SuccessPayment } from './pages';
import { GetIP } from './utils';
import { AppDispatch } from './store';
import { useDispatch } from "react-redux";
import { setCountryIPData } from './store/countryIP'
import { setLoginStatus, setUserData } from './store/login';
import 'sweetalert2/src/sweetalert2.scss'
import { setPackage } from './store/package';
import { useSelector } from "react-redux";
import { RootState } from './store';
/**
 * App Component
 * Root component of the application, handling routing and global initializations.
 */
function App() {

  const dispatch: AppDispatch = useDispatch();

  const login = useSelector((state: RootState) => state.login);

  useEffect(() => {
    // Initialize AOS library for scroll animations
    try {
      Aos.init({
        once: true, // Ensures animations trigger only once per element
      });
    } catch (error) {
      console.error('Failed to initialize AOS:', error);
    }

    getDateFromLocal()

    GetIP().then((res) => {
      dispatch(setCountryIPData(res.data))
    })
  }, []);

  const getDateFromLocal = () => {
    // Get the 'login' value from sessionStorage
    const loginStatus = sessionStorage.getItem('login');

    // Check if 'login' is stored and if its value equals "true"
    if (loginStatus === "true") {
      if (!login.loginStatus)
        dispatch(setLoginStatus(true));

      // Get and parse 'data' from sessionStorage
      const userData = sessionStorage.getItem('data');
      const packagee = sessionStorage.getItem('package');

      if (userData) {
        dispatch(setUserData(JSON.parse(userData)));
      }
      if (packagee) {
        dispatch(setPackage(JSON.parse(packagee)))
      }

    }
  };


  return (
    <BrowserRouter basename='/'>
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

        {/* Signup Page */}
        <Route path="/success-payment" element={<SuccessPayment />} />

        {/* Email Verified Page */}
        <Route path="/email-success" element={<EmailVerified />} />

        {/* Guides Page */}
        <Route path="/guides" element={<Guides />} />

        {/* Catch-All for 404 Pages */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
