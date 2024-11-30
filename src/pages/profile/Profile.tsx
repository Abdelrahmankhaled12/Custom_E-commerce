import React, { useEffect } from 'react'; // Explicit React import
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { Effect, Footer, Header } from '../../components';
import ProfileBody from './body/ProfileBody';

/**
 * Profile Component
 * Displays the user profile page and redirects unauthenticated users to the home page.
 */

const Profile: React.FC = () => {
  const login = useSelector((state: RootState) => state.login); // Get login state from Redux
  const navigate = useNavigate(); // Initialize navigate function for programmatic navigation

  useEffect(() => {
    // Redirect to home page if user is not logged in
    if (!login.loginStatus) {
      navigate("/");
    } else {
      // Scroll to the top of the page on component mount
      window.scrollTo(0, 0);
    }
  }, [login.loginStatus, navigate]);

  return (
    <Effect>
      <Header />
      <ProfileBody />
      <Footer />
    </Effect>
  );
};

export default Profile;
