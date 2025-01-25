// Import custom styles from the SCSS file
import './style.scss';
// Import the image used in the component
import image from '../../../assets/works.svg';
import { LoginUser } from '../../../components';
import { useState } from 'react';
import { FREE_TRIAL } from '../../../utils';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'; // Importing SweetAlert2 for displaying alerts

// Define the main functional component 'Works'
const Works = () => {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const login = useSelector((state: RootState) => state.login); // Access login state from Redux
    const navigate = useNavigate(); // Initialize navigation


    const submitHandle = () => {
        if (login.loginStatus) {
            FREE_TRIAL({
                "user_id": login.userData.user_id
            }).then((res) => {
                if (res.message === "You already have a free trial before.") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "You already have a free trial before!",
                    });
                    return;
                }
                if (res.status === 200) {
                    navigate("/success-payment")
                }
            })
        } else {
            setIsOpenLogin(true)
        }
    }

    return (
        <>
            <div className='works' id='works'> {/* Main container for the "Works" section */}
                <div className="container"> {/* Wrapper to center content and define width */}
                    <div className="grid"> {/* Grid layout for organizing content */}
                        <div className="text" data-aos="fade-left" data-aos-delay="100" data-aos-duration="800"> {/* Text section */}
                            <h1>How it works ?</h1> {/* Main heading */}
                            <p>
                                {/* Paragraph for descriptive content */}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium fugiat voluptas rerum repellat illo voluptatum aliquid deleniti voluptatibus, quaerat veniam qui alias tempore! Animi nihil ipsa possimus facere incidunt quisquam?
                            </p>
                            <p>
                                {/* Additional paragraph for more explanation */}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium fugiat voluptas rerum repellat illo voluptatum aliquid deleniti voluptatibus, quaerat veniam qui alias tempore! Animi nihil ipsa possimus facere incidunt quisquam?
                            </p>
                            <button onClick={() => submitHandle()}>
                                {/* Button for user action */}
                                Try for free now
                            </button>
                        </div>
                        <div className="image" data-aos="fade-up" data-aos-delay="150" data-aos-duration="800"> {/* Image section */}
                            <img src={image} alt="Illustration of how it works" />
                            {/* Added alt text for better accessibility and description */}
                        </div>
                    </div>
                </div>
            </div>
            <LoginUser isOpen={isOpenLogin} closeModel={() => setIsOpenLogin(false)} nav="" />
        </>

    );
}

// Export the component for use in other parts of the application
export default Works;
