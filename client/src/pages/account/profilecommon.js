import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const profilecommon = () => {
    const myaccountObj = useSelector(state => state.myac.payload);
    return (
        <div className="profile">
            <div className="img-profile" />
            <div className="profile-infos">
                <div className="profile-info profile-name">{myaccountObj.user_name}</div>
                <div className="profile-info profile-email">
                    <i className="far fa-envelope" /> {myaccountObj.email}
                </div>
            </div>
        </div>
    );
};
export default profilecommon;
