// Import the associated styles
import './style.scss';

// Functional component for the footer
const Footer = () => {
    return (
        <footer> {/* Main footer container */}
            <div className="container"> {/* Wrapper for layout and centering */}
                <div className="flex"> {/* Flex container for organizing content */}
                    <h3>
                        {/* Copyright text */}
                        Copyrights © 2024 <span>CasePrep</span> | All Rights Reserved
                    </h3>
                    <div className="links"> {/* Links to footer policies */}
                        <a href="#">TERMS & CONDITIONS</a>
                        <a href="#">REFUND POLICY</a>
                        <a href="#">PRIVACY POLICY</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Export the component as the default export
export default Footer;
