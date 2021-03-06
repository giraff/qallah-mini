import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    TOME_REQUEST,
    TOME_SUCCESS,
    TOME_FAILURE,
    TOME_ANSWER_RECEIVE_REQUEST,
    TOME_ANSWER_RECEIVE_SUCCESS,
    TOME_ANSWER_RECEIVE_FAILURE,
    TOME_ANSWER_UPLOAD_SUCCESS,
    TOME_ANSWER_UPLOAD_FAILURE,
    TOME_ANSWER_UPLOAD_REQUEST,
} from '../../../redux/types';

/** ToMeDetail : 서버와 통신 필요함 */
const ToMeDetailAPI = ToMeData => {
    console.log('ToMeDetailAPI 발동 -> axios.post 요청 보냄');
    console.log(ToMeData, 'ToMeDetail/ToMeData');
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    // server측으로 post 요청 (express가 받고 router 처리)
    return axios.get('/api/tome/detail', ToMeData, config);
};

function* ToMeDetail(action) {
    console.log('ToMeDetail(action) 발동');
    try {
        // ToMeDetailAPI에 action.payload를 인자로 보내면서 실행 -> axios.get 결과 받아옴
        const result = yield call(ToMeDetailAPI, action.payload);
        console.log('api/tome/detail 에서 받아온 결과값', result);
        yield put({
            type: TOME_SUCCESS,
            // server/routes/tome/detail에서 res 에 넘긴 {user} 객체 data를 payload로 보냄
            payload: result.data,
        });
    } catch (e) {
        // try 문 중간에 에러 발생 시 TOME_FAILURE로 상태 변화 요청하고 에러 보냄
        yield put({
            type: TOME_FAILURE,
            payload: e.response,
        });
    }
}
// RegUser 감시 함수 : TOME_REQUEST를 기다렸다가 오면 regUser 함수 실행
function* watchToMeDetail() {
    console.log('ToMeDetailSaga 발동, TOME_REQ');
    yield takeEvery(TOME_REQUEST, ToMeDetail);
}

/** ToMeAnswerReceive: 서버와 통신 필요함 */
const ToMeAnswerReceiveAPI = ToMeAnswerData => {
    console.log('ToMeAnswerReceiveAPI 발동 -> axios.get 요청 보냄');
    console.log(ToMeAnswerData, 'ToMeAnswerReceive/ToMeAnswerData');

    /**
     * 서충식 Comment
     * 1. ToMeAnswerData에서 token이랑 질문seq를 꺼냄
     * 2. 파라미터로 보낼꺼기 때문에 config객체에 params속성을 사용해서 질문 seq만 따로 실음 (이렇게하면 Header가 아닌 쿼리스트링으로 날라감)
     *    GET 방식은 request body에 실어보내는게 아니라 쿼리 스트링으로 보내야하기 때문
     *    쿼리스트링은 /api/test?seq=1234 이런 방식
     * 3. 토큰이 존재하면 토큰도 config객체에 추가
     *    => 얘는 header에 실어 보내야하기때문에 params에 추가하면 안됨
     *
     */

    // 1번
    const { token, question_seq } = ToMeAnswerData;

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

    return axios.get('/api/tome/answer/receive', config);
};

function* ToMeAnswerReceive(action) {
    console.log('ToMeAnswerReceive(action) 발동');
    try {
        console.log('tome Answer Receive => ', action);
        // ToMeAnswerReceiveAPI에 action.payload를 인자로 보내면서 실행 -> axios.get 결과 받아옴
        const result = yield call(ToMeAnswerReceiveAPI, action.payload);
        console.log('api/tome/answer/receive 에서 받아온 결과값', result);
        yield put({
            type: TOME_ANSWER_RECEIVE_SUCCESS,
            // server/routes/tome/detail/answer 에서 res 에 넘긴 {user} 객체 data를 payload로 보냄
            payload: result.data,
        });
    } catch (e) {
        // try 문 중간에 에러 발생 시 TOME_FAILURE로 상태 변화 요청하고 에러 보냄
        yield put({
            type: TOME_ANSWER_RECEIVE_FAILURE,
            payload: e.response,
        });
    }
}

// ToMeAnswerReceive 감시 함수 : TOME_ANSWER_RECEIVE_REQUEST를 기다렸다가 오면 ToMeAnswerReceive 함수 실행
function* watchToMeAnswerReceive() {
    console.log('ToMeAnswerReceive 발동, TOME_ANS_REC_REQ');
    yield takeEvery(TOME_ANSWER_RECEIVE_REQUEST, ToMeAnswerReceive);
}

export default function* ToMeDetailSaga() {
    yield all([fork(watchToMeDetail), fork(watchToMeAnswerReceive), fork(watchToMeAnswerUpload)]);
}

/** ToMeAnswerUpload */
const ToMeAnswerUploadAPI = ToMeUploadData => {
    console.log('ToMeAnswerUploadAPI 발동 -> axios.post 요청보냄');
    console.log(ToMeUploadData, 'ToMeUploadData/ToMeUploadData');
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    const { token } = ToMeUploadData;

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post('/api/tome/detail/answer/store', ToMeUploadData, config);
};

function* ToMeAnswerUpload(action) {
    console.log('ToMeAnswerUpload(action) 발동');
    try {
        const result = yield call(ToMeAnswerUploadAPI, action.payload);
        console.log('데이터 넘어왔냐?', result);
        yield put({
            type: TOME_ANSWER_UPLOAD_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: TOME_ANSWER_UPLOAD_FAILURE,
            payload: e.response,
        });
    }
}

function* watchToMeAnswerUpload() {
    console.log('ToMeAnswerUpload 발동, TOME_ANS_UPL_REQ');
    yield takeEvery(TOME_ANSWER_UPLOAD_REQUEST, ToMeAnswerUpload);
}
