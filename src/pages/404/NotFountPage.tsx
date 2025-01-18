import { useNavigate } from 'react-router-dom';
import { Animation, Effect, Footer, Header } from '../../components';
import './style.scss';  // Importing SCSS stylesheet for styling the component
import { useEffect, useState } from "react"
/**
 * NotFoundPage Component
 * This component renders a 404 Not Found page with a message and a button to navigate back to the homepage.
 */


const NotFoundPage = () => {
    const navigate = useNavigate();  // Initializing navigate function from useNavigate hook
    // State to control animation
    const [animationOff, setAnimationOff] = useState(true);

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
                <Effect>  
                    <Header />
                    <div className="notFoundPage">
                        <div className='container'>
                            <div className="content">
                                <h1>404</h1>  {/* 404 error code */}
                                <div className="text">
                                    <h2>Nothing to see here!</h2>
                                    <p>The page you are looking for may have been moved or no longer exists, if you wish you can return to our home page.</p>
                                    <button onClick={() => navigate("/")}>
                                        Home Page
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </Effect>
            )}
        </>
    );
};

export default NotFoundPage;  // Exporting NotFoundPage component as the default export