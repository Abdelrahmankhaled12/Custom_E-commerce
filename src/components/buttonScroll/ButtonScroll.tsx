import './style.scss'; // Importing style file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon from FontAwesome library
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'; // Importing faAnglesUp icon from FontAwesome library
import { useState, useEffect } from 'react'; // Importing useState and useEffect hooks from React

// ButtonScroll component definition
const ButtonScroll: React.FC = () => {
    const [show, setShow] = useState<boolean>(false); // State to manage button visibility, typed as boolean
    const [lastScrollY, setLastScrollY] = useState<number>(0); // State to store last scroll position, typed as number

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar); // Adding scroll event listener
        return () => {
            window.removeEventListener('scroll', controlNavbar); // Removing scroll event listener on component unmount
        }
    }, [lastScrollY]); // Dependency array ensures effect runs only when lastScrollY changes

    // Function to control button visibility based on scroll position
    const controlNavbar = () => {
        if (window.scrollY > 280) { // If scrolled past a certain point
            setShow(true); // Show the button
        } else {
            setShow(false); // Hide the button
        }
        setLastScrollY(window.scrollY); // Update last scroll position
    }

    // Function to handle button click to scroll to top
    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top of page smoothly
    };

    return (
        <button
            className='scroll_button' 
            onClick={() => handleButtonClick()} // Handling button click event
            style={show ? { 'opacity': "1" } : { "opacity": "0" }} // Setting button opacity based on show state
        >
            <FontAwesomeIcon icon={faAnglesUp} />
        </button>
    )
}

export default ButtonScroll; // Exporting ButtonScroll component
