import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MYAC_RECEIVE_REQUEST } from '../../redux/types';

const profilecommon = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('sidetab useEffect');
        const body = {
            token: localStorage.getItem('token'),
        };
        dispatch({
            type: MYAC_RECEIVE_REQUEST,
            payload: body,
        });
    }, []);

    const myaccountObj = useSelector(state => state.myac.payload);
    return (
        <div className="profile">
            <div className="img-profile">
                {console.log(myaccountObj)}
                {myaccountObj && myaccountObj.profileImage !== null ? (
                    <img src={myaccountObj && myaccountObj.profileImage} alt="profile" />
                ) : (
                    <div className="empty-image" />
                )}
            </div>
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
