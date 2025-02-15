// Import FontAwesome icons for social and contact information
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// Import custom styles
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Define the Contact component
const Contact = () => {
    return (
        <section className="contact"> 
            <div className="container"> 
                <div className="grid">
                    <div className="partOne" data-aos="fade-left" data-aos-delay="100" data-aos-duration="800">
                        <h1>Get in Touch</h1> 
                        <p>
                            If you’re looking to get a bulk deal for your college, drop us an email at
                        </p>
                        <div className="social"> 
                            <div className="box"> 
                                <div className="icon">
                                    <FontAwesomeIcon icon={faEnvelope} /> 
                                </div>
                                <p> start@caseprep.co</p> 
                            </div>
                        </div>
                        <p>
                            For any queries or support, write to us at
                        </p>
                        <div className="social"> 
                            <div className="box">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faEnvelope} /> 
                                </div>
                                <p>support@caseprep.co</p> 
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
