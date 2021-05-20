import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../types';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


const regUserAPI = (regData) => {
    console.log('regUserAPI 발동 -> axios.post 요청 보냄')
    console.log(regData,'regSaga/regData');
    const config = {
        headers: {
            "Content-type" : "application/json"
        }
    }

    return axios.post('/api/user/register', regData, config);
}

function* regUser(action) {
    console.log('regUser(action) 발동')
    try{
        const result = yield call(regUserAPI, action.payload);
        console.log(result);
        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data
        })
    } catch(e) {
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response
        })
    }
}

function* watchRegUser() {
    console.log('regSaga 발동, REGISTER_REQ');
    yield takeEvery(REGISTER_REQUEST,regUser);
}

export default function* regSaga() {
    yield all([
        fork(watchRegUser)
    ])
}