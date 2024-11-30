import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setLoginStatus, setUserData } from "../../store/login";
import { useNavigate } from 'react-router-dom';
import './style.scss';
import icon from '../../assets/google.png';

// Firebase configuration (securely load credentials from environment variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface LoginUserProps {
  isOpen: boolean;
  closeModel: () => void;
}

const LoginUser: React.FC<LoginUserProps> = ({ isOpen, closeModel }) => {
  const [email, setEmail] = useState<string>(''); // Email input
  const [password, setPassword] = useState<string>(''); // Password input
  const [error, setError] = useState<string | null>(null); // Error message state
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // Handle Sign-Up
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created successfully!", userCredential.user);
      dispatch(setLoginStatus());
      closeModel();
      navigate("/checkout");
    } catch (err: any) {
      console.error("Error during signup:", err.message);
      setError(err.message); // Set error message for user feedback
    }
  };

  // Handle Google Sign-In
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDetails = {
        id: user.providerData[0]?.uid || '',
        email: user.email,
        name: user.displayName,
        photo: user.photoURL
      };
      dispatch(setUserData(userDetails));
      dispatch(setLoginStatus());
      closeModel();
      navigate("/checkout");
    } catch (error: any) {
      console.error("Error during Google sign-in:", error.message);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className={isOpen ? "loginUser" : "loginUser hide"}>
      <div className="closeModel" onClick={() => { closeModel(); setEmail(""); setPassword(""); setError("") }}></div>
      <div>
        <div className="content">
          <form onSubmit={handleSignUp}>
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>
            {/* Display Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Submit Button */}
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>

          {/* Google Sign-In */}
          <button type="button" className="signGoogle" onClick={signInWithGoogle}>
            <img src={icon} alt="Google Logo" />
            <p>Sign in with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
