import React, { useEffect } from 'react';
import { Effect, Footer, Header } from '../../components';
import img from '../../assets/successful.svg';
import { setLoginStatus, setUserData } from '../../store/login';
import { userData } from '../../utils';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { RootState } from '../../store';

const SuccessPayment: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    // Extract token and file_path from the query string
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const file_path = searchParams.get('file_path');
    const login = useSelector((state: RootState) => state.login);

    useEffect(() => {
        // Scrolls to the top of the page when the component mounts
        window.scrollTo(0, 0);

        // Fetch user data if token exists
        if (token) {
            getDataUser(token);
        }

    }, [location.search]); // Re-run effect if the query string changes

    const getDataUser = async (token: string) => {
        try {
            const response = await userData({ token });
            dispatch(setLoginStatus(true));
            dispatch(setUserData(response.data));
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    return (
        <Effect>
            <Header />
            <div className="successPayment">
                <div className="container">
                    <div className="grid">
                        <div className="image">
                            <img src={img} alt="" />
                        </div>
                        <div className="text">
                            {
                                file_path ? (
                                    <>
                                        <h3>Your transaction has been done <span>successflly.</span></h3>
                                        <p>You can download the invoice pdf from here</p>
                                    </>
                                ) : (
                                    <h2>Thank you for signing up with the Free Trial. We have emailed you the access code and steps on <span>{login.userData.email}</span></h2>
                                )
                            }

                            {
                                file_path && (
                                    <a href={file_path || ""} target='_blank'
                                    >
                                        <span>Download Invoice</span>
                                        <FontAwesomeIcon icon={faFileInvoiceDollar} />
                                    </a>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Effect>
    );
};

export default SuccessPayment;
