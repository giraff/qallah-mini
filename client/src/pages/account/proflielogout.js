import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT_REQUEST } from '../../redux/types';

const profilelogout = () => {
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        // 메모제이션된 콜백을 반환한다.
        dispatch({
            type: LOGOUT_REQUEST,
        });
    }, [dispatch]);
    return (
        <Link onClick={onLogout} to="/">
            로그아웃
        </Link>
    );
};

export default profilelogout;
