import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileCommon from './profilecommon';
import ProfileLogout from './proflielogout';

const AnswerMain = () => (
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
                            <li>
                                <Link className="year-link" to="/profile/answer">
                                    2020
                                </Link>
                            </li>
                            <li>
                                <Link className="year-link" to="/profile/answer">
                                    2019
                                </Link>
                            </li>
                            <li>
                                <Link className="year-link" to="/profile/answer">
                                    2018
                                </Link>
                            </li>
                            <li>
                                <Link className="year-link" to="/profile/answer">
                                    2017
                                </Link>
                            </li>
                        </ul>

                        <div className="category-wrapper">
                            <div className="category category-year">
                                <div className="label label-year">2020</div>
                                <div className="category category-month">
                                    <div className="label label-month">9월</div>
                                    <div className="category category-day">
                                        <div className="label label-day">19일</div>
                                        <div className="my-answer-container">
                                            {/* <Link className="my-answer-elem expr-answer">내가 한 경험</Link> */}
                                            <Link className="my-answer-elem me-answer" to="/profile/answer/view">
                                                내가 보는 나
                                            </Link>
                                            {/* <Link className="my-answer-elem reflection-answer">오늘의 성찰</Link> */}
                                        </div>
                                    </div>
                                    <div className="day-wrap category-day" />
                                    <div className="day-wrap category-day" />
                                </div>
                                <div className="category category-month">
                                    <div className="label label-month">8월</div>
                                </div>
                                <div className="category category-month">
                                    <div className="label label-month">5월</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AnswerMain;
