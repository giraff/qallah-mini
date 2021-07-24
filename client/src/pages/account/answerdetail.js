import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import ProfileCommon from './profilecommon';
import ProfileLogout from './proflielogout';
import AnswerDetailComponent from '../../components/answer/answer-detail-component';

const AnswerDetail = ({ location }) => {
    const { search } = location;
    const query = queryString.parse(search);
    return (
        <>
            <section className="banner-section" />
            <div id="account-wrap" className="lang-kor">
                <section className="account-page-header">
                    <div className="acc-title">나의 답변</div>
                    <div className="acc-header">상세 답변</div>
                </section>
                <aside className="sidebar">
                    <ProfileCommon />
                    <div className="profile-tabs">
                        <Link className="profile-tab answer-tab select-tab" to="/profile/answer">
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
                    <AnswerDetailComponent query={query} />
                </section>
            </div>
        </>
    );
};

export default AnswerDetail;
