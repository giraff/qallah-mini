import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TOME_REQUEST, TOME_ANSWER_RECEIVE_REQUEST, TOME_ANSWER_UPLOAD_REQUEST, TOME_INIT } from '../../redux/types';

const QuestionToMeDetail = () => {
    const ToMeObj = useSelector(state => state.tomedetail.payload);
    const ToMeChk = useSelector(state => state.tomedetail.isToMe);
    const ToMeReceiveChk = useSelector(state => state.tomedetail.isToMeAnswerReceive);
    const dispatch = useDispatch();
    const history = useHistory();
    // 처음렌더링 됬을때만 state에 질문들을 넣어두고,
    // 다음 렌더링부터는 이전 답변내용을 불러온 값들이 state에 저장되어있어서 Question 객체를 따로 만듬
    const [QuestionObj, setQuestionValues] = useState();
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
        console.log('ToMeDetail Render');
        dispatch({
            type: TOME_REQUEST,
        });
        console.log('렌더 종료', ToMeChk);
        // 내가 보는 나 컴포넌트 종료 시, 상태값 초기화
        return () => {
            console.log('창 사라짐');
            dispatch({
                type: TOME_INIT,
            });
        };
    }, []);

    // 두 번째 useEffect는 첫 화면에서 첫 질문이 로딩되지 않는 이슈의 해결을 위한 것
    useEffect(() => {
        if (ToMeChk) {
            setValues({
                ...form,
                question_context: ToMeObj.data[question_seq].question_content,
                question_length: ToMeObj.data.length,
            });
        } else {
            console.log(ToMeChk);
        }
        setQuestionValues(ToMeObj);
    }, [ToMeChk]);

    // 세 번째 useEffect는 질문이 바뀔 때 마다, 이전 답변내용들 DB에서 가져오기 위한 것
    useEffect(() => {
        console.log('ToMeDetailAnswerReceive Render');
        const body = {
            question_seq: question_seq + 1,
            token: localStorage.getItem('token'),
        };
        dispatch({
            type: TOME_ANSWER_RECEIVE_REQUEST,
            payload: body,
        });
        console.log('ToMeReceive useEffect 발동', body);
        console.log('상태엔 뭐가있나', ToMeObj.data);
    }, [form.question_seq]);

    // 네 번째 useEffect는 state에 저장된 답변이 잘 도착했는지 확인하는 것
    useEffect(() => {
        console.log('지금의 ToMeObj는?? >> ', ToMeObj.data);
        if (ToMeObj.data !== undefined) {
            setValues({
                ...form,
                question_answer: ToMeObj.data.answer_content,
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
    }, [ToMeReceiveChk]);

    const { question_seq } = form;

    const onChange = e => {
        const { value } = e.target;
        console.log(value === ' ');
        if (value === ' ') {
            seterrCheck(true);
            setValues({
                ...form,
                question_answer: '',
            });
        } else {
            seterrCheck(false);
            setValues({
                ...form,
                question_answer: value,
            });
        }
    };
    const next_question = e => {
        e.preventDefault();
        const body = {
            question_seq: question_seq + 1,
            answer_context: form.question_answer,
            token: localStorage.getItem('token'),
        };
        if (body.answer_context !== '') {
            dispatch({
                type: TOME_ANSWER_UPLOAD_REQUEST,
                payload: body,
            });
            console.log('잠깐 확인', QuestionObj.data);
            setValues({
                ...form,
                question_seq: question_seq + 1,
                question_context: QuestionObj.data[question_seq + 1].question_content,
                question_answer: '',
                next_button: false,
                prev_button: false,
            });
            seterrCheck(false);
            console.log('다음질문', form);
        } else {
            seterrCheck(true);
        }
    };

    const prev_question = e => {
        e.preventDefault();
        const body = {
            question_seq: question_seq + 1,
            answer_context: form.question_answer,
            token: localStorage.getItem('token'),
        };
        if (body.answer_context !== '') {
            dispatch({
                type: TOME_ANSWER_UPLOAD_REQUEST,
                payload: body,
            });
            setValues({
                ...form,
                question_seq: question_seq - 1,
                question_context: QuestionObj.data[question_seq - 1].question_content,
                question_answer: '',
                next_button: false,
                prev_button: question_seq - 1 === 0,
            });
            seterrCheck(false);
            console.log('이전질문', form);
        } else {
            seterrCheck(true);
        }
    };

    const done = e => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-expressions
        const body = {
            question_seq: question_seq + 1,
            answer_context: form.question_answer,
            token: localStorage.getItem('token'),
        };
        if (body.answer_context !== '') {
            dispatch({
                type: TOME_ANSWER_UPLOAD_REQUEST,
                payload: body,
            });
            seterrCheck(false);
            history.push(`/tome/done`);
        } else {
            seterrCheck(true);
        }
    };

    const done_phr = (
        <button className="move move-next" type="button" onClick={done} disabled={form.next_button}>
            <i className="fas fa-chevron-right fa-3x" />
        </button>
    );

    const next_phr = (
        <button className="move move-next" type="button" onClick={next_question} disabled={form.next_button}>
            <i className="fas fa-chevron-right fa-3x" />
        </button>
    );

    const prev_phr = (
        <button className="move move-pre" type="button" onClick={prev_question} disabled={form.prev_button}>
            <i className="fas fa-chevron-left fa-3x" />
        </button>
    );
    return (
        <div className="list-container tome-list-container">
            {/* <div>{form.question_seq+1}. {form.question_context}</div><br/> */}
            {/* <input onChange={onChange}  value={form.question_answer} placeholder="답변을 입력해 주세요"></input> */}
            <div className="move-wrap">
                <div className="list-page-count">{`${form.question_seq + 1}`}/20</div>
                {form.question_seq + 1 === 1 ? null : prev_phr}
                {form.question_seq + 1 === form.question_length ? done_phr : next_phr}
            </div>
            <div className="progress-on">
                <div className="progress-bar" style={{ width: `${((form.question_seq + 1) / 20) * 100}%`, backgroundColor: '#7b5e9e' }} />
            </div>
            <div className="tome-qna">
                <div className="tome-question-field">
                    <div className="tome-question-num">{form.question_seq + 1}.&nbsp;</div>
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

export default QuestionToMeDetail;
