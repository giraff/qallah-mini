import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { REFL_REQUEST, REFL_ANSWER_RECEIVE_REQUEST, REFL_ANSWER_UPLOAD_REQUEST, REFL_INIT } from '../../redux/types';

const ReflectionDetail = () => {
    const ReflObj = useSelector(state => state.refl.payload);
    const ReflChk = useSelector(state => state.refl.isRefl);
    const ReflReceiveChk = useSelector(state => state.refl.isReflAnswerReceive);
    const dispatch = useDispatch();
    const history = useHistory();
    // 처음렌더링 됬을때만 state에 질문들을 넣어두고,
    // 다음 렌더링부터는 이전 답변내용을 불러온 값들이 state에 저장되어있어서 Question 객체를 따로 만듬
    const [form, setValues] = useState({
        question_seq: 0,
        question_context: '',
        question_answer: '',
        next_button: false,
        prev_button: true,
        question_length: 0,
    });
    const [errcheck, seterrCheck] = useState(false);

    // 첫 번째 useEffect는 DB에서 질문을 조회하기 위한 것
    useEffect(() => {
        console.log('REFLDetail Render');
        dispatch({
            type: REFL_REQUEST,
        });
        console.log('렌더 종료', ReflChk);
        // 내가 보는 나 컴포넌트 종료 시, 상태값 초기화
        return () => {
            console.log('창 사라짐');
            dispatch({
                type: REFL_INIT,
            });
        };
    }, []);

    // 두 번째 useEffect는 첫 화면에서 첫 질문이 로딩되지 않는 이슈의 해결을 위한 것
    useEffect(() => {
        if (ReflChk) {
            const randindex = Math.floor(Math.random() * (ReflObj.data.length - 1 - 0) + 0);
            console.log('랜덤 넘버 -> ', randindex);
            setValues({
                ...form,
                question_seq: randindex,
                question_context: ReflObj.data[randindex].refl_content,
                question_length: ReflObj.data.length,
            });
        } else {
            console.log(ReflChk);
        }
        console.log('질문 불러오기 테스트 >> ', ReflObj);
    }, [ReflChk]);

    // 세 번째 useEffect는 질문이 바뀔 때 마다, 이전 답변내용들 DB에서 가져오기 위한 것
    useEffect(() => {
        console.log('REFLDetailAnswerReceive Render');
        const body = {
            question_seq: question_seq + 1,
            token: localStorage.getItem('token'),
        };
        dispatch({
            type: REFL_ANSWER_RECEIVE_REQUEST,
            payload: body,
        });
        console.log('REFLReceive useEffect 발동', body);
        console.log('상태엔 뭐가있나', ReflObj.data);
    }, [form.question_seq]);

    // 네 번째 useEffect는 state에 저장된 답변이 잘 도착했는지 확인하는 것
    useEffect(() => {
        console.log('지금의 REFLObj는?? >> ', ReflObj.data);
        if (ReflObj.data !== undefined) {
            setValues({
                ...form,
                question_answer: ReflObj.data.refl_answer_content,
            });
        } else {
            setValues({
                ...form,
                question_answer: '',
            });
        }
        /* setValues({
            ...form,
            question_answer: ToMeObj.data.answer_content,
        }); */
    }, [ReflReceiveChk]);

    const { question_seq } = form;

    const onChange = e => {
        const { value } = e.target;
        console.log(value);
        seterrCheck(false);
        setValues({
            ...form,
            question_answer: value,
        });
    };

    const done = e => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-expressions
        const body = {
            question_seq: question_seq + 1,
            answer_context: form.question_answer,
            token: localStorage.getItem('token'),
        };
        if (body.answer_context.trim() !== '') {
            dispatch({
                type: REFL_ANSWER_UPLOAD_REQUEST,
                payload: body,
            });
            seterrCheck(false);
            history.push(`/refl/done`);
        } else {
            seterrCheck(true);
        }
    };

    const done_phr = (
        <button className="move move-next" type="button" onClick={done} disabled={form.next_button}>
            <i className="fas fa-chevron-right fa-3x" />
        </button>
    );

    return (
        <div className="list-container tome-list-container">
            {/* <div>{form.question_seq+1}. {form.question_context}</div><br/> */}
            {/* <input onChange={onChange}  value={form.question_answer} placeholder="답변을 입력해 주세요"></input> */}
            <div className="move-wrap">
                <div className="list-page-count">{`${1}`}/1</div>
                {done_phr}
            </div>
            <div className="progress-on">
                <div className="progress-bar" style={{ width: `${(1 / 1) * 100}%`, backgroundColor: '#7b5e9e' }} />
            </div>
            <div className="tome-qna">
                <div className="tome-question-field">
                    {/* <div className="tome-question-num">{form.question_seq + 1}.&nbsp;</div> */}
                    <div className="tome-question-title">{form.question_context}</div>
                </div>
                <div className="tome-answer-field">
                    <input className="answer-input" type="text" onChange={onChange} value={form.question_answer} placeholder="답변을 입력해 주세요" />
                    {errcheck ? (
                        <div className="err-wrap">
                            <div className="err-msg">답변을 빈칸으로 채울 수 없습니다.</div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ReflectionDetail;
