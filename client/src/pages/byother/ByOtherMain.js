import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import PopUp from '../../common/modal/PopUp';

const ByOtherMain = () => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const linkObject = {
        byotherFirstPage: `/byother/detail/1`,
        byotherRouter: `/api/byother`,
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

        const result = await axios.get(`${linkObject.byotherRouter}/answer`, config);

        if (result.data.length > 0) {
            setModal(true);
        } else if (result.data.length === 0) {
            setModal(false);
            history.push(`${linkObject.byotherFirstPage}`);
        }
    };
    return (
        <section className="sections">
            <div className="sections-overlay">
                <PopUp modal={modal} setModal={setModal} FirstPageLink={linkObject.byotherFirstPage} routerLink={linkObject.byotherRouter} />
                <div className="q-main-container">
                    <div className="q-main-title">
                        <h1>남이 보는 나</h1>
                    </div>
                    <div className="q-main-content">
                        <div>예상 소요 시간 : 20분 ~ 1시간</div>
                        <div>질문 수 : 15</div>
                        <div>지금 곁에 있는 다른 이에게 나에 대해 질문하세요.</div>
                    </div>
                    <div className="q-main-nav">
                        <div className="link-start">
                            <div onClick={clickEvent} role="button" tabIndex={0} onKeyDown={clickEvent}>
                                <i className="fas fa-play fa-2x" />
                            </div>
                            시작하기
                        </div>
                        <div className="link-history">
                            <Link to="/byother/history">
                                <i className="fas fa-history fa-2x" />
                            </Link>
                            이전답변
                        </div>
                        <div className="link-home">
                            <Link to="/">
                                <i className="fas fa-home fa-2x" />
                            </Link>
                            메인홈
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ByOtherMain;
