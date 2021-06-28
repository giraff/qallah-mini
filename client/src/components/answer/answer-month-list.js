import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AnswerDayList from './answer-day-list';

const AnswerMonthList = ({ currentYear }) => {
    const { answers } = useSelector(state => state.answer);
    const [months, setMonths] = useState([]);
    useEffect(() => {
        const monthArr =
            answers !== '' ? [...new Set(answers.map(answer => (answer.YEAR === currentYear ? answer.MONTH : '')))].filter(val => val !== '') : '';
        setMonths(monthArr);
    }, [currentYear]);
    return (
        <>
            {months &&
                months !== [] &&
                months.map(month => (
                    <div key={month} className="category category-month">
                        <div className="label label-month">{month}월</div>
                        <AnswerDayList currentMonth={month} />
                    </div>
                ))}
        </>
    );
};

export default AnswerMonthList;
