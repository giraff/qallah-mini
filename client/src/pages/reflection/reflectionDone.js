import React from 'react';
import { Link } from 'react-router-dom';

const ReflectionDone = () => (
    <section className="sections">
        <div className="sections-overlay">
            <div className="q-main-container">
                <div className="q-main-title">
                    <h1>성찰</h1>
                </div>
                <div className="q-main-content">
                    <div>답변이 완료되었습니다.</div>
                </div>
                <div className="q-main-nav">
                    <div className="refl-history">
                        <Link to="/refl/history">
                            <i className="fas fa-history fa-2x" />
                        </Link>
                        과거 답변
                    </div>
                    <div className="refl-home">
                        <Link to="/">
                            <i className="fas fa-home fa-2x" />
                        </Link>
                        메인 홈
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default ReflectionDone;
