import {all, fork} from 'redux-saga/effects';
import axios from 'axios';

import authSaga from './authSaga';

import dotenv from 'dotenv'
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  console.log(process.env.REACT_APP_BASIC_SERVER_URL);
  yield all([fork(authSaga)])
};
//제너레이터 함수 : 여러 개의 반환값을 갖는 최신 문법 함수