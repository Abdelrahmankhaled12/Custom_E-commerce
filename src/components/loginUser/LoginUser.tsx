import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './style.scss';
import icon from '../../assets/google.png';
import { AppDispatch } from "../../store";
import { setLoginStatus, setUserData } from "../../store/login";
import { loginAPi, loginGoogle } from "../../utils/index";

// Firebase configuration (securely load credentials from environment variables)

// Initialize Firebase
interface LoginUserProps {
  isOpen: boolean;
  closeModel: () => void;
  nav: string;
}

const LoginUser: React.FC<LoginUserProps> = ({ isOpen, closeModel, nav }) => {
  const [email, setEmail] = useState<string>(''); // Email input state
  const [password, setPassword] = useState<string>(''); // Password input state
  const [error, setError] = useState<string | null>(null); // Error message state

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  /**
   * Handles form submission for user login
   */

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state

    const response = await loginAPi({ email, password });

    if (response.status === 200) {
      dispatch(setLoginStatus(true));
      dispatch(setUserData(response.data));
      sessionStorage.setItem('login', "true"); 
      sessionStorage.setItem("data", JSON.stringify(response.data));  
      closeModel();
      navigate(nav);
      return;
    }

    if (response.status === 422) {
      setError(response?.message)
      return;
    }

    setError(response?.message)
    return;

  };

  /**
   * Handles Google Sign-In
   */
  const signInWithGoogle = async () => {
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
    <div className={isOpen ? "loginUser" : "loginUser hide"}>
      {/* Overlay for closing the modal */}
      <div
        className="closeModel"
        onClick={() => {
          closeModel();
          setEmail('');
          setPassword('');
          setError(null);
        }}
      ></div>

      <div>
        <div className="content">
          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn">
              Login
            </button>
          </form>

          {/* Sign-Up Link */}
          <p className="account">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>

          <div className="or">Or</div>

          {/* Google Sign-In Button */}
          <button type="button" className="signGoogle" onClick={signInWithGoogle}>
            <img src={icon} alt="Google Logo" />
            <p>Login with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
