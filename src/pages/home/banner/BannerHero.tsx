// Import the associated styles
import './style.scss';

// Functional component for the banner/hero section
const BannerHero = () => {
    return (
        <div className="herobanner"> {/* Main wrapper for the hero banner */}
            <div className="container"> {/* Wrapper for layout and centering */}
                {/* Content with animation using AOS */}
                <div data-aos="fade-left" data-aos-delay="100" data-aos-duration="800">
                    <h1>Your Personal Coach for Consulting Case Interviews</h1> {/* Main heading */}
                    <p>
                        {/* Description paragraph */}

                        Practice live, video-based mock interviews anytime, get real-time performance feedback, and crack your MBB and top consulting firm interviews with confidence.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Export the component as the default export
export default BannerHero;
