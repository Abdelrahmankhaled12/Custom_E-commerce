import React, { useState, useRef, useEffect } from 'react';
import './style.scss';

// Testimonials data
const testimonials = [
    {
        text: "Spencer H, Working Professional (US)",
        video: "https://caseprep.co/videos/Spencer.mp4",
    },
    {
        text: "Anvesha D, MBA Student (IIM Bangalore)",
        video: "https://caseprep.co/videos/Anvesha.mp4",
    },
    {
        text: "Yordanka T, MBA Student (Bulgaria)",
        video: "https://caseprep.co/videos/Yordanka.mp4",
    },
    {
        text: "Diego C, Working Professional (US)",
        video: "https://caseprep.co/videos/Diego.mp4",
    },
    {
        text: "Aarushi G, Undergraduate student (India)",
        video: "https://caseprep.co/videos/Aarushi.mp4",
    },
    {
        text: "Maria H, Working Professional (US)",
        video: "https://caseprep.co/videos/Maria.mp4",
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
                setItemsPerPage(4);
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
                    <h1>Here’s what CasePreppers are saying</h1>
                </div>
                <div
                    className="carouselItems"
                    ref={carouselContainer}
                    onScroll={handleScroll}
                >
                    {testimonials.map((item, index) => (
                        <div className="carouselItem" key={index}>
                            <div className="body">
                                <video src={item.video} controls controlsList="nodownload"></video>
                            </div>
                            <div className="footer">
                                <p>{item.text}</p>
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
