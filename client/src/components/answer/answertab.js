import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ANSWER_YEAR_SET_REQUEST } from 'redux/types';

const AnswerTab = () => {
    const dispatch = useDispatch();
    const { answers, currentYear } = useSelector(state => state.answer);
    const [yearTab, setYearTab] = useState([]);

    useEffect(() => {
        if (answers) {
            const newArr = [...new Set(answers.map(answer => answer.YEAR))];
            // const uniqueArr = newArr.filter((elem, index) => newArr.indexOf(elem) === index);
            console.log(newArr[newArr.length - 1]);
            setYearTab(newArr);
        }
    }, [answers]);

    const handleClickEvent = date => {
        dispatch({
            type: ANSWER_YEAR_SET_REQUEST,
            payload: date,
        });
    };
    return (
        <>
            <div className="content-header">연도별</div>
            <ul className="filter-list">
                {yearTab &&
                    yearTab.map(year => (
                        <li key={year}>
                            <button className="year-link" type="button" onClick={() => handleClickEvent(year)}>
                                {year}
                            </button>
                        </li>
                    ))}
            </ul>
            {currentYear === '' ? <div className="year-click-text">※&nbsp;연도에 해당하는 탭을 눌러주세요</div> : null}
        </>
    );
};

export default AnswerTab;
