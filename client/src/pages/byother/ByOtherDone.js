import React from 'react';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { BYOTHER_DETAIL_LOADING_REQUEST } from '../../redux/types';
import { useDispatch } from 'react-redux';

const ByOtherDone = () => {

  const dispatch = useDispatch();

  const onClickEvent = () => {
    dispatch({
      type: BYOTHER_DETAIL_LOADING_REQUEST
    })
  }
  return(
    <Fragment>
      <h1>ByOtherDone</h1>
      <nav>  
        <li>
          <NavLink to="/byother">다시 답변</NavLink>
        </li>
        <li>
          <NavLink to="/">메인 홈</NavLink>
        </li>
        <li>
          <NavLink onClick={onClickEvent} to="/byother/history">히스토리</NavLink>
        </li>
      </nav>
    </Fragment>
  );
}


export default ByOtherDone;
