import React, { Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { LOGOUT_REQUEST } from "../redux/types";

const Main = () => {
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
      <Link onClick={onLogout} to="#">
        <button>logout</button>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/tome">
              <button>내가 보는 나</button>
            </Link>
          </li>
          <li>
            <Link to="/byother">
              <button>남이 보는 나</button>
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <nav>
        <ul>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
  return (
    <Fragment>
      <h1>Qallah</h1>
      {isAuthenticated ? authLink : guestLink}
    </Fragment>
  );
};

export default Main;
