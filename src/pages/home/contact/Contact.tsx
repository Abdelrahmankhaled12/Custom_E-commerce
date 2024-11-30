// Import FontAwesome icons for social and contact information
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
// Import custom styles
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Define the Contact component
const Contact = () => {
    return (
        <section className="contact"> {/* Main container for the Contact section */}
            <div className="container"> {/* Wrapper to center and define layout */}
                <div className="grid">
                    <div className="partOne" data-aos="fade-left" data-aos-delay="100" data-aos-duration="800">
                        <h1>Let’s Get in Touch</h1> {/* Title for the section */}
                        <p>
                            {/* Short description */}
                            Get in Touch with Us for Expert Agricultural Solutions, Personalized Support, and Innovative Strategies.
                        </p>
                        <div className="social"> {/* Contact details with icons */}
                            <div className="box"> {/* Email box */}
                                <div className="icon">
                                    <FontAwesomeIcon icon={faEnvelope} /> {/* Email icon */}
                                </div>
                                <p>caseprep@gmail.com</p> {/* Email address */}
                            </div>
                            <div className="box"> {/* Phone box */}
                                <div className="icon">
                                    <FontAwesomeIcon icon={faPhone} /> {/* Phone icon */}
                                </div>
                                <p>+1 (123) 456 - 789</p> {/* Phone number */}
                            </div>
                            <div className="box"> {/* Location box */}
                                <div className="icon">
                                    <FontAwesomeIcon icon={faLocationDot} /> {/* Location icon */}
                                </div>
                                <p>794 McCallister St, San Francisco, 94102</p> {/* Address */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Export the Contact component for use in other parts of the application
export default Contact;
