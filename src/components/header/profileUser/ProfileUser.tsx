import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import icon from "../../../assets/user.png"

const ProfileUser: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Get user data from Redux state
    const login = useSelector((state: RootState) => state.login);
    const navigate = useNavigate();

    // Toggle the dropdown menu
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Handle navigation to profile
    const goToProfile = () => {
        navigate('/profile');
        setIsOpen(false);
    };

    // Handle sign out (reload page for now)
    const signOut = () => {
        sessionStorage.setItem('login', "false");
        sessionStorage.setItem("data", JSON.stringify(null));
        window.location.href = "https://testtestapp.store/";
        setIsOpen(false);
    };

    // Check if user data is available
    const userPhoto = login.userData?.photo || icon; // Fallback for missing photo

    return (
        <div className="profileUser">
            <div className="box">
                {/* Profile Image */}
                <div className="flex">
                    <div className="image" onClick={toggleDropdown} role="button" tabIndex={0}>
                        <img src={userPhoto} alt="User Profile" />
                    </div>
                    {login.loginStatus && (<p>{login?.userData?.f_name + " " + login?.userData?.l_name}</p>)}
                </div>


                {/* Dropdown Menu */}
                <ul
                    className={`dropdown ${isOpen ? 'open' : ''}`}
                    style={{ transform: `${isOpen ? 'translateY(0%)' : 'translateY(-500%)'}` }}
                >
                    <li onClick={goToProfile}>
                        <FontAwesomeIcon icon={faUser} />
                        <p>Your Profile</p>
                    </li>
                    <li onClick={signOut}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <p>Sign Out</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileUser;
