// Import custom styles from the SCSS file
import './style.scss';
// Import the image used in the component
import image from '../../../assets/works.svg';
import { LoginUser, Spinner } from '../../../components';
import { useState } from 'react';
import { FREE_TRIAL } from '../../../utils';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'; // Importing SweetAlert2 for displaying alerts

const handleButtonClick = () => {
    const section = document.getElementById("products");
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

// Define the main functional component 'Works'
const Works = () => {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const login = useSelector((state: RootState) => state.login); // Access login state from Redux
    const navigate = useNavigate(); // Initialize navigation
    const [spinnerRun, setSpinnerRun] = useState<boolean>(false); // Spinner state


    const submitHandle = () => {
        setSpinnerRun(true); // Show spinner during API call
        if (login.loginStatus) {
            FREE_TRIAL({
                "user_id": login.userData.user_id
            }).then((res) => {
                if (res.message === "You already have a free trial before.") {
                    Swal.fire({
                        iconHtml: "🤔",
                        title: "Déjà vu...",
                        text: "You've had your free trial",
                        confirmButtonText: "I’m ready to purchase!"
                    }).then(() => {
                        setTimeout(() => {
                            handleButtonClick()
                        }, 500);
                    });
                    setSpinnerRun(false); // Hide spinner after API call
                    return;
                }
                if (res.status === 200) {
                    setSpinnerRun(false); // Hide spinner after API call
                    navigate("/success-payment")
                }
            })
        } else {
            setSpinnerRun(false); // Hide spinner after API call

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
                            <div className='subText'>
                                <h3>1. Choose Your Package</h3>
                                <p>Select from Beginner, Intermediate, Advanced, or Fitment packages tailored to your current preparation level.</p>
                            </div>
                            <div className='subText'>
                                <h3>2. Start Your Video Interview</h3>
                                <p>Engage in live, interactive,  video-based interviews with our MBB-trained AI interviewer on real consulting cases.</p>
                            </div>
                            <div className='subText'>
                                <h3>3. Get Detailed Feedback & Suggested Approach</h3>
                                <p>Receive instant performance feedback, personalized improvement tips, and a structured approach to solving the case.</p>
                            </div>
                            <div className='subText'>
                                <h3>4. Practice, Perfect & Land Your Dream Job</h3>
                                <p>Sharpen your skills with unlimited practice and get interview-ready for MBB and top consulting firms.</p>
                            </div>
                            {!spinnerRun ? (
                                <button onClick={() => submitHandle()}>
                                    {/* Button for user action */}
                                    Try for free now
                                </button>
                            ) : (
                                <Spinner />
                            )}
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
