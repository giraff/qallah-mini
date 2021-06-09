import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BYOTHER_UPLOAD_REQUEST, BYOTHER_ANSWER_LOADING_REQUEST } from '../../redux/types';

// 전역변수
// const answers = [];

const ByOtherQuestion = ({ req }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { answer } = useSelector(state => state.byother);
    // 현재 페이지 번호
    const [currentPage, setCurrentPage] = useState(parseInt(req.match.params.id, 10));
    /** 질문 관련 state */
    // 질문 총 개수
    const [qlength, setQLength] = useState(0);
    // 현재 페이지에 표시할 질문
    const [questions, setQuestions] = useState('');
    /** 답변 관련 state */
    // input 필드 값
    const [answerContent, setAnswerContent] = useState('');
    // input 필드 값 변경 여부 (true/false)
    // const [inputChange, setInputChange] = useState(false);

    // 질문 불러오기 API
    const getQuestionAPI = async page => {
        try {
            console.log('질문 LOAD');
            // 질문 총 개수 가져오기
            const allquestion = await axios.get(`api/byother/detail`);
            setQLength(allquestion.data.length);
            // 각 페이지에 표시할 질문 가져오기
            const res = await axios.get(`api/byother/detail/${page}`);
            return res.status === 200 ? res.data : 'error';
        } catch (err) {
            return err;
        }
    };

    // 답변 불러오기 API
    const postAnswer = async page => {
        console.log('답변 LOAD');
        const token = localStorage.getItem('token');

        const body = { page, token };
        dispatch({
            type: BYOTHER_ANSWER_LOADING_REQUEST,
            payload: body,
        });
    };

    useEffect(() => {
        console.log('페이지 이동');
        history.push(`/byother/detail/${currentPage}`);
        getQuestionAPI(currentPage).then(data => setQuestions(data));
        postAnswer(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setAnswerContent(answer);
    }, [answer]);

    // 인풋 필드 변경할 때마다 실행
    const onChange = e => {
        // setInputChange(true);
        const { value } = e.target;
        // 1. 인풋창에 입력한 value 값을 answerContent에 저장
        setAnswerContent(value);
    };

    // 이전, 다음 버튼
    const onClickEvent = name => {
        console.log('버튼 Click', name, currentPage);
        const body = {
            page: currentPage,
            answerData: answerContent,
            token: localStorage.getItem('token'),
        };

        dispatch({
            type: BYOTHER_UPLOAD_REQUEST,
            payload: body,
        });

        if (name === 'prev') {
            if (currentPage > 1) {
                // 이전 페이지 이동
                setCurrentPage(currentPage - 1);
                // history.push(`/byother/detail/${currentPage}`);
            }
        } else if (name === 'next') {
            if (currentPage < qlength) {
                console.log('next');
                // 다음 페이지 이동
                setCurrentPage(currentPage + 1);
                // history.push(`/byother/detail/${currentPage}`);
            }
        } else if (name === 'finish') {
            history.push('/byother/done');
        }
    };

    // 이동 버튼
    const bottomNav = (
        <>
            {currentPage === qlength ? (
                <>
                    <button className="move move-pre" type="button" onClick={() => onClickEvent('prev')}>
                        <i className="fas fa-chevron-left fa-3x" />
                    </button>
                    <button className="move move-next" type="button" onClick={() => onClickEvent('finish')}>
                        <i className="fas fa-check fa-3x" />
                    </button>
                </>
            ) : (
                <>
                    <button className="move move-pre" type="button" onClick={() => onClickEvent('prev')}>
                        <i className="fas fa-chevron-left fa-3x" />
                    </button>
                    <button className="move move-next" type="button" onClick={() => onClickEvent('next')}>
                        <i className="fas fa-chevron-right fa-3x" />
                    </button>
                </>
            )}
        </>
    );

    const Body = (
        <>
            <div>
                {(() => (
                    <div className="list-container byother-list-container">
                        <div className="move-wrap">
                            <div className="list-page-count">{questions.other_question_seq}/15</div>
                            {bottomNav}
                        </div>
                        <div className="progress-on">
                            <div
                                className="progress-bar"
                                style={{ width: `${(questions.other_question_seq / 15) * 100}%`, backgroundColor: '#9e8d5e' }}
                            />
                        </div>
                        <div className="byother-qna">
                            <div className="byother-question-field">
                                <div className="byother-question-num">{questions !== '' && questions.other_question_seq}.</div>
                                <div className="byother-question-title">{questions !== '' && questions.other_question_content}</div>
                            </div>
                            <div className="byother-answer-field">
                                <input
                                    className="answer-input"
                                    type="text"
                                    value={answerContent}
                                    onChange={onChange}
                                    placeholder="답변을 입력해주세요"
                                />
                                <i className="fas fa-trash" />
                            </div>
                            <div className="answer-add-btn">
                                <i className="fas fa-plus" />
                            </div>
                        </div>
                    </div>
                ))()}
            </div>
        </>
    );

    return <div>{Body}</div>;
};

export default ByOtherQuestion;
