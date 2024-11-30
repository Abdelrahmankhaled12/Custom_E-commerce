// Import the associated styles
import './style.scss';

// Functional component for the banner/hero section
const BannerHero = () => {
    return (
        <div className="herobanner"> {/* Main wrapper for the hero banner */}
            <div className="container"> {/* Wrapper for layout and centering */}
                {/* Content with animation using AOS */}
                <div data-aos="fade-left" data-aos-delay="100" data-aos-duration="800">
                    <h1>Get Started</h1> {/* Main heading */}
                    <p>
                        {/* Description paragraph */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ipsa dolore? Fugit quaerat omnis accusamus doloremque voluptas nulla, assumenda necessitatibus, fugiat hic natus enim dolor rem, iure magni doloribus tenetur?
                    </p>
                </div>
            </div>
        </div>
    );
};

// Export the component as the default export
export default BannerHero;
