import React from 'react';

const AnswerList = () => (
    <>
        <div className="category category-year">
            <div className="label label-year">2020</div>
            <div className="category category-month">
                <div className="label label-month">9월</div>
                <div className="category category-day">
                    <div className="label label-day">19일</div>
                    <div className="my-answer-container">
                        {/* <Link className="my-answer-elem expr-answer">내가 한 경험</Link> */}
                        <div className="my-answer-elem me-answer">내가 보는 나</div>
                        {/* <Link className="my-answer-elem reflection-answer">오늘의 성찰</Link> */}
                    </div>
                </div>
                <div className="day-wrap category-day" />
                <div className="day-wrap category-day" />
            </div>
            <div className="category category-month">
                <div className="label label-month">8월</div>
            </div>
            <div className="category category-month">
                <div className="label label-month">5월</div>
            </div>
        </div>
    </>
);

export default AnswerList;
