import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCommon from './profilecommon';
import ProfileLogout from './proflielogout';
import AnswerList from '../../components/answer/answerlist';
import AnswerTab from '../../components/answer/answertab';

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
                <div className="answer-content lang-kor">
                    <div className="user-ans-title">나의 답변</div>
                    <div className="user-ans-content">
                        <AnswerTab />
                        <div className="category-wrapper">
                            <AnswerList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AnswerMain;
