import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { LOGOUT_REQUEST, MYAC_RECEIVE_REQUEST } from '../../redux/types';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthenticated } = useSelector(state => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const onLogout = useCallback(() => {
        // 메모제이션된 콜백을 반환한다.
        dispatch({
            type: LOGOUT_REQUEST,
        });
    }, [dispatch]);

    const handleClickEvent = () => {
        setMenuOpen(false);
    };
    useEffect(() => {
        setMenuOpen(false);
    }, [isAuthenticated, dispatch, history]);

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
                    <li className="hidden bars">
                        <i
                            aria-label="text"
                            className="fas fa-bars fa-2x"
                            onClick={() => setMenuOpen(true)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={() => setMenuOpen(true)}
                        />
                    </li>
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
                    </li>
                    <li className="hidden nav-logo-q">
                        <Link to="/" onClick={() => handleClickEvent()}>
                            <h1 className="logo">Q</h1>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );

    const guestLink = (
        <>
            <nav className="header-nav">
                <ul>
                    <li className="hidden bars">
                        <i
                            aria-label="text"
                            className="fas fa-bars fa-2x"
                            onClick={() => setMenuOpen(true)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={() => setMenuOpen(true)}
                        />
                    </li>
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
                    <li className="hidden nav-logo-q">
                        <Link to="/" onClick={() => handleClickEvent()}>
                            <h1 className="logo">Q</h1>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
    return (
        <header id="header">
            {isAuthenticated ? authLink : guestLink}
            <div className={`menu-wrap ${menuOpen ? 'MenuOpen' : ''}`}>
                <i
                    aria-label="text"
                    className="fas fa-bars fa-2x"
                    onClick={() => {
                        setMenuOpen(false);
                        console.log('click');
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => setMenuOpen(false)}
                />
                <div className="menu-inner">
                    {/* 로그아웃 상태 */}
                    {isAuthenticated ? (
                        <>
                            <ul>
                                <li className="menu-item">
                                    <Link to="/tome" onClick={() => handleClickEvent()}>
                                        내가 보는 나
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/byother" onClick={() => handleClickEvent()}>
                                        남이 보는 나
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/experience" onClick={() => handleClickEvent()}>
                                        내가 한 경험
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/refl" onClick={() => handleClickEvent()}>
                                        인생의 성찰
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/profile" onClick={() => handleClickEvent()}>
                                        <div className="tool-tip-mypage">마이 페이지</div>
                                    </Link>
                                </li>
                            </ul>
                            <div className="menu-user-wrap">
                                <div className="user-name-wrap">
                                    <Link onClick={onLogout} to="/">
                                        <span>
                                            <i className="fas fa-sign-out-alt" />
                                        </span>
                                        &nbsp; LOGOUT
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <ul>
                                <li className="menu-item">
                                    <Link to="/login" onClick={() => handleClickEvent()}>
                                        내가 보는 나
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/login" onClick={() => handleClickEvent()}>
                                        남이 보는 나
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/login" onClick={() => handleClickEvent()}>
                                        내가 한 경험
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/login" onClick={() => handleClickEvent()}>
                                        인생의 성찰
                                    </Link>
                                </li>
                            </ul>
                            <div className="menu-user-wrap">
                                <div className="user-name-wrap">
                                    <Link to="/login" onClick={() => handleClickEvent()}>
                                        <span>
                                            <i className="fas fa-user" />
                                        </span>
                                        &nbsp; Login
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                    {/* 로그인 상태 */}
                </div>
            </div>
        </header>
    );
};

export default Header;
