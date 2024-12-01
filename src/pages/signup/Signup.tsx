import './style.scss';
import { useEffect, useState } from 'react';
import cover from '../../assets/Sign up-cuate.svg';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Animation, Effect, LoginUser } from '../../components';
import icon from '../../assets/google.png';
import { useNavigate } from 'react-router-dom';
import { register } from '../../utils/register';

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [done, setDone] = useState<boolean>(false);
    const [animation, setAnimation] = useState<boolean>(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [error, setError] = useState<string | null>(null); // State for error messages

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            setError('Password must be at least 6 characters.');
            return;
        }

        try {
            const response = await register({ firstName, lastName, email, password });
            console.log('Registration successful:', response);
            setAnimation(true);
            animationOFF();
            setDone(true);
        } catch (err) {
            console.error('Registration error:', err);
            setError('Registration failed. Please try again.');
        }
    };

    const animationOFF = () => {
        setTimeout(() => {
            setAnimation(false);
        }, 1500);
    };

    const handleGoogleLogin = () => {
        console.log('Google login triggered');
        // Add Google login logic here
    };

    return (
        <Effect>
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
                                        <div className="logo" onClick={() => navigate('/')}>
                                            <img src={logo} alt="Logo" />
                                        </div>
                                        <div className="text">
                                            <h2>
                                                Welcome to <span onClick={() => navigate('/')}>BRAINWORKS</span> 👋
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
                                            <button type="button" className="submit" onClick={submit}>
                                                Sign up
                                            </button>
                                        </form>
                                        <p className="account">
                                            Already have an account? <span onClick={() => setIsOpenLogin(true)}>Login</span>
                                        </p>
                                        <div className="or">Or</div>
                                        <button type="button" className="signGoogle" onClick={handleGoogleLogin}>
                                            <img src={icon} alt="Google Logo" />
                                            <p>Login with Google</p>
                                        </button>
                                    </>
                                ) : (
                                    <div className="steps">
                                        <h3>Thank you for registering with us. Please follow the steps below:</h3>
                                        <div className="step">
                                            <div className="icon">
                                                <FontAwesomeIcon icon={fa1} />
                                            </div>
                                            <p>Confirm your email via Gmail.</p>
                                        </div>
                                        <div className="step">
                                            <div className="icon">
                                                <FontAwesomeIcon icon={fa2} />
                                            </div>
                                            <p>
                                                After approval, you will be taken directly to the main page to select your package.
                                            </p>
                                        </div>
                                        <div className="step">
                                            <div className="icon">
                                                <FontAwesomeIcon icon={fa3} />
                                            </div>
                                            <p>After selecting a package, log in using your email.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Login Modal */}
            <LoginUser isOpen={isOpenLogin} closeModel={() => setIsOpenLogin(false)} nav="/" />
        </Effect>
    );
};

export default Signup;