import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const experienceMain = () => {
    const { userName } = useSelector(state => state.auth);

    useEffect(() => {
        console.log('내가 한 경험 이름 => ', userName);
    }, []);
    return (
        <section className="sections">
            <div className="sections-overlay">
                <div className="exp-container">
                    <div className="exp-header">
                        <h1>{`"${userName}"`}님의 경험</h1>
                    </div>
                    <div className="exp-content">
                        <iframe
                            title="timelineJS"
                            src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1GVhbgIfz82DTdoNBFM7HW0z4GaBWWRur20Wmi3vlTDo&font=Default&lang=en&initial_zoom=2&height=700"
                            width="100%"
                            height="700"
                            webkitallowfullscreen="true"
                            mozallowfullscreen="true"
                            allowFullScreen
                            frameBorder="0"
                        />
                    </div>
                    <div className="exp-footer">
                        <div className="exp-start">
                            <Link className="exp-button" to="/experience/form">
                                경험 추가
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default experienceMain;
