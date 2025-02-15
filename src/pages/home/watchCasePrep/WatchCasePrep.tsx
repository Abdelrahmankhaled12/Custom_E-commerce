import React from 'react';
import './style.scss';



const WatchCasePrep: React.FC = () => {


    return (
        <div className="watchCasePrep" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
            <div className="container">
                <div className="title">
                    <h1>Watch CasePrep in Action</h1>
                </div>
                <div className="video">
                <iframe  height="450" src="https://www.youtube.com/embed/Zy5IYsEqGcc?si=TyEe3l5AhqpNpgfj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    );
};

export default WatchCasePrep;
