/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const ReflectionMain = () => {
    const [reflcheck, setCheck] = useState(false);
    const history = useHistory();
    const linkObject = {
        reflFirstPage: `/refl/detail`,
        reflAnswerRecevieAll: `/api/refl/answer`,
    };
    const clickEvent = () => {
        history.push(`${linkObject.reflFirstPage}`);
    };
    const checkanswer = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        const result = await axios.get(`${linkObject.reflAnswerRecevieAll}`, config);

        if (result.data.length > 0) {
            setCheck(true);
        } else if (result.data.length === 0) {
            setCheck(false);
        }
    };
    // 성찰 답변 DB 에 데이터가 있는지 없는지 확인 하는 것
    useEffect(checkanswer, []);
    return (
        <section className="sections">
            <div className="sections-overlay">
                <div className="q-main-container">
                    <div className="q-main-title">
                        <h1>성찰</h1>
                    </div>
                    <div className="q-main-content">
                        <div className="question-description lang-kor">살아가면서 마주할 질문에 답해보세요</div>
                        <div className="reflection-description lang-kor">하루에 단 1개의 질문만 답변 가능합니다</div>
                        <div className="reflection-description lang-kor">답변 작성 후, 수정은 불가능하니 신중하게 답변해주세요</div>
                    </div>
                    <div className="q-main-nav reflection-nav">
                        {reflcheck ? null : (
                            <div className="link-start">
                                <div className="refl-nav-item" onClick={clickEvent} role="button" tabIndex={0} onKeyDown={clickEvent}>
                                    <i className="fas fa-play fa-2x" />
                                </div>
                                <p className="nav-label">시작하기</p>
                            </div>
                        )}
                        <div className="link-history">
                            <Link className="refl-nav-item" to="/refl/history">
                                <i className="fas fa-history fa-2x" />
                                {/* <button>이전 답변보기</button> */}
                            </Link>
                            <p className="nav-label">이전답변</p>
                        </div>
                        <div className="link-home">
                            <Link className="refl-nav-item" to="../">
                                <i className="fas fa-home fa-2x" />
                                {/* <button>홈으로 돌아가기</button> */}
                            </Link>
                            <p className="nav-label">메인홈</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ReflectionMain;
