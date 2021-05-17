import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <Fragment>
      <h1>Hello</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Main;