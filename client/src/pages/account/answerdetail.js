import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileCommon from './profilecommon';
import ProfileLogout from './proflielogout';

const AnswerDetail = () => (
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
                <div className="my-answer-container">
                    <div className="my-answer-title">나의 답변</div>
                    <div className="my-answer-content">
                        <div className="my-answer-header">
                            <Link className="nav-btn btn-pre" to="/profile/answer">
                                <i className="fas fa-chevron-left fa-2x" />
                            </Link>
                            <div className="title-text">내가 보는 나</div>
                            <div className="date-text">2020.09.06</div>
                        </div>
                        <div className="answers-wrapper">
                            <div className="answers">
                                <div className="question-field">Q1. 나의 장점은?</div>
                                <div className="answer-field">
                                    <div className="answer-elem">- 처음 본 사람들에게 상냥하다</div>
                                    <div className="answer-elem">- 정직하려고 노력한다.</div>
                                    <div className="answer-elem">- 매사 민폐는 안 끼칠 만큼 좋은 결과를 낸다</div>
                                </div>
                            </div>
                            <div className="answers">
                                <div className="question-field">Q2. 나의 단점은?</div>
                                <div className="answer-field">
                                    <div className="answer-elem">- 게으르다</div>
                                    <div className="answer-elem">- 신경질적이다.</div>
                                    <div className="answer-elem">- 한 번 친해지면 막 대한다.</div>
                                    <div className="answer-elem">- 지각을 자주한다.</div>
                                    <div className="answer-elem">- 이기적이다.</div>
                                    <div className="answer-elem">- 평소 자신의 일에 대해 감정적인 반면 남의 일엔 냉정하다</div>
                                </div>
                            </div>
                            <div className="answers">
                                <div className="question-field">Q3. 나의 장점은?</div>
                                <div className="answer-field">
                                    <div className="answer-elem">- 처음 본 사람들에게 상냥하다</div>
                                    <div className="answer-elem">- 정직하려고 노력한다.</div>
                                    <div className="answer-elem">- 매사 민폐는 안 끼칠 만큼 좋은 결과를 낸다</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AnswerDetail;
