import { useState } from 'react';
import './style.scss';

interface Link {
    text: string;
    href: string;
}

interface Subsection {
    title: string;
    links: Link[];
}

interface Section {
    title: string;
    subsections: Subsection[];
}

const GuidesBody = () => {
    const [expandedBox, setExpandedBox] = useState<number | null>(null);

    const handleBoxClick = (index: number) => {
        setExpandedBox(expandedBox === index ? null : index);
    };

    const sections: Section[] = [
        {
            title: "I am a UG Student Aspiring for Consulting",
            subsections: [
                {
                    title: "Step 1: Understand Consulting",
                    links: [
                        { text: "1: What is Consulting?🤔", href: "example_guide.html" },
                        { text: "2: Is Consulting Right for Me?", href: "#" },
                        { text: "3: What do Consulting Firms Look for in UGs?", href: "#" },
                    ],
                },
                {
                    title: "Step 2: Build Your Profile",
                    links: [
                        { text: "Subsection 1.3", href: "#" },
                        { text: "Subsection 1.4", href: "#" },
                    ],
                },
                {
                    title: "Step 3: Mastering the Case Interview",
                    links: [
                        { text: "Subsection 1.3", href: "#" },
                        { text: "Subsection 1.4", href: "#" },
                    ],
                },
                {
                    title: "Step 4: Applying for Roles",
                    links: [
                        { text: "Subsection 1.3", href: "#" },
                        { text: "Subsection 1.4", href: "#" },
                    ],
                },
            ],
        },
        {
            title: "I am a PG Student Aspiring for Consulting",
            subsections: [
                {
                    title: "Basic Features",
                    links: [
                        { text: "Subsection 2.1", href: "#" },
                        { text: "Subsection 2.2", href: "#" },
                    ],
                },
                {
                    title: "Additional Features",
                    links: [
                        { text: "Subsection 2.3", href: "#" },
                        { text: "Subsection 2.4", href: "#" },
                    ],
                },
            ],
        },
        {
            title: "I am a Working Professional Aspiring for Consulting",
            subsections: [
                {
                    title: "Core Concepts",
                    links: [
                        { text: "Subsection 3.1", href: "#" },
                        { text: "Subsection 3.2", href: "#" },
                    ],
                },
                {
                    title: "Best Practices",
                    links: [
                        { text: "Subsection 3.3", href: "#" },
                        { text: "Subsection 3.4", href: "#" },
                    ],
                },
            ],
        },
    ];

    return (
        <div className="guidesBody">
            <div className="container">
                <h1 className="page-title">Guides</h1>
                <div className="sections-grid">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className={`section-box ${expandedBox === index ? 'expanded' : ''}`}
                            onClick={() => handleBoxClick(index)}
                        >
                            <h2>{section.title}</h2>
                            <div className="subsections">
                                {section.subsections.map((subsection, subIndex) => (
                                    <div key={subIndex} className="subsection-group">
                                        <h3 className="subsection-title">{subsection.title}</h3>
                                        {subsection.links.map((link, linkIndex) => (
                                            <a key={linkIndex} href={link.href} className="subsection-link">
                                                {link.text}
                                            </a>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuidesBody;