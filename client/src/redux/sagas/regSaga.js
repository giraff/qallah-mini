import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../types';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

/** REGISTER : 서버와 통신 필요함 */
const regUserAPI = (regData) => {
    console.log('regUserAPI 발동 -> axios.post 요청 보냄')
    console.log(regData,'regSaga/regData');
    const config = {
        headers: {
            "Content-type" : "application/json"
        }
    }
    // server측으로 post 요청 (express가 받고 router 처리)
    return axios.post('/api/user/register', regData, config);
}

function* regUser(action) {
    console.log('regUser(action) 발동')
    try{
        // regUserAPI에 action.payload를 인자로 보내면서 실행 -> axios.post 결과 받아옴
        const result = yield call(regUserAPI, action.payload);
        console.log(result);
        yield put({
            type: REGISTER_SUCCESS,
            // server/routes/api/user에서 res 에 넘긴 {user} 객체 data를 payload로 보냄
            payload: result.data
        })
    } catch(e) {
        // try 문 중간에 에러 발생 시 REGISTER_FAILURE로 상태 변화 요청하고 에러 보냄
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response
        })
    }
}
// RegUser 감시 함수 : REGISTER_REQUEST를 기다렸다가 오면 regUser 함수 실행
function* watchRegUser() {
    console.log('regSaga 발동, REGISTER_REQ');
    yield takeEvery(REGISTER_REQUEST,regUser);
}

export default function* regSaga() {
    yield all([
        fork(watchRegUser)
    ])
}