import React, { useState, useRef, useEffect } from 'react';
import './style.scss';

import user from '../../../assets/testimonials_1.png';
import user2 from '../../../assets/testimonials_2.png';
import user3 from '../../../assets/testimonials_3.png';
import user4 from '../../../assets/testimonials_4.png';
import user5 from '../../../assets/testimonials_5.png';
import user6 from '../../../assets/testimonials_6.png';

// Testimonials data
const testimonials = [
    {
        quote: "Really good design/documentation, pretty much everything is nicely setup. Support team is very responsive to problems. Highly recommended to everyone! I’m your fan already",
        name: "Andreea Gilbert",
        title: "CEO / XYZ Company",
        image: user,
    },
    {
        quote: "This is an example page. It’s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes).",
        name: "Alejandra Blend",
        title: "Managing Director RRC Co.",
        image: user2,
    },
    {
        quote: "Highly recommended to everyone! I’m your fan already. Really good design/documentation, pretty much everything is nicely setup. Support team is very responsive to problems.",
        name: "Adam Jonathon",
        title: "CEO, Tech Company",
        image: user3,
    },
    {
        quote: "Really good design/documentation, pretty much everything is nicely setup. Support team is very responsive to problems. Highly recommended to everyone! I’m your fan already",
        name: "Andreea Gilbert",
        title: "CEO / XYZ Company",
        image: user4,
    },
    {
        quote: "This is an example page. It’s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes).",
        name: "Alejandra Blend",
        title: "Managing Director RRC Co.",
        image: user5,
    },
    {
        quote: "Highly recommended to everyone! I’m your fan already. Really good design/documentation, pretty much everything is nicely setup. Support team is very responsive to problems.",
        name: "Adam Jonathon",
        title: "CEO, Tech Company",
        image: user6,
    },
];

const Testimonials: React.FC = () => {
    const carouselContainer = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    // Update items per page based on screen size
    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth > 1024) {
                setItemsPerPage(3);
            } else if (window.innerWidth > 768) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };

        // Debounce resize handler for performance
        const handleResize = () => {
            clearTimeout((handleResize as any).timer);
            (handleResize as any).timer = setTimeout(updateItemsPerPage, 150);
        };

        window.addEventListener('resize', handleResize);
        updateItemsPerPage();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScroll = () => {
        const container = carouselContainer.current;
        if (!container) return;

        const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
        setCurrentIndex(newIndex);
    };

    return (
        <div className="testimonials" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
            <div className="container">
                <div className="title">
                    <h1>Our Happy Customers</h1>
                    <p>Words of praise by our valuable customers</p>
                </div>
                <div
                    className="carouselItems"
                    ref={carouselContainer}
                    onScroll={handleScroll}
                >
                    {testimonials.map((item, index) => (
                        <div className="carouselItem" key={index}>
                            <div className="body">
                                <p>{item.quote}</p>
                            </div>
                            <div className="footer">
                                <div className="image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="text">
                                    <h2>{item.name}</h2>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="indicators">
                    {Array(Math.ceil(testimonials.length / itemsPerPage))
                        .fill(null)
                        .map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => {
                                    const container = carouselContainer.current;
                                    if (!container) return;

                                    const scrollAmount = index * container.offsetWidth;
                                    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                                    setCurrentIndex(index);
                                }}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
