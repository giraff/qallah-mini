import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    CLEAR_ERROR_FAILURE,
} from '../../../redux/types';

/** LOGIN : 서버와 통신 필요함 */
const loginUserAPI = loginData => {
    // console.log('4. loginUserAPI 발동 -> axios.post 요청 보냄')
    console.log(loginData, 'authSaga/loginData');
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    // server측으로 post 요청 (express가 받고 router 처리)
    return axios.post('api/auth', loginData, config);
};

function* loginUser(action) {
    // console.log('3. loginUser(action) 발동')
    try {
        // loginUserAPI에 action.payload를 인자로 보내면서 실행 -> axios.post 결과 받아옴
        const result = yield call(loginUserAPI, action.payload);
        yield put({
            type: LOGIN_SUCCESS,
            // server/routes/api/auth에서 res 에 넘긴 {token, user} 객체 data를 payload로 보냄
            payload: result.data,
        });
    } catch (e) {
        // try 문 중간에 에러 발생 시 LOGIN_FAILURE로 상태 변화 요청하고 에러 보냄
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response,
        });
    }
}

// LoginUser 감시 함수 : LOGIN_REQUEST를 기다렸다가 오면 loginUser 함수 실행
function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser);
}

/** LOGOUT
 * 서버와 통신할 필요가 없다.
 */
function* logoutUser() {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: LOGOUT_FAILURE,
        });
    }
}

function* watchLogoutUser() {
    yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

/** USER LOADING */
const userLoadingAPI = token => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.get('api/auth/user', config);
};

function* userLoading(action) {
    try {
        const result = yield call(userLoadingAPI, action.payload);

        console.log('userLoading 후, result :', result);
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        console.log('userLoading 실패 ');
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchuserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

function* clearError() {
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        });
        console.error(e);
    }
}

function* watchclearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

export default function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchuserLoading), fork(watchclearError)]);
}
