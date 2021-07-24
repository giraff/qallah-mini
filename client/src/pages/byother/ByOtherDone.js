import React from 'react';

import { Link } from 'react-router-dom';

const ByOtherDone = () => (
    <section className="sections">
        <div className="sections-overlay">
            <div className="q-main-container byother-container lang-kor">
                <div className="byother-title">
                    <h1>남이 보는 나</h1>
                </div>
                <div className="q-main-content byother-content">
                    <div className="done-description">답변이 완료되었습니다</div>
                </div>
                <div className="q-main-nav byother-footer">
                    <div className="byother-history">
                        <Link to="/byother/history">
                            <i className="fas fa-history fa-2x" />
                        </Link>
                        <div className="nav-label">이전 답변</div>
                    </div>
                    <div className="byother-home">
                        <Link to="/">
                            <i className="fas fa-home fa-2x" />
                        </Link>
                        <div className="nav-label">메인홈</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default ByOtherDone;
