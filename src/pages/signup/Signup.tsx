import './style.scss';
import { useEffect, useState } from 'react';
import cover from '../../assets/Sign up-cuate.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Animation, Effect, Footer, Header, LoginUser, Spinner } from '../../components';
import icon from '../../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { loginGoogle, register } from '../../utils/index';

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [done, setDone] = useState<boolean>(false);
    const [animation, setAnimation] = useState<boolean>(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [error, setError] = useState<string | null>(null); // State for error messages
    // State to control animation
    const [animationOff, setAnimationOff] = useState(true);
    const [spinnerRun, setSpinnerRun] = useState<boolean>(false); // Spinner state

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // useEffect hook to scroll the window to the top when the component mounts
    useEffect(() => {
        animationOFFPage(); // Trigger animation function on component mount
    }, []);

    // Function to handle animation
    const animationOFFPage = () => {
        // Set animationOff to false after a delay specified by TimaAnimation constant
        setTimeout(() => {
            setAnimationOff(false);
        }, 1200);
    };

    // Validate inputs and register user
    const submit = async () => {
        setError(null);

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {

            setError('All fields are required.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 8 characters.');
            return;
        }
        setSpinnerRun(true); // Show spinner during API call

        const response = await register({ f_name: firstName, l_name: lastName, email, password });
        if (response.message === "This email already exists.") {
            setSpinnerRun(false); // Hide spinner after API call
            setError('Email is already registered with us. Try Signing in.');
            return;
        }
        if (response.status === 200) {
            setSpinnerRun(false); // Hide spinner after API call
            setAnimation(true);
            animationOFF();
            setDone(true);
        }
    };

    const animationOFF = () => {
        setTimeout(() => {
            setAnimation(false);
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await loginGoogle();
            if (response) {
                window.location.href = response?.url; // Redirect to Google authentication
            } else {
                setError("Failed to initiate Google Sign-In. Please try again.");
            }
        } catch (err: any) {
            setError("An error occurred during Google Sign-In. Please try again.");
        }
    };

    return (
        <>
            {animationOff ? (
                <Animation />
            ) : (
                <Effect>
                    <Header />
                    <div className="signup">
                        <div className="logInContent grid">
                            <div className="image">
                                <img src={cover} alt="Cover" />
                            </div>
                            <div className="form">
                                {animation ? (
                                    <div className="loading">
                                        <Animation />
                                    </div>
                                ) : (
                                    <div>
                                        {!done ? (
                                            <>
                                                <div className="text">
                                                    <h2>
                                                        Signup to <span onClick={() => navigate('/')}>CASEPREP</span> 👋
                                                    </h2>
                                                    <p>Please sign up to your account and start the adventure</p>
                                                </div>
                                                <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className="div">
                                                        <div className="icon">
                                                            <FontAwesomeIcon icon={faUser} />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="First Name"
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            value={firstName}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="div">
                                                        <div className="icon">
                                                            <FontAwesomeIcon icon={faUser} />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Last Name"
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            value={lastName}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="div">
                                                        <div className="icon">
                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Email"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={email}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="div">
                                                        <div className="icon">
                                                            <FontAwesomeIcon icon={faLock} />
                                                        </div>
                                                        <input
                                                            type="password"
                                                            placeholder="Password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            value={password}
                                                            required
                                                        />
                                                    </div>
                                                    {/* Display Error Messages */}
                                                    {error && <p className="error-message">{error}</p>}
                                                    {!spinnerRun ? (
                                                        <button type="button" className="submit" onClick={submit}>
                                                            Sign up
                                                        </button>
                                                    ) : (
                                                        <Spinner />
                                                    )}

                                                </form>
                                                <p className="account">
                                                    Already have an account? <span onClick={() => setIsOpenLogin(true)}>Login</span>
                                                </p>
                                                <div className="or">Or</div>
                                                <button type="button" className="signGoogle" onClick={handleGoogleLogin}>
                                                    <img src={icon} alt="Google Logo" />
                                                    <p>Signup with Google</p>
                                                </button>
                                            </>
                                        ) : (
                                            <div className="steps">
                                                <h3>Thank you for registering with <span>CasePrep.</span> We've sent a verification link to you at {email}. Please verify your email to begin your journey.</h3>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                    {/* Login Modal */}
                    <LoginUser isOpen={isOpenLogin} closeModel={() => setIsOpenLogin(false)} nav="/" />
                </Effect>
            )}
        </>
    );
};

export default Signup;
