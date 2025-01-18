import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import logo from '../../assets/Logo.png';
import ProfileUser from './profileUser/ProfileUser';
import './style.scss';

/**
 * Header Component
 * Displays the main navigation header with a logo, navigation buttons, and user profile.
 */

const Header: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation
  const login = useSelector((state: RootState) => state.login); // Access login state from Redux

  const handleButtonClick = () => {
    const section = document.getElementById("works");
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="header"> {/* Main header container */}
      <div className="container"> {/* Wrapper for layout and centering */}
        <div className="flex"> {/* Flex container for aligning items */}
          {/* Logo section */}
          <div
            className="image"
            onClick={() => navigate('/')} // Navigate to home on logo click
            role="button"
            tabIndex={0}
            aria-label="Navigate to home"
            onKeyPress={(e) => e.key === 'Enter' && navigate('/')}
          >
            <img src={logo} alt="Logo" /> {/* Logo with alt text for accessibility */}
          </div>

          {/* Navigation buttons */}
          <div className="buttons">
            <button onClick={() => handleButtonClick()} aria-label="Start Preparation">
              START PREP
            </button>
            <button onClick={() => navigate('/guides')} aria-label="View Guides">
              GUIDES
            </button>
            {/* Display profile or login options based on login status */}
            {login.loginStatus && (
              <ProfileUser />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
