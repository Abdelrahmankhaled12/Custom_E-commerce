import React, { useEffect, useState } from 'react';
import { Animation, Effect, Footer, Header } from '../../components';
import BodyCheckout from './body/BodyCheckout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';

/**
 * Checkout Component
 * Handles the checkout process, including layout effects, user authentication check, and main content.
 */

const Checkout: React.FC = () => {
    const login = useSelector((state: RootState) => state.login); // Get login state from Redux
    const navigate = useNavigate(); // Initialize navigate function
    // State to control animation
    const [animationOff, setAnimationOff] = useState(true);

    useEffect(() => {
        // Redirect unauthenticated users to the home page
        if (!login.loginStatus) {
            navigate('/');
        } else {
            // Scroll to the top of the page on component mount
            window.scrollTo(0, 0);
        }
    }, [login.loginStatus, navigate]); // Ensure dependencies are properly tracked



    // useEffect hook to scroll the window to the top when the component mounts
    useEffect(() => {
        animationOFF(); // Trigger animation function on component mount
    }, []);

    // Function to handle animation
    const animationOFF = () => {
        // Set animationOff to false after a delay specified by TimaAnimation constant
        setTimeout(() => {
            setAnimationOff(false);
        }, 1200);
    };

    return (
        <>
            {animationOff ? (
                <Animation />
            ) : (
                login.loginStatus && (
                    <Effect>
                        <Header />
                        <BodyCheckout />
                        <Footer />
                    </Effect>
                )
            )}
        </>
    );
};

export default Checkout;
