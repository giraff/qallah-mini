import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    MYAC_RECEIVE_REQUEST,
    MYAC_RECEIVE_SUCCESS,
    MYAC_RECEIVE_FAILURE,
    MYAC_SEND_PREVPW_SUCCESS,
    MYAC_SEND_PREVPW_FAILURE,
    MYAC_SEND_PREVPW_REQUEST,
    MYAC_UPDATE_SUCCESS,
    MYAC_UPDATE_FAILURE,
    MYAC_UPDATE_REQUEST,
} from '../../../redux/types';

const MyacDetailAPI = MyacData => {
    console.log('MyacDetailAPI 발동 -> axios.get 요청 보냄');
    console.log(MyacData, 'Myacdetail/MyacData');
    const { token } = MyacData;
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.get('/api/myaccount/detail', config);
};

function* MyacDetail(action) {
    console.log('MyacDetail(action) 발동');
    try {
        const result = yield call(MyacDetailAPI, action.payload);
        yield put({
            type: MYAC_RECEIVE_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: MYAC_RECEIVE_FAILURE,
            payload: e.response,
        });
    }
}

function* watchMyacDetail() {
    console.log('MyacDetailSaga 발동, MYAC_REQ');
    yield takeEvery(MYAC_RECEIVE_REQUEST, MyacDetail);
}

const MyacPrevPwAPI = MyacData => {
    console.log('MyacPrevPWAPI 발동 -> axios.post 요청 보냄');
    console.log('Data >> ', MyacData);
    const { pw, token } = MyacData;
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post('/api/myaccount/pw', MyacData, config);
};

function* MyacPrevPw(action) {
    console.log('MyacPrevPW(action) 발동');
    try {
        const result = yield call(MyacPrevPwAPI, action.payload);
        yield put({
            type: MYAC_SEND_PREVPW_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: MYAC_SEND_PREVPW_FAILURE,
            paylaod: e.response,
        });
    }
}

function* watchMyacPrevPw() {
    console.log('MyacPrevPWSaga 발동, MYAC_PREVPW_REQ');
    yield takeEvery(MYAC_SEND_PREVPW_REQUEST, MyacPrevPw);
}

const MyacUpdateAPI = MyacData => {
    console.log('MyacUpdateAPI 발동 -> axios.post 요청 보냄');
    const { token } = MyacData;
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post('/api/myaccount/update', MyacData, config);
};

function* MyacUpdate(action) {
    console.log('MyacUpdate(action) 발동');
    try {
        const result = yield call(MyacUpdateAPI, action.payload);
        yield put({
            type: MYAC_UPDATE_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: MYAC_UPDATE_FAILURE,
            paylaod: e.response,
        });
    }
}

function* watchMyacUpdate() {
    console.log('MyacUpdateSaga 발동, MYAC_UPDATE_REQ');
    yield takeEvery(MYAC_UPDATE_REQUEST, MyacUpdate);
}

export default function* MyacDetailSaga() {
    yield all([fork(watchMyacDetail), fork(watchMyacPrevPw), fork(watchMyacUpdate)]);
}
