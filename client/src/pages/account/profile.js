import React from 'react';
import { Link } from 'react-router-dom';
import AccountForm from '../../components/profile/accountform';

const Profile = () => (
    <section className="sections account-section">
        <div className="sections-overlay">
            <div className="account-container">
                <div className="sidebar">
                    <div className="profile">
                        <div className="img-profile" />
                        <div className="profile-infos">
                            <div className="profile-info profile-name">황현정</div>
                            <div className="profile-info profile-email">
                                <i className="far fa-envelope" /> hse05105@naver.com
                            </div>
                            <div className="profile-info profile-date">
                                <i className="fas fa-birthday-cake" /> 1999.01.23
                            </div>
                        </div>
                    </div>
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
                        로그아웃
                    </div>
                </div>
                <div className="account-wrapper">
                    <AccountForm />
                </div>
            </div>
        </div>
    </section>
);

export default Profile;
