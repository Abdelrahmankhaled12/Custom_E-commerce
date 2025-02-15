import React, { useState, useEffect } from 'react';
import './style.scss';
import { useNavigate } from "react-router-dom";

const items = [
    {
        question: 'Who is CasePrep for ?',
        answer: `
        <ul>
            <li> <span> MBA students </span>  preparing for consulting interviews. </li>
            <li> <span> Undergraduate students </span> targeting consulting internships or placements.  </li>
            <li> <span> Professionals </span> looking to switch to consulting roles. </li>
            <li> <span> Anyone </span> who wants to improve their structured problem-solving and communication skills. For many business roles today, case interviewing has become a standard practice. </li>
        </ul>

        <p>You can select a package based on your profile and current preparation level.</p>
        `
    },

    {
        question: 'How does CasePrep help me in my consulting interview prep ?',
        answer: `
        <p> CasePrep offers AI-driven case interviews that provide a <span> highly affordable, realistic, and structured </span> experience that is often superior to traditional human-led practice. Here’s why:</p>
        
        <ul class="listNone">
        <li> 1. <span> Realistic Interview Simulation </span>	 – CasePrep follows MBB-style questioning, adapting dynamically to your responses, just like a real consultant. </li>
        <li> 2.	<span>  Unbiased and Consistent Feedback </span>   – Unlike human mentors who may have subjective biases, CasePrep provides structured, data-driven feedback on your approach, communication, and problem-solving skills.</li>
        <li> 3.	<span> 24/7 Accessibility at a Fraction of the Cost  </span> – No need to coordinate schedules or pay expensive coaching fees. You can practice anytime, anywhere, at a highly affordable price.</li>
        <li> 4.	<span> Diverse & Constantly Updated Cases </span>  – CasePrep provides access to a vast and evolving case pool and diverse interviewer personas, ensuring fresh challenges every time.</li>
        <li> 5.	<span>  Unlimited Practice  </span>– Unlike with human mentors, you are not limited by the number of cases you can practice. With CasePrep, you can practice till perfection.</li>
        </ul>

        <p> CasePrep ensures <span> faster learning, structured preparation, and unlimited practice at a cost-effective price </span> — making it the smartest way to prepare for consulting interviews.  </p>

        `
    },

    {
        question: 'What types of cases does CasePrep offer ?',
        answer: `
        <div class="groupText">
            <h2> Business Case Types </h2>
            <p> + Profitability & Declining Sales – Diagnosing revenue, cost, and margin issues. </p>
            <p> + Market Entry & Expansion – Evaluating new market opportunities, entry strategies, and risks.</p>
            <p> + Mergers & Acquisitions (M&A) – Assessing synergies, valuation, and post-merger integration.</p>
            <p> + Pricing Strategy – Determining optimal pricing models for products/services.</p>
            <p> + Growth Strategy – Identifying paths to scale, including market penetration and diversification.</p>
            <p> + Cost Optimization & Efficiency – Cutting costs while maintaining operational effectiveness.</p>
            <p> + Competitive Response – Developing strategies to counter market threats and new entrants.</p>
            <p> + Turnaround & Restructuring – Reviving struggling businesses or divisions</p>
            <p> + Private Equity & Investment – Assessing potential investment opportunities for PE firms.</p>
            <p> + Supply Chain & Operations – Optimizing logistics, procurement, and production.</p>
        </div>
        <div class="groupText">
            <h2> Quantitative & Analytical Cases </h2>
            <p> + Market Sizing & Guesstimation – Estimating industry sizes, demand, and product penetration. </p>
            <p> + Data Interpretation & Trend Analysis – Extracting insights from charts, tables, and financials.</p>
            <p> + Breakeven & Financial Modeling – Understanding cost structures and profitability thresholds.</p>
            <p> + Unit Economics & Business Viability – Evaluating the financial feasibility of a business model. </p>
        </div>
        <div class="groupText">
            <h2> Industry-Specific Cases </h2>
            <p> + Healthcare & Pharma – Analyzing hospital efficiency, drug pricing, and medical device launches.</p>
            <p> + Tech & Digital Transformation – Strategy for SaaS, AI-driven businesses, and platform scaling.</p>
            <p> + Retail & FMCG – Consumer behavior analysis, product launches, and e-commerce strategies.</p>
            <p> + Energy & Sustainability – Carbon footprint reduction, renewable energy projects, and efficiency.</p>
            <p> + Banking & Financial Services – Risk assessment, fintech innovation, and loan profitability.</p>
        </div>
        <div class="groupText">
            <h2> Creative & Unconventional Cases </h2>
            <p> + Unstructured Brainstorming Cases – Idea generation and blue-sky thinking exercises.</p>
            <p> + Strategy Under Constraints – Solving problems with limited time, budget, or resources.</p>
            <p> + Government & Policy Cases – Structuring solutions for public sector challenges.</p>
            <p> + Innovation & Product Launch – Designing a go-to-market strategy for new products.</p>
        </div>
        <p>Our case library is constantly expanding, ensuring that you always get fresh and relevant cases that match real-world consulting challenges.</p>

        `
    },

    {
        question: 'Where are the cases on CasePrep sourced from ?',
        answer: `<p> Our cases are crafted by consultants from McKinsey & Co., BCG, and Bain & Co. (MBB) who have conducted 100s of case interviews at top business schools, including Ivy League institutions. Each case is designed to reflect real-world business problems and structured problem-solving methodologies used in consulting. </p>`
    },

    {
        question: 'Does CasePrep provide feedback on my answers and performance ?',
        answer: `
        <p> Yes! CasePrep provides detailed feedback after each interview, with: </p>
        <ul class="listNone">
            <li>  ✔ <span>  Scores on Performance Metrics </span> – Evaluation on key consulting skills with examples from your responses. </li>
            <li> ✔ <span> Strengths & Improvement Areas </span>   – Specific feedback on your strengths and development areas with actionable tips. </li>
            <li>  ✔ <span>  Final Readiness Score </span>  – Overall assessment of your consulting preparedness. </li>
            <li>  ✔ <span> Suggested Approach & Model Answer </span>   – How a top consultant would solve the case.</li>
        </ul>
        <p> This ensures clear, structured insights to help you improve quickly. </p>
        
        `
    },

    {
        question: 'Can I choose a specific case type or industry to practice ?',
        answer: `<p>As CasePrep is designed to simulate real consulting interviews, you do not get to choose your case type or industry. The cases, industries and interviewer personas are assigned to ensure a diverse and realistic preparation experience every single time.</p>`
    },

    {
        question: 'Is CasePrep free to use ?',
        answer: `<p>We offer a free trial for first-time users. After that, we have highly affordable packages suited for your needs.</p>`
    },

    {
        question: 'What happens after I’m done with the interactions for a package ?',
        answer: `<p> You can purchase the same package again or switch to a higher complexity package. Each time you do, you’ll receive a new set of cases, ensuring fresh challenges for continued practice. </p>`
    },

    {
        question: 'Does CasePrep provide consulting preparation guides ?',
        answer: `
        <p> Yes! We have an extensive <a href="/guides">Prep Guide</a> section with step-by-step interactive guidance on preparing for consulting roles, accessible for free. </p>
        `
    },

    {
        question: 'Can I track my progress ?',
        answer: `<p>Yes, you get a downloadable detailed performance report after each interview. This report includes feedback on your problem-solving approach, communication, and areas for improvement. However, we don’t have a built-in dashboard to track long-term progress yet.</p>`
    },

    {
        question: 'Can I reattempt a particular case ?',
        answer: `<p>Once you complete a case, you cannot reattempt the exact same one. This approach mimics real interview scenarios and helps you develop adaptability rather than memorizing answers. You will always receive new cases for continued practice.</p>`
    },

    {
        question: 'How can I get a bulk deal for my college ?',
        answer: `
        <p> If you're looking to get bulk access for your college, CasePrep offers customized plans and special pricing for universities, student clubs, and consulting societies.
        To discuss a bulk deal: </p>

        <ul class="listNone">
            <li> 1.	Email us at start@caseprep.co with details about your college, number of students, and any specific requirements. </li>
            <li> 2.	We’ll tailor a package that provides discounted pricing and customized cases for your group. </li>
            <li> 3.	Quick onboarding – Once finalized, we’ll set up access for your students so they can start practicing immediately.</li>
        </ul>

        <p>Get in touch today to bring <span> CasePrep </span> to your campus! </p>

        `
    },

    {
        question: 'I forgot to download my performance report. How can I access it again ?',
        answer: `<p>You can access and download your feedback report again by entering the same interaction code on the platform.</p>`
    },

    {
        question: 'What are the system requirements to use CasePrep ?',
        answer: `
        <p> CasePrep is accessible on any device with: </p>
        <ul>
            <li> A stable internet connection</li>
            <li> A webcam</li>
            <li> A microphone</li>
            <li> A web browser (Chrome, Firefox, Safari, Edge, etc.)</li>
        </ul>

        <p> We strongly suggest that you use your laptop/desktop (and not your phone) to use CasePrep for a realistic practice experience. </p>

        `
    },

    {
        question: 'Does CasePrep prepare you for non-consulting interviews ?',
        answer: `<p>While CasePrep is optimized for consulting case interviews, our structured problem-solving training can also help with product management, analytics, and strategy roles. Most business roles’ interviews have adopted case interviews as a standard practice.</p>`
    },
];

/**
 * Faqs Component
 * Displays a list of frequently asked questions with expandable panels.
 */

const Faqs: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleAccordion = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    // Function to handle navigation for links inside the answer
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            navigate(href);
        }
    };

    // Effect to attach event listeners to links after rendering
    useEffect(() => {
        const panels = document.querySelectorAll('.panel');
        panels.forEach((panel) => {
            const links = panel.querySelectorAll('a');
            links.forEach((link) => {
                link.addEventListener('click', handleLinkClick as any);
            });
        });

        // Cleanup event listeners
        return () => {
            panels.forEach((panel) => {
                const links = panel.querySelectorAll('a');
                links.forEach((link) => {
                    link.removeEventListener('click', handleLinkClick as any);
                });
            });
        };
    }, [activeIndex]); // Re-run effect when activeIndex changes

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
                                    maxHeight: activeIndex === index ? '100%' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.3s ease-out',
                                    marginBottom: activeIndex === index ? '10px' : '0',
                                    padding: activeIndex === index ? '25px 20px' : '0px 18px',
                                }}
                            >
                                <div className='answer' dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faqs;
