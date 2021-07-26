import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const AnswerComponent = ({ currentMonth, currentDay }) => {
    const { answers, currentYear } = useSelector(state => state.answer);
    const [types, setTypes] = useState([]);
    const history = useHistory();
    useEffect(() => {
        console.log('compoenent');
        const newArr =
            answers !== ''
                ? [
                      ...new Set(
                          answers.map(answer =>
                              answer.YEAR === currentYear && answer.MONTH === currentMonth && answer.DAY === currentDay ? answer.TYPE : '',
                          ),
                      ),
                  ].filter(val => val !== '')
                : '';
        setTypes(newArr);
    }, []);

    const handleClickEvent = type => {
        history.push(`/profile/answer/view?type=${type}&year=${currentYear}&month=${currentMonth}&day=${currentDay}`);
    };
    return (
        <>
            {types &&
                types !== [] &&
                types.map(type => (
                    <button type="button" className={`my-answer-elem ${type}-btn lang-kor`} onClick={() => handleClickEvent(type)} key={type}>
                        {type === 'answerbyme' ? '내가 보는 나' : ''}
                        {type === 'answerbyothers' ? '남이 보는 나' : ''}
                        {type === 'answerforrefl' ? '오늘의 성찰' : ''}
                    </button>
                ))}
        </>
    );
};

export default AnswerComponent;
