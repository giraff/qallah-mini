import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT_REQUEST, MYAC_RECEIVE_REQUEST } from '../../redux/types';

const Header = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const onLogout = useCallback(() => {
        // 메모제이션된 콜백을 반환한다.
        dispatch({
            type: LOGOUT_REQUEST,
        });
    }, [dispatch]);

    useEffect(() => {
        const body = {
            token: localStorage.getItem('token'),
        };
        dispatch({
            type: MYAC_RECEIVE_REQUEST,
            payload: body,
        });
    }, []);

    const myaccountObj = useSelector(state => state.myac.payload);
    const authLink = (
        <>
            <nav className="header-nav">
                <ul>
                    <li className="nav-logo">
                        <Link to="/">
                            <h1 className="logo">Qallah</h1>
                        </Link>
                    </li>
                    <li className="nav-item lang-kor">
                        <Link to="/tome">내가 보는 나</Link>
                    </li>
                    <li className="nav-item lang-kor">
                        <Link to="/byother">남이 보는 나</Link>
                    </li>
                    <li className="nav-item lang-kor">
                        <Link to="/experience">내가 한 경험</Link>
                    </li>
                    <li className="nav-item lang-kor">
                        <Link to="/refl">인생의 성찰</Link>
                    </li>
                    <li className="nav-item-gnb">
                        <div className="tool-tip-box">
                            <div className="nav-profile">
                                <div className="nav-img-profile">
                                    {myaccountObj && myaccountObj.profileImage !== null ? (
                                        <img src={myaccountObj && myaccountObj.profileImage} alt="profile" />
                                    ) : (
                                        <div className="empty-image" />
                                    )}
                                </div>
                            </div>
                            <div className="tool-tip-content">
                                <Link to="/profile">
                                    <div className="tool-tip-mypage">마이페이지</div>
                                </Link>
                                <Link onClick={onLogout} to="/">
                                    <div className="tool-tip-logout">로그아웃</div>
                                </Link>
                            </div>
                        </div>
                        {/* <li className="nav-item-gnb">
                        <Link onClick={onLogout} to="/">
                            <div id="nav-logout">logout</div>
                        </Link>
    </li> */}
                    </li>
                </ul>
            </nav>
        </>
    );

    const guestLink = (
        <>
            <nav className="header-nav">
                <ul>
                    <li className="nav-logo">
                        <Link to="/">
                            <h1 className="logo">Qallah</h1>
                        </Link>
                    </li>
                    <li className="nav-item-gnb">
                        <Link to="/login">
                            <div id="nav-login">Login</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
    return <header id="header">{isAuthenticated ? authLink : guestLink}</header>;
};

export default Header;
