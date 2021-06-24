import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountForm from '../../components/profile/accountform';
import ProfileCommon from './profilecommon';
import ProfileLogout from './proflielogout';

const Profile = () => (
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
                <div className="account-wrapper">
                    <AccountForm />
                </div>
            </div>
        </div>
    </section>
);
export default Profile;
