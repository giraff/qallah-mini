import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { TOME_REQUEST, TOME_ANSWER_RECEIVE_REQUEST, TOME_ANSWER_UPLOAD_REQUEST } from '../../redux/types';

const QuestionToMeDetail = () => {
    const ToMeObj = useSelector(state => state.tomedetail.payload);
    const ToMeChk = useSelector(state => state.tomedetail.isToMe);

    const dispatch = useDispatch();
    const history = useHistory();

    const [form, setValues] = useState({
        question_seq: 0,
        question_context: '',
        question_answer: '',
        next_button: false,
        prev_button: true,
        question_length: 0,
    });

    // 첫 번째 useEffect는 DB에서 질문을 조회하기 위한 것
    useEffect(() => {
        console.log('ToMeDetail Render');
        dispatch({
            type: TOME_REQUEST,
        });
        console.log('렌더 종료', ToMeChk);
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
        console.log('ToMeReceive useEffect 발동', ToMeObj);
    }, []);

    const { question_seq } = form;

    const onChange = e => {
        const { value } = e.target;
        console.log(value);
        setValues({
            ...form,
            question_answer: value,
        });
    };
    const next_question = e => {
        e.preventDefault();
        const body = {
            question_seq: question_seq + 1,
            answer_context: form.question_answer,
            token: localStorage.getItem('token'),
        };
        dispatch({
            type: TOME_ANSWER_UPLOAD_REQUEST,
            payload: body,
        });
        setValues({
            ...form,
            question_seq: question_seq + 1,
            question_context: ToMeObj.data[question_seq + 1].question_content,
            question_answer: '',
            next_button: false,
            prev_button: false,
        });
        console.log('다음질문', form);
    };

    const prev_question = e => {
        e.preventDefault();
        const body = {
            question_seq: question_seq - 1,
            answer_context: form.question_answer,
            token: localStorage.getItem('token'),
        };
        dispatch({
            type: TOME_ANSWER_UPLOAD_REQUEST,
            payload: body,
        });
        setValues({
            ...form,
            question_seq: question_seq - 1,
            question_context: ToMeObj.data[question_seq - 1].question_content,
            question_answer: '',
            next_button: false,
            prev_button: question_seq - 1 === 0,
        });
        console.log('이전질문', form);
    };

    const done = e => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-expressions
        history.push(`/tome/done`);
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
                    <i className="fas fa-trash" />
                </div>
                <div className="answer-add-btn">
                    <i className="fas fa-plus" />
                </div>
            </div>
        </div>
    );
};

export default QuestionToMeDetail;
