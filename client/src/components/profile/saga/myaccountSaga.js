import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { MYAC_RECEIVE_REQUEST, MYAC_RECEIVE_SUCCESS, MYAC_RECEIVE_FAILURE } from '../../../redux/types';

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

export default function* MyacDetailSaga() {
    yield all([fork(watchMyacDetail)]);
}
