import React, { useEffect, useState,Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,Link } from "react-router-dom";

const QuestiontomeMain = () => {
    return (
        <Fragment>
            <div>
                <Link to="/tome/detail">
                    <button>시작 하기</button>
                </Link>
                <Link to="/tome/history">
                    <button>이전 답변보기</button>
                </Link>
                <Link to="../">
                    <button>홈으로 돌아가기</button>
                </Link>
            </div>
        </Fragment>
    );
};

export default QuestiontomeMain;