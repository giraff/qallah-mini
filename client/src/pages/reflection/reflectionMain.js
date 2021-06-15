/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import PopUp from 'common/modal/PopUp';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const ReflectionMain = () => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const linkObject = {
        reflFirstPage: `/refl/detail`,
        reflAnswerRecevieAll: `/api/refl/answer`,
        reflAnswerDeleteRouter: `/api/refl/detail/answer/delete`,
    };

    const clickEvent = async () => {
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
            setModal(true);
        } else if (result.data.length === 0) {
            setModal(false);
            history.push(`${linkObject.reflFirstPage}`);
        }
    };
    return (
        <section className="sections">
            <div className="sections-overlay">
                <PopUp modal={modal} setModal={setModal} FirstPageLink={linkObject.reflFirstPage} routerLink={linkObject.reflAnswerDeleteRouter} />
                <div className="q-main-container">
                    <div className="q-main-title">
                        <h1>성찰</h1>
                    </div>
                    <div className="q-main-content">
                        <div>- 하루에 최대 1 질문</div>
                        <div>- 이 페이지의 핵심은 사람이 살아가면서 마주하는 결정적 질문들을 모아둔 것, 그 질문에 대한 답변들을 '쌓는 것'</div>
                        <div>- 이전 답변들을 기록해놓고 시간의 흐름대로 나의 변화를 볼 수 있는 것</div>
                        <div>- 그러기 위해선 사용자의 꾸준한 참여와 진실 어린 답변이 필요하다</div>
                    </div>
                    <div className="q-main-nav">
                        <div className="link-start">
                            <div onClick={clickEvent} role="button" tabIndex={0} onKeyDown={clickEvent}>
                                <i className="fas fa-play fa-2x" />
                            </div>
                            시작하기
                        </div>
                        <div className="link-history">
                            <Link to="/refl/history">
                                <i className="fas fa-history fa-2x" />
                                {/* <button>이전 답변보기</button> */}
                            </Link>
                            이전답변
                        </div>
                        <div className="link-home">
                            <Link to="../">
                                <i className="fas fa-home fa-2x" />
                                {/* <button>홈으로 돌아가기</button> */}
                            </Link>
                            메인홈
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ReflectionMain;
