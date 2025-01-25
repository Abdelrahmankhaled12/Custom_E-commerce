import { useNavigate } from 'react-router-dom';
import { Animation, Effect, Footer, Header } from '../../components';
import './style.scss';  // Importing SCSS stylesheet for styling the component
import { useEffect, useState } from "react"
import image from "../../assets/verified.png"
import { useLocation } from 'react-router-dom';
import { userData } from '../../utils';
import { setLoginStatus, setUserData } from '../../store/login';
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store';


/**
 * NotFoundPage Component
 * This component renders a 404 Not Found page with a message and a button to navigate back to the homepage.
 */
const STORAGE_KEYS = {
    LOGIN: "login",
    DATA: "data",
};

const EmailVerified = () => {
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

    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const login = useSelector((state: RootState) => state.login);

    useEffect(() => {
        window.scrollTo(0, 0);

        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token && !login.loginStatus) {
            getDataUser(token);

            searchParams.delete('token');
            navigate({ pathname: location.pathname, search: searchParams.toString() }, { replace: true });
        }
    }, [location.search, login.loginStatus, navigate]);

    const getDataUser = async (token: string) => {
        try {
            const response = await userData({ token });
            if (!login.loginStatus)
                dispatch(setLoginStatus(true));
            dispatch(setUserData(response.data));
            sessionStorage.setItem(STORAGE_KEYS.LOGIN, "true");
            sessionStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(response.data));
            // navigate("/");
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <>
            {animationOff ? (
                <Animation />
            ) : (
                <Effect>
                    <Header />
                    <div className="emailVerified">
                        <div className='container'>
                            <div className="content">
                                <div className="image">
                                    <img src={image} alt="" />
                                </div>
                                <div className="text">
                                    <h2>Email Verified</h2>
                                    <p>Your email address was successfully verified</p>
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

export default EmailVerified;  