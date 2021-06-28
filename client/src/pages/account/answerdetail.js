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
                    <AnswerDetailComponent query={query} />
                </div>
            </div>
        </section>
    );
};

export default AnswerDetail;
