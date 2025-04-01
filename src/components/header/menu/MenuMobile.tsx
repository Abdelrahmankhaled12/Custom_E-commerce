
import './style.scss'; // Import SCSS stylesheet for styling
import { faXmark, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // Import close icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import logo from '../../../assets/Logo.png'; // Import logo image
import { useLocation, useNavigate } from "react-router-dom";  // Import hooks from react-router-dom
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface MenuMobileProps {
    isOpenMenu: boolean; // Prop to control the menu visibility
    closeModalMenu: () => void; // Prop to close the menu
}

const MenuMobile: React.FC<MenuMobileProps> = ({ isOpenMenu, closeModalMenu }) => {

    const navigate = useNavigate(); // Initialize navigation
    const login = useSelector((state: RootState) => state.login); // Access login state from Redux
    const path = useLocation();  // Get current location using useLocation hook

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

    // Handle sign out (reload page for now)
    const signOut = () => {
        sessionStorage.setItem('login', "false");
        sessionStorage.setItem("data", JSON.stringify(null));
        window.location.href = "https://caseprep.co/";
    };

    return (
        <>
            <div className={isOpenMenu ? "menu menu_active" : "menu"}>  {/* Conditional class for menu based on isOpenMenu state */}
                <div className="flex">
                    <div style={{ "flex": "1" }} onClick={closeModalMenu}></div>  {/* Clickable area to close menu */}
                    <div className="content">
                        <div>
                            <div>
                                <div className="top">
                                    <div className="logo">
                                        <img src={logo} alt="logo" />
                                    </div>
                                    <button onClick={closeModalMenu}><FontAwesomeIcon icon={faXmark} /></button>  {/* Close button with FontAwesome icon */}
                                </div>
                            </div>
                            {login.loginStatus && (
                                <ul>
                                    <li>Your Profile</li>
                                </ul>
                            )}
                            <div className="buttons">
                                <button onClick={() => handleButtonClick()} aria-label="Start Preparation">
                                    START PREP
                                </button>
                                <button onClick={() => window.location.href = "https://caseprep.co/prepguide/"} aria-label="View Guides">
                                    PREP GUIDE
                                </button>
                            </div>
                        </div>
                        {login.loginStatus && (
                            <div className="footerMenu" onClick={() => signOut()}>
                                <p>Sign Out</p>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuMobile; // Export MenuMobile component as the default export