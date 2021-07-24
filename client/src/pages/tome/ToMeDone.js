import React from 'react';
import { Link } from 'react-router-dom';

const ToMeDone = () => (
    <section className="sections">
        <div className="sections-overlay">
            <div className="q-main-container lang-kor">
                <div className="q-main-title">
                    <h1>내가 보는 나</h1>
                </div>
                <div className="q-main-content">
                    <div className="done-description">답변이 완료되었습니다.</div>
                </div>
                <div className="q-main-nav">
                    <div className="tome-history">
                        <Link to="/tome/history">
                            <i className="fas fa-history fa-2x" />
                        </Link>
                        <p className="nav-label">이전 답변</p>
                    </div>
                    <div className="tome-home">
                        <Link to="/">
                            <i className="fas fa-home fa-2x" />
                        </Link>
                        <p className="nav-label">메인 홈</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default ToMeDone;
