import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";  // Import hooks from react-router-dom
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import logo from '../../assets/Logo.png';
import ProfileUser from './profileUser/ProfileUser';
import './style.scss';
import MenuMobile from './menu/MenuMobile';
import icon from "../../assets/user.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Importing FontAwesomeIcon from FontAwesome library
import { faBars } from '@fortawesome/free-solid-svg-icons';  // Importing icons from FontAwesome library
/**
 * Header Component
 * Displays the main navigation header with a logo, navigation buttons, and user profile.
 */

const Header: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation
  const login = useSelector((state: RootState) => state.login); // Access login state from Redux
  const path = useLocation();  // Get current location using useLocation hook
  const [isOpenMenu, setIsOpenMenu] = useState(false);  // State to manage mobile menu visibility

  const handleButtonClick = () => {
    const section = document.getElementById("works");
    if (path.pathname === "/") {
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate("/")
    }
  };

  const userPhoto = login.userData?.photo || icon; // Fallback for missing photo

  return (
    <>
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
              <button onClick={() => window.location.href = "https://caseprep.co/prepguide/"} aria-label="View Guides">
                PREP GUIDE
              </button>
              {/* Display profile or login options based on login status */}
              {login.loginStatus && (
                <ProfileUser />
              )}
            </div>
            <div className="mboileBar">
              {login.loginStatus && (
                <div className="image">
                  <img src={userPhoto} alt="User Profile" />
                </div>
              )}
              <div className="icon" onClick={() => setIsOpenMenu(true)}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <MenuMobile isOpenMenu={isOpenMenu} closeModalMenu={() => setIsOpenMenu(false)} /> {/* Mobile menu component  */}

    </>

  );
};

export default Header;
