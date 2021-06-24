import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProfileCommon from './profilecommon';
import ProfileLogout from './proflielogout';
import AnswerList from '../../components/answer/answerlist';

const AnswerMain = () => {
    const [years, setYears] = useState([]);
    // const [answerComponent, setAnswerComponent] = useState([]);
    useEffect(async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };

        if (token) {
            config.headers['x-auth-token'] = token;
        }
        const result = await axios.get('/api/answer/years', config);
        console.log(result.data);
        setYears(result.data);
    }, []);

    // useEffect(async () => {
    //     const token = localStorage.getItem('token');
    //     const config = {
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //     };

    //     if (token) {
    //         config.headers['x-auth-token'] = token;
    //     }
    //     const res = await axios.get('/api/answer/', config);
    //     console.log(res.data);
    //     setAnswerComponent(res.data);
    // }, []);

    return (
        <section className="sections account-section">
            <div className="sections-overlay">
                <div className="account-container">
                    <div className="sidebar">
                        <ProfileCommon />
                        <div className="profile-tabs">
                            <Link className="profile-tab answer-tab" to="/profile/answer">
                                나의 답변
                            </Link>
                            <Link className="profile-tab account-tab" to="/profile">
                                나의 계정
                            </Link>
                        </div>
                        <div className="logout-button">
                            <i className="fas fa-power-off" />
                            <ProfileLogout />
                        </div>
                    </div>
                    <div className="answer-content">
                        <div className="user-ans-title">나의 답변</div>
                        <div className="user-ans-content">
                            <div className="content-header">연도별</div>
                            <ul className="filter-list">
                                {years &&
                                    years.map(year => (
                                        <li key={year.ROWNUM}>
                                            <Link className="year-link" to="/profile/answer">
                                                {year.date}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>

                            <div className="category-wrapper">
                                <AnswerList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnswerMain;
