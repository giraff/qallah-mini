import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ANSWER_DETAIL_LOAD_REQUEST } from 'redux/types';
import AnswerDayList from './answer-day-list';

const AnswerDetailComponent = ({ query }) => {
    const { year, month, day, type } = query;
    const dispatch = useDispatch();
    const history = useHistory();
    const { answerDetail } = useSelector(state => state.answer);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const body = { year, month, day, type, token };

        dispatch({
            type: ANSWER_DETAIL_LOAD_REQUEST,
            payload: body,
        });
    }, []);
    return (
        <div className="my-answer-container">
            <div className="my-answer-content">
                <div className="my-answer-header">
                    <button className="nav-btn btn-pre" type="button" onClick={() => history.goBack()}>
                        <i className="fas fa-chevron-left fa-2x" />
                    </button>
                    <div className="title-text">
                        {type === 'answerbyme' ? '내가 보는 나' : ''}
                        {type === 'answerbyothers' ? '남이 보는 나' : ''}
                        {type === 'answerforrefl' ? '오늘의 성찰' : ''}
                    </div>
                    <div className="date-text">{`${year}/${month}/${day}`}</div>
                </div>
                <div className="answers-wrapper">
                    {answerDetail &&
                        answerDetail !== '' &&
                        answerDetail.map(detail => (
                            <div key={detail.seq} className="answers">
                                <div className="question-field">{`Q${detail.seq}. ${detail.question}`} </div>
                                <div className="answer-field">
                                    <div className="answer-elem">{`${detail.answer}`}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AnswerDetailComponent;
