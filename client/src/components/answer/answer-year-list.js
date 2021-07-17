import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AnswerMonthList from './answer-month-list';

const AnswerYearList = () => {
    const { answers, currentYear } = useSelector(state => state.answer);

    useEffect(() => {
        console.log(currentYear);
        console.log(answers);
    });
    return (
        <>
            <div className="category category-year">
                <div className="label label-year">{currentYear}</div>
                <AnswerMonthList currentYear={currentYear} />
            </div>
        </>
    );
};

export default AnswerYearList;
