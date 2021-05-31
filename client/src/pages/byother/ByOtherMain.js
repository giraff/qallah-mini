import React from 'react';
import { Fragment } from 'react';
import { Link } from "react-router-dom";

const ByOtherMain = () => {

  return (
    <Fragment>
      <h1>ByOtherMain</h1>
      <nav>  
        <li>
          <Link to="/byother/detail/1">답변 시작</Link>
        </li>
        <li>
          <Link to="/">메인 홈</Link>
        </li>
        <li>
          <Link to="/byother/history">히스토리</Link>
        </li>
      </nav>
    </Fragment>
  )
}



export default ByOtherMain;