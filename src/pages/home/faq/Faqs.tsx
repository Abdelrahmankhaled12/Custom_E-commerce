import React, { useState } from 'react';
import './style.scss';

const items = [
    {
        question: 'How do I upgrade / downgrade my workspace plan?',
        answer:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dolor. Molestiae itaque totam qui non assumenda sed dolorum odio architecto illum, iste quia maiores voluptas molestias tempora ex commodi eum.',
    },
    {
        question: 'Can I add other information to an invoice?',
        answer:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dolor. Molestiae itaque totam qui non assumenda sed dolorum odio architecto illum, iste quia maiores voluptas molestias tempora ex commodi eum.',
    },
    {
        question: 'When should I use a new table vs. a view?',
        answer:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dolor. Molestiae itaque totam qui non assumenda sed dolorum odio architecto illum, iste quia maiores voluptas molestias tempora ex commodi eum.',
    },
    {
        question: 'How can I transfer data from one base to another?',
        answer:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dolor. Molestiae itaque totam qui non assumenda sed dolorum odio architecto illum, iste quia maiores voluptas molestias tempora ex commodi eum.',
    },
    {
        question: 'How do I change my account email address?',
        answer:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dolor. Molestiae itaque totam qui non assumenda sed dolorum odio architecto illum, iste quia maiores voluptas molestias tempora ex commodi eum.',
    },
];

/**
 * Faqs Component
 * Displays a list of frequently asked questions with expandable panels.
 */
const Faqs: React.FC = () => {
    // State to track the index of the currently active accordion
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    /**
     * Toggles the accordion panel.
     * @param index - The index of the clicked accordion.
     */
    const toggleAccordion = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="faqs">
            <div className="container">
                <h1>Frequently Asked Questions</h1>
                <div className="content">
                    {items.map((item, index) => (
                        <div key={index} className="accordion-item">
                            {/* Accordion Button */}
                            <button
                                className={`accordion ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                {item.question}
                            </button>
                            {/* Accordion Panel */}
                            <div
                                className="panel"
                                style={{
                                    maxHeight: activeIndex === index ? '200px' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.3s ease-out',
                                    marginBottom: activeIndex === index ? '10px' : '0',
                                    padding: activeIndex === index ? '10px 18px' : '0px 18px',
                                }}
                            >
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faqs;
