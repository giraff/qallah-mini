import React from 'react';
import { Link } from 'react-router-dom';
import AccountForm from '../../components/profile/accountform';
import ProfileCommon from './profilecommon';
import ProfileLogout from './proflielogout';

const Profile = () => (
    <>
        {/* baneer */}
        <section className="banner-section" />
        <div id="account-wrap">
            {/* section1 - 페이지 설명 */}
            <section className="account-page-header">
                <div className="acc-title">나의 계정</div>
                <div className="acc-header">내 프로필</div>
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
                <AccountForm />
            </section>
        </div>
    </>
);
export default Profile;
