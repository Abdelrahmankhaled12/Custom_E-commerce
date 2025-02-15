import React, { useEffect, useState } from 'react'; // Explicit React import
import { Animation, Effect,  Header } from '../../components';
import GuidesBody from './guidesBody/GuidesBody';

/**
 * Profile Component
 * Displays the user profile page and redirects unauthenticated users to the home page.
 */

const Guides: React.FC = () => {
    // State to control animation
    const [animationOff, setAnimationOff] = useState(true);

    // useEffect hook to scroll the window to the top when the component mounts
    useEffect(() => {
        // Scroll to the top of the page on component mount
        window.scrollTo(0, 0);
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
            {
                animationOff ? (
                    <Animation />
                ) : (
                    <Effect>
                        <Header />
                        <GuidesBody />
                    </Effect>
                )
            }
        </>

    );
};

export default Guides;
