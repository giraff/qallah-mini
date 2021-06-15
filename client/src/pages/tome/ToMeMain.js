import axios from 'axios';
import PopUp from 'common/modal/PopUp';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const QuestiontomeMain = () => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const linkObject = {
        tomeFirstPage: `/tome/detail`,
        tomeAnswerRecevieAll: `/api/tome/answer`,
        tomeAnswerDeleteRouter: `/api/tome/detail/answer/delete`,
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
        const result = await axios.get(`${linkObject.tomeAnswerRecevieAll}`, config);

        if (result.data.length > 0) {
            setModal(true);
        } else if (result.data.length === 0) {
            setModal(false);
            history.push(`${linkObject.tomeFirstPage}`);
        }
    };
    return (
        <section className="sections">
            <div className="sections-overlay">
                <PopUp modal={modal} setModal={setModal} FirstPageLink={linkObject.tomeFirstPage} routerLink={linkObject.tomeAnswerDeleteRouter} />
                <div className="q-main-container">
                    <div className="q-main-title">
                        <h1>내가 보는 나</h1>
                    </div>
                    <div className="q-main-content">
                        <div>예상 소요 시간 : 20분 ~ 1시간</div>
                        <div>질문 수 : 20</div>
                        <div>나 자신에게 질문하는 시간을 가져보세요.</div>
                    </div>
                    <div className="q-main-nav">
                        <div className="link-start">
                            <div onClick={clickEvent} role="button" tabIndex={0} onKeyDown={clickEvent}>
                                <i className="fas fa-play fa-2x" />
                            </div>
                            시작하기
                        </div>
                        <div className="link-history">
                            <Link to="/tome/history">
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
export default QuestiontomeMain;
