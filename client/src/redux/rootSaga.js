import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import dotenv from 'dotenv';
import authSaga from '../components/auth/saga/authSaga';
import regSaga from '../components/register/saga/regSaga';
import ToMeSaga from '../components/questiontome/saga/ToMeDetailSaga';
import byotherSaga from '../components/byother/saga/byotherSaga';
import reflSaga from '../components/reflection/saga/reflectionDetailSaga';
import myacSaga from '../components/profile/saga/myaccountSaga';
import experienceSaga from '../components/experience/saga/experienceSaga';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
    yield all([fork(regSaga), fork(authSaga), fork(ToMeSaga), fork(byotherSaga), fork(reflSaga), fork(myacSaga), fork(experienceSaga)]);
}
// 제너레이터 함수 : 여러 개의 반환값을 갖는 최신 문법 함수
