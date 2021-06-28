import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AnswerComponent from './answer-component';

const AnswerDayList = ({ currentMonth }) => {
    const { answers, currentYear } = useSelector(state => state.answer);
    const [days, setDays] = useState([]);
    useEffect(() => {
        console.log('currentMonth =>', currentMonth);
        const newArr =
            answers !== ''
                ? [...new Set(answers.map(answer => (answer.YEAR === currentYear && answer.MONTH === currentMonth ? answer.DAY : '')))].filter(
                      val => val !== '',
                  )
                : '';
        setDays(newArr);
    }, [currentYear]);
    return (
        <>
            {days !== [] &&
                days.map(day => (
                    <div key={day} className="category category-day">
                        <div className="label label-day">{day}일</div>
                        <AnswerComponent currentMonth={currentMonth} currentDay={day} />
                    </div>
                ))}
        </>
    );
};

export default AnswerDayList;
