import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ANSWER_LOAD_REQUEST } from 'redux/types';
import AnswerYearList from './answer-year-list';

const AnswerList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        dispatch({
            type: ANSWER_LOAD_REQUEST,
            payload: token,
        });
    }, []);
    return <AnswerYearList />;
};

export default AnswerList;
