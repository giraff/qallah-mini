import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import PopUp from '../../common/modal/PopUp';

const ByOtherMain = () => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const linkObject = {
        byotherFirstPage: `/byother/detail/1`,
        byotherRootRouter: `/api/byother`,
        byotherAnswerDetailRouter: `/api/byother/answer/detail`,
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

        const result = await axios.get(`${linkObject.byotherRootRouter}/answer`, config);

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
                <PopUp
                    modal={modal}
                    setModal={setModal}
                    FirstPageLink={linkObject.byotherFirstPage}
                    routerLink={linkObject.byotherAnswerDetailRouter}
                />
                <div className="q-main-container">
                    <div className="q-main-title">
                        <h1>남이 보는 나</h1>
                    </div>
                    <div className="q-main-content byother-main">
                        <div className="q-byother-description lang-kor">지금 곁에 있는 다른 이에게 질문하세요.</div>
                        <div className="q-byother-time lang-kor">
                            예상 소요 시간 <p className="font-description byother-time">5분+</p>
                        </div>
                        <div className="q-byother-count lang-kor">
                            질문 수 <p className="font-description byother-count">15</p>
                        </div>
                    </div>
                    <div className="q-main-nav">
                        <div className="link-start">
                            <div className="byother-nav-item" onClick={clickEvent} role="button" tabIndex={0} onKeyDown={clickEvent}>
                                <i className="fas fa-play fa-2x" />
                            </div>
                            <div className="byother-nav-label">START</div>
                        </div>
                        <div className="link-history">
                            <Link className="byother-nav-item" to="/byother/history">
                                <i className="fas fa-history fa-2x" />
                            </Link>
                            <div className="byother-nav-label">HISTORY</div>
                        </div>
                        <div className="link-home">
                            <Link className="byother-nav-item" to="/">
                                <i className="fas fa-home fa-2x" />
                            </Link>
                            <div className="byother-nav-label">HOME</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ByOtherMain;
