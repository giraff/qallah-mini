import React, { Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT_REQUEST } from "../../redux/types";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const onLogout = useCallback(() => {
    // 메모제이션된 콜백을 반환한다.
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  const authLink = (
    <Fragment>
      <nav className="header-nav">
        <ul>
          <li className="nav-item">
            <Link to="/tome">
              <button>내가 보는 나</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/">
              <h1 className="logo">Qallah</h1>
            </Link>          
          </li>
          <li className="nav-item">
            <Link to="/byother">
              <button>남이 보는 나</button>
            </Link>
          </li>
          <li className="nav-item-gnb">
            <Link onClick={onLogout} to="#">
              <button>logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <nav className="header-nav">
        <ul>
          <li className="nav-item">
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
    </Fragment>
  );
  return (
    <header id="header">
      {isAuthenticated ? authLink : guestLink}
    </header>
  );
};


export default Header;