import React, { useEffect } from 'react';
import { Effect, Footer, Header } from '../../components'; // Shared layout components
import BannerHero from './banner/BannerHero'; // Hero banner component
import Works from './works/Works'; // Works section component
import Products from './products/Products'; // Products section component
import Testimonials from './testimonials/Testimonials'; // Testimonials section component
import Faqs from './faq/Faqs'; // FAQs section component
import Team from './team/Team'; // Team section component
import Contact from './contact/Contact'; // Contact section component

/**
 * Home Component
 * Represents the home page of the application, including various sections like banner, works, products, etc.
 */
const Home: React.FC = () => {
    useEffect(() => {
        // Scrolls to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

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
