import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BYOTHER_UPLOAD_REQUEST, BYOTHER_ANSWER_LOADING_REQUEST, BYOTHER_DETAIL_DELETE_REQUEST } from '../../redux/types';

const ByOtherQuestion = ({ req }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // 현재 페이지 번호
    const [currentPage, setCurrentPage] = useState(parseInt(req.match.params.id, 10));
    // 질문 총 개수 (= 페이지 개수)
    const [total, setTotal] = useState(0);
    // 질문
    const [questionContent, setQuestionContent] = useState('');
    // 답변
    const [answerContent, setAnswerContent] = useState('');
    // 불러온 이전 답변
    const { answer } = useSelector(state => state.byother);
    // input 변경 여부
    const [inputChange, setInputChange] = useState(false);

    const [inputEmptyError, setInputEmptyError] = useState(false);

    // 질문 불러오기 API
    const getQuestionAPI = async page => {
        try {
            console.log('질문 LOAD');
            // 질문 총 개수 가져와서 state 업데이트
            const questionTotal = await axios.get(`/api/byother/detail`);
            setTotal(questionTotal.data.length);
            // 표시할 질문 가져와서 return
            const res = await axios.get(`/api/byother/detail/${page}`);
            return res.status === 200 ? res.data : 'error';
        } catch (err) {
            return err;
        }
    };

    // 답변 불러오기 API
    const postAnswer = page => {
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
        // 질문 불러오기 API 실행 => return 값으로 questionContent state 업데이트
        getQuestionAPI(currentPage).then(data => setQuestionContent(data));
        // 답변 불러오기 API 실행
        postAnswer(currentPage);
        if (answer === '') setAnswerContent('');
    }, [currentPage]);

    useEffect(() => {
        setAnswerContent(answer);
    }, [answer]);

    // 인풋 필드 변경
    const onChange = e => {
        const { value } = e.target;
        // 인풋창의 value 값으로 answerContent state 업데이트
        setAnswerContent(value);
        setInputEmptyError(false);
        setInputChange(true);
    };

    // 이전, 다음 버튼 클릭
    const onClickEvent = name => {
        console.log('버튼 Click', name, currentPage);
        // 입력된 답변이 있으면
        if (answerContent.trim() !== '') {
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
                    // 이전 페이지로 state 업데이트
                    setCurrentPage(currentPage - 1);
                }
            } else if (name === 'next') {
                if (currentPage < total) {
                    console.log('next');
                    // 다음 페이지 state 업데이트
                    setCurrentPage(currentPage + 1);
                }
            } else if (name === 'finish') {
                history.push('/byother/done');
            }
        } else if (inputChange && (answerContent.trim() === '' || answerContent === null)) {
            // 답변을 수정했는데 빈 답변이라면 DB에서 삭제
            const body = {
                page: currentPage,
                token: localStorage.getItem('token'),
            };
            dispatch({
                type: BYOTHER_DETAIL_DELETE_REQUEST,
                payload: body,
            });
            setInputEmptyError(true);
        } else if (!inputChange && (answerContent.trim() === '' || answerContent === null)) {
            // 다음 질문으로 넘어간 뒤 (빈칸인 상태) 바로 이전 질문으로 이동할 경우 예외 처리
            setInputEmptyError(true);
        }

        setInputChange(false);
    };

    // 이동 버튼
    function renderBottomNav() {
        if (currentPage === total) {
            return (
                <>
                    <button className="move move-pre" type="button" onClick={() => onClickEvent('prev')}>
                        <i className="fas fa-chevron-left fa-3x" />
                    </button>
                    <button className="move move-finish" type="button" onClick={() => onClickEvent('finish')}>
                        <i className="fas fa-check fa-3x" />
                    </button>
                </>
            );
        }
        if (currentPage === 1) {
            return (
                <>
                    <button className="move move-next" type="button" onClick={() => onClickEvent('next')}>
                        <i className="fas fa-chevron-right fa-3x" />
                    </button>
                </>
            );
        }
        return (
            <>
                <button className="move move-pre" type="button" onClick={() => onClickEvent('prev')}>
                    <i className="fas fa-chevron-left fa-3x" />
                </button>
                <button className="move move-next" type="button" onClick={() => onClickEvent('next')}>
                    <i className="fas fa-chevron-right fa-3x" />
                </button>
            </>
        );
    }

    function renderResponsiveNav() {
        if (currentPage === total) {
            return (
                <>
                    <button className="prev-hidden" type="button" onClick={() => onClickEvent('prev')}>
                        <i className="fas fa-long-arrow-alt-left" />
                        &nbsp;&nbsp;이전
                    </button>
                    <button className="done-hidden" type="button" onClick={() => onClickEvent('finish')}>
                        완료
                    </button>
                </>
            );
        }
        if (currentPage === 1) {
            return (
                <>
                    <button className="next-hidden" type="button" onClick={() => onClickEvent('next')}>
                        다음&nbsp;&nbsp;
                        <i className="fas fa-long-arrow-alt-right" />
                    </button>
                </>
            );
        }
        return (
            <>
                <button className="prev-hidden" type="button" onClick={() => onClickEvent('prev')}>
                    <i className="fas fa-long-arrow-alt-left" />
                    &nbsp;&nbsp;이전
                </button>
                <button className="next-hidden" type="button" onClick={() => onClickEvent('next')}>
                    다음&nbsp;&nbsp;
                    <i className="fas fa-long-arrow-alt-right" />
                </button>
            </>
        );
    }

    const Body = (
        <>
            {(() => (
                <div className="list-container byother-list-container">
                    <div className="move-wrap">
                        <div className="list-page-count">
                            {questionContent.other_question_seq}/{total}
                        </div>
                        {renderBottomNav()}
                    </div>
                    <div className="progress-on">
                        <div
                            className="progress-bar"
                            style={{ width: `${(questionContent.other_question_seq / total) * 100}%`, backgroundColor: 'var(--color-main-blue)' }}
                        />
                    </div>
                    <div className="byother-qna">
                        <div className="byother-question-field">
                            <div className="byother-question-num">{questionContent !== '' && questionContent.other_question_seq}.&nbsp;</div>
                            <div className="byother-question-title lang-kor">{questionContent !== '' && questionContent.other_question_content}</div>
                        </div>
                        <div className="byother-answer-field">
                            <input
                                className="answer-input lang-kor"
                                type="text"
                                value={answerContent}
                                onChange={onChange}
                                placeholder="답변을 입력해주세요"
                            />
                        </div>
                        {inputEmptyError ? (
                            <div className="err-wrap">
                                <div className="err-msg">답변을 빈칸으로 채울 수 없습니다.</div>
                            </div>
                        ) : null}
                    </div>
                    <div className="byother-move-hidden move-hidden">{renderResponsiveNav()}</div>
                </div>
            ))()}
        </>
    );

    return <>{Body}</>;
};

export default ByOtherQuestion;
