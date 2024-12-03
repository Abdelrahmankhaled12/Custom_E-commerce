import React, { useEffect } from 'react';
import { Effect, Footer, Header } from '../../components'; // Shared layout components
import BannerHero from './banner/BannerHero'; // Hero banner component
import Works from './works/Works'; // Works section component
import Products from './products/Products'; // Products section component
import Testimonials from './testimonials/Testimonials'; // Testimonials section component
import Faqs from './faq/Faqs'; // FAQs section component
import Team from './team/Team'; // Team section component
import Contact from './contact/Contact'; // Contact section component
import { useLocation } from 'react-router-dom';
import { userData } from '../../utils';
import { setLoginStatus, setUserData } from '../../store/login';
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

/**
 * Home Component
 * Represents the home page of the application, including various sections like banner, works, products, etc.
 */
const Home: React.FC = () => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const login = useSelector((state: RootState) => state.login); // Access login state from Redux

    useEffect(() => {
        // Scrolls to the top of the page when the component mounts
        window.scrollTo(0, 0);

        // Extract token from the query string
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        // Fetch user data if token exists
        if (token && !login.loginStatus) {
            getDataUser(token);
        }
    }, [location.search]); // Re-run effect if the query string changes

    /**
     * Fetches user data using the provided token
     * @param token - Authentication token
     */

    const getDataUser = async (token: string) => {
        try {
            const response = await userData({ token });
            dispatch(setLoginStatus());
            dispatch(setUserData(response.data));
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            // Optionally, handle user feedback for failed login
        }
    };

    return (
        <Effect>
            {/* Page Header */}
            <Header />

            {/* Hero Banner Section */}
            <BannerHero />

            {/* Works Section */}
            <Works />

            {/* Products Section */}
            <Products />

            {/* Testimonials Section */}
            <Testimonials />

            {/* FAQs Section */}
            <Faqs />

            {/* Team Section */}
            <Team />

            {/* Contact Section */}
            <Contact />

            {/* Footer Section */}
            <Footer />
        </Effect>
    );
};

export default Home;
