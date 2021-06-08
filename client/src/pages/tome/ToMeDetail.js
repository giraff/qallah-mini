import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import ToMeDetailComponent from '../../components/questiontome/ToMeDetail';
const QuestiontomeDetail = () => {
    return (
        <section className="sections">
            <div className="sections-overlay">
                {/* <h1>내가 보는 나 질문/답변</h1> */}
                <ToMeDetailComponent />
            </div>
        </section>
    );
};

export default QuestiontomeDetail;
