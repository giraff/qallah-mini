import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BYOTHER_UPLOAD_REQUEST } from '../../redux/types';

// 전역변수
const answers = [];

const ByOtherQuestion = ({ req }) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
    const [inputChange, setInputChange] = useState(false);

    // 질문 불러오기 API
    const getQuestionAPI = async page => {
        try {
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
    // React Hooks : url에 질문 요청 페이지가 변경될 때마다 실행
    useEffect(() => {
        const requestPage = req.match.params.id;
        getQuestionAPI(requestPage).then(data => setQuestions(data));
    }, [req.match.params.id]);

    // 인풋 필드 변경할 때마다 실행
    const onChange = e => {
        setInputChange(true);
        const { value } = e.target;
        setAnswerContent(value);
    };
    // prev, next 버튼 클릭때마다 실행
    const onClickEvent = name => {
        // 이미 답변을 저장한 질문인 경우, alreadySaved(flag)는 true가 된다.
        let alreadySaved = false;
        let inputFlag = false;

        // defaultProps의 각 배열 훑으며
        answers.forEach(value => {
            // 해당 질문에 이미 작성한 답변 있다면
            if (inputChange && value.answer_seq === currentPage) {
                alreadySaved = true;
                // 기존 답변 덮어쓰기
                // eslint-disable-next-line no-param-reassign
                value.answer_content = answerContent;
            }
        });

        // 이전에 답변했던 질문이 아닌 경우
        if (inputChange && !alreadySaved) {
            // 새 답변 생성하기
            answers.push({ answer_seq: currentPage, answer_content: answerContent });
        }
        // 모든 답변 세이브가 끝이 나고 inputChange false로 다시 설정
        setInputChange(false);

        // 누른 버튼이 prev
        if (name === 'prev') {
            // 2~끝 페이지인 경우
            if (currentPage > 1) {
                // 1 ~ 끝 페이지 직전 페이지로 이동 (이전 질문으로)
                history.push(`/byother/detail/${currentPage - 1}`);
                setCurrentPage(currentPage - 1);
                // 예전에 작성해둔 답변 있으면, 이전 질문 페이지 input에 그 답변 표시
                answers.forEach(val => {
                    if (val.answer_seq === currentPage - 1) {
                        setAnswerContent(val.answer_content);
                        inputFlag = true;
                    }
                });

                if (!inputFlag) {
                    setAnswerContent('');
                }
            }
            if (currentPage === 1) {
                answers.forEach(val => {
                    if (val.answer_seq === currentPage) {
                        setAnswerContent(val.answer_content);
                        inputFlag = true;
                    }
                });
                if (!inputFlag) {
                    setAnswerContent('');
                }
            }
        } else if (name === 'next') {
            // 누른 버튼이 next
            if (currentPage < qlength) {
                // 다음 질문으로 이동
                history.push(`/byother/detail/${currentPage + 1}`);
                setCurrentPage(currentPage + 1);
                // 예전에 작성해둔 답변이 있다면 다음 질문 페이지 input에 그 답변 표시
                answers.forEach(val => {
                    if (val.answer_seq === currentPage + 1) {
                        setAnswerContent(val.answer_content);
                        inputFlag = true;
                    }
                });
                if (!inputFlag) {
                    setAnswerContent('');
                }
            }
        } else if (name === 'finish') {
            // 누른 버튼이 답변 완료 버튼
            // 로컬 스토리지에서 받아온 토큰을 답변 객체와 같이 UPLOAD 요청으로 보냄
            const resultarr = [];
            answers.forEach(val => {
                resultarr.push({
                    answer_seq: val.answer_seq,
                    answer_content: val.answer_content,
                });
            });
            // const result = answers.map((val) => val);

            const token = localStorage.getItem('token');
            const body = { resultarr, token };

            dispatch({
                type: BYOTHER_UPLOAD_REQUEST,
                payload: body,
            });
            // 질문 완료 페이지로 이동
            history.push('/byother/done');
            answers.splice(0);
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
