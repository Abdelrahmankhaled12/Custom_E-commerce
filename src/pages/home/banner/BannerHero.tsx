// Import the associated styles
import './style.scss';

// Functional component for the banner/hero section
const BannerHero = () => {
    return (
        <div className="herobanner"> {/* Main wrapper for the hero banner */}
            <div className="container"> {/* Wrapper for layout and centering */}
                {/* Content with animation using AOS */}
                <div data-aos="fade-left" data-aos-delay="100" data-aos-duration="800">
                    <h1>Your AI Coach to Ace Consulting Case Interviews</h1> {/* Main heading */}
                    <p>
                        {/* Description paragraph */}
                        Practice live, AI-driven mock interviews anytime, get real-time feedback, and land your dream consulting job.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Export the component as the default export
export default BannerHero;
