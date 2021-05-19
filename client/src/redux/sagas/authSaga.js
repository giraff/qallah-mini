import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../types';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

/** LOGIN : 서버와 통신 필요함 */
const loginUserAPI = (loginData) => {
  console.log('4. loginUserAPI 발동 -> axios.post 요청 보냄')
  console.log(loginData, 'authSaga/loginData');
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  // server측으로 post 요청 (express가 받고 router 처리)
  return axios.post('api/auth', loginData, config);
}

function* loginUser(action) {
  console.log('3. loginUser(action) 발동')
  try{
    // loginUserAPI에 action.payload를 인자로 보내면서 실행 -> axios.post 결과 받아옴
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      // server/routes/api/auth에서 res 에 넘긴 {token, user} 객체 data를 payload로 보냄
      payload: result.data
    })
  } catch(e) {
    // try 문 중간에 에러 발생 시 LOGIN_FAILURE로 상태 변화 요청하고 에러 보냄
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response
    })
  }
}

// LoginUser 감시 함수 : LOGIN_REQUEST를 기다렸다가 오면 loginUser 함수 실행
function* watchLoginUser() {
  console.log('1.authSaga 발동 , LOGIN_REQ');
  yield takeEvery(LOGIN_REQUEST,loginUser);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser)
  ])
}