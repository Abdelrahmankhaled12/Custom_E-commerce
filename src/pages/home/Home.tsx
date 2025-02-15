import React, { useEffect } from 'react';
import { Effect, Footer, Header } from '../../components';
import BannerHero from './banner/BannerHero';
import Works from './works/Works';
import Products from './products/Products';
import Testimonials from './testimonials/Testimonials';
import Faqs from './faq/Faqs';
import Contact from './contact/Contact';
import { useLocation, useNavigate } from 'react-router-dom';
import { userData } from '../../utils';
import { setLoginStatus, setUserData } from '../../store/login';
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store';
import WatchCasePrep from './watchCasePrep/WatchCasePrep';
import Trusted from './trusted/Trusted';

const STORAGE_KEYS = {
    LOGIN: "login",
    DATA: "data",
};

const Home: React.FC = () => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const login = useSelector((state: RootState) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token && !login.loginStatus) {
            getDataUser(token);

            searchParams.delete('token');
            navigate({ pathname: location.pathname, search: searchParams.toString() }, { replace: true });
        }
    }, [location.search, login.loginStatus, navigate]);

    const getDataUser = async (token: string) => {
        try {
            const response = await userData({ token });
            if (!login.loginStatus)
                dispatch(setLoginStatus(true));
            dispatch(setUserData(response.data));
            sessionStorage.setItem(STORAGE_KEYS.LOGIN, "true");
            sessionStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(response.data));
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <Effect>
            <Header />
            <BannerHero />
            <Works />
            <Products />
            <Testimonials />
            <WatchCasePrep />
            <Trusted />
            <Faqs />
            <Contact />
            <Footer />
        </Effect>
    );
};

export default Home;
