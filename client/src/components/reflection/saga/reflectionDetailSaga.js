import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    REFL_REQUEST,
    REFL_SUCCESS,
    REFL_FAILURE,
    REFL_ANSWER_RECEIVE_REQUEST,
    REFL_ANSWER_RECEIVE_SUCCESS,
    REFL_ANSWER_RECEIVE_FAILURE,
    REFL_ANSWER_UPLOAD_SUCCESS,
    REFL_ANSWER_UPLOAD_FAILURE,
    REFL_ANSWER_UPLOAD_REQUEST,
} from '../../../redux/types';

/** ReflDetail : 서버와 통신 필요함 */
const ReflDetailAPI = ReflData => {
    console.log('ReflDetailAPI 발동 -> axios.post 요청 보냄');
    console.log(ReflData, 'ReflDetail/ReflData');
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    // server측으로 post 요청 (express가 받고 router 처리)
    return axios.get('/api/refl/detail', ReflData, config);
};

function* ReflDetail(action) {
    console.log('ReflDetail(action) 발동');
    try {
        // ReflDetailAPI에 action.payload를 인자로 보내면서 실행 -> axios.get 결과 받아옴
        const result = yield call(ReflDetailAPI, action.payload);
        console.log('api/refl/detail 에서 받아온 결과값', result);
        yield put({
            type: REFL_SUCCESS,
            // server/routes/refl/detail에서 res 에 넘긴 {user} 객체 data를 payload로 보냄
            payload: result.data,
        });
    } catch (e) {
        // try 문 중간에 에러 발생 시 REFL_FAILURE로 상태 변화 요청하고 에러 보냄
        yield put({
            type: REFL_FAILURE,
            payload: e.response,
        });
    }
}
// RegUser 감시 함수 : REFL_REQUEST를 기다렸다가 오면 regUser 함수 실행
function* watchReflDetail() {
    console.log('ReflDetailSaga 발동, REFL_REQ');
    yield takeEvery(REFL_REQUEST, ReflDetail);
}

/** ToMeAnswerReceive: 서버와 통신 필요함 */
const ReflAnswerReceiveAPI = ReflAnswerData => {
    console.log('ReflAnswerReceiveAPI 발동 -> axios.get 요청 보냄');
    console.log(ReflAnswerData, 'ReflAnswerReceive/ReflAnswerData');

    /**
     * 서충식 Comment
     * 1. ReflAnswerData에서 token이랑 질문seq를 꺼냄
     * 2. 파라미터로 보낼꺼기 때문에 config객체에 params속성을 사용해서 질문 seq만 따로 실음 (이렇게하면 Header가 아닌 쿼리스트링으로 날라감)
     *    GET 방식은 request body에 실어보내는게 아니라 쿼리 스트링으로 보내야하기 때문
     *    쿼리스트링은 /api/test?seq=1234 이런 방식
     * 3. 토큰이 존재하면 토큰도 config객체에 추가
     *    => 얘는 header에 실어 보내야하기때문에 params에 추가하면 안됨
     *
     */

    // 1번
    const { token, question_seq } = ReflAnswerData;

    // 2번
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
        params: {
            question_seq,
        },
    };

    // 3번
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.get('/api/refl/answer/receive', config);
};

function* ReflAnswerReceive(action) {
    console.log('ReflAnswerReceive(action) 발동');
    try {
        console.log('tome Answer Receive => ', action);
        // ReflAnswerReceiveAPI에 action.payload를 인자로 보내면서 실행 -> axios.get 결과 받아옴
        const result = yield call(ReflAnswerReceiveAPI, action.payload);
        console.log('api/tome/answer/receive 에서 받아온 결과값', result);
        yield put({
            type: REFL_ANSWER_RECEIVE_SUCCESS,
            // server/routes/refl/detail/answer 에서 res 에 넘긴 {user} 객체 data를 payload로 보냄
            payload: result.data,
        });
    } catch (e) {
        // try 문 중간에 에러 발생 시 REFL_FAILURE로 상태 변화 요청하고 에러 보냄
        yield put({
            type: REFL_ANSWER_RECEIVE_FAILURE,
            payload: e.response,
        });
    }
}

// ReflAnswerReceive 감시 함수 : REFL_ANSWER_RECEIVE_REQUEST를 기다렸다가 오면 ReflAnswerReceive 함수 실행
function* watchReflAnswerReceive() {
    console.log('ReflAnswerReceive 발동, TOME_ANS_REC_REQ');
    yield takeEvery(REFL_ANSWER_RECEIVE_REQUEST, ReflAnswerReceive);
}

export default function* ReflDetailSaga() {
    yield all([fork(watchReflDetail), fork(watchReflAnswerReceive), fork(watchReflAnswerUpload)]);
}

/** ToMeAnswerUpload */
const ReflAnswerUploadAPI = ReflUploadData => {
    console.log('ReflAnswerUploadAPI 발동 -> axios.post 요청보냄');
    console.log(ReflUploadData, 'ReflUploadData/ReflUploadData');
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    const { token } = ReflUploadData;

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post('/api/refl/detail/answer/store', ReflUploadData, config);
};

function* ReflAnswerUpload(action) {
    console.log('ReflAnswerUpload(action) 발동');
    try {
        const result = yield call(ReflAnswerUploadAPI, action.payload);
        console.log('데이터 넘어왔냐?', result);
        yield put({
            type: REFL_ANSWER_UPLOAD_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: REFL_ANSWER_UPLOAD_FAILURE,
            payload: e.response,
        });
    }
}

function* watchReflAnswerUpload() {
    console.log('ReflAnswerUpload 발동, REFL_ANS_UPL_REQ');
    yield takeEvery(REFL_ANSWER_UPLOAD_REQUEST, ReflAnswerUpload);
}
