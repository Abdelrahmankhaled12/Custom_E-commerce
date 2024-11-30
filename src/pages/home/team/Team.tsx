// Import FontAwesome icons for social links
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import team member images
import member from '../../../assets/member_1.png';
import member2 from '../../../assets/member_2.png';
import member3 from '../../../assets/member_3.png';
import member4 from '../../../assets/member_4.png';
// Import custom styles
import './style.scss';
// Import specific FontAwesome brand icons
import { faLinkedinIn, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

// Array containing team member data
const items = [
    {
        image: member,
        name: 'Jhon Wick', // Name of the team member
        position: "Co-Founder" // Position of the team member
    },
    {
        image: member2,
        name: 'Brenda Anlex',
        position: "Marketing"
    },
    {
        image: member3,
        name: 'Jonath Dark',
        position: "UI/UX Developer"
    },
    {
        image: member4,
        name: 'Anna Jony',
        position: "Development"
    },
];

// Define the Team component
const Team = () => {
    return (
        <div className='team'> {/* Main container for the "Team" section */}
            <div className="container"> {/* Wrapper to center and define layout */}
                {/* Section title */}
                <div className="title" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                    <p>Our Team</p> {/* Subtitle */}
                    <h1>Team Members</h1> {/* Main title */}
                </div>
                <div className="members" > {/* Container for all team members */}
                    {
                        // Map through the team members array and render each member's card
                        items.map((item, index) => (
                            <div className="member" key={index} data-aos="fade-up" data-aos-delay={(index + 1 ) * 100} data-aos-duration="800"> {/* Individual member card */}
                                <div className="image"> {/* Member's image container */}
                                    <img src={item.image} alt={`${item.name}`} />
                                    {/* Added descriptive alt text for better accessibility */}
                                </div>
                                <div className="text"> {/* Member's name and position */}
                                    <h2>{item.name}</h2> {/* Member's name */}
                                    <p>{item.position}</p> {/* Member's position */}
                                </div>
                                <div className="links"> {/* Social media links */}
                                    <a className="link" target='_blank' rel="noopener noreferrer" href="#">
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </a>
                                    <a className="link" target='_blank' rel="noopener noreferrer" href="#">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                    <a className="link" target='_blank' rel="noopener noreferrer" href="#">
                                        <FontAwesomeIcon icon={faXTwitter} />
                                    </a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

// Export the Team component for use in other parts of the application
export default Team;
