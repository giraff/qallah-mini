import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AnswerComponent = ({ currentMonth, currentDay }) => {
    const { answers, currentYear } = useSelector(state => state.answer);
    const [types, setTypes] = useState([]);

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
    return (
        <>
            {types &&
                types !== [] &&
                types.map(type => (
                    <Link to={`/profile/answer/view?type=${type}&year=${currentYear}&month=${currentMonth}&day=${currentDay}`} key={type}>
                        <button type="button" className={`my-answer-elem ${type}-btn lang-kor`}>
                            {type === 'answerbyme' ? '내가 보는 나' : ''}
                            {type === 'answerbyothers' ? '남이 보는 나' : ''}
                            {type === 'answerforrefl' ? '오늘의 성찰' : ''}
                        </button>
                    </Link>
                ))}
        </>
    );
};

export default AnswerComponent;
