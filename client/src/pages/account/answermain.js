import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCommon from './profilecommon';
import ProfileLogout from './proflielogout';
import AnswerList from '../../components/answer/answerlist';
import AnswerTab from '../../components/answer/answertab';

const AnswerMain = () => (
    <>
        {/* banner */}
        <section className="banner-section" />
        <div id="account-wrap">
            <section className="account-page-header">
                <div className="acc-title">나의 답변</div>
                <div className="acc-header">답변 메인</div>
            </section>
            <aside className="sidebar">
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
            </aside>
            <section className="account-form">
                <div className="user-ans-content lang-kor">
                    <AnswerTab />
                    <div className="category-wrapper">
                        <AnswerList />
                    </div>
                </div>
            </section>
        </div>
    </>
);

export default AnswerMain;
