import React from 'react';
import { Link } from 'react-router-dom';

const experienceDone = () => (
    // 경험이 저장되었습니다 와 함께 nav
    <section className="sections">
        <div className="sections-overlay">
            <div className="q-main-container expr-done-container">
                <div className="q-main-title expr-done-title">
                    <h1>내가 한 경험</h1>
                </div>
                <div className="q-main-content">
                    <div className="expr-done-text">경험이 저장되었습니다.</div>
                </div>
                <div className="expr-done-btns">
                    <div className="expr-start">
                        <Link to="/experience">
                            <i className="fas fa-play fa-2x" />
                        </Link>
                        <div className="tome-label start-label">경험 추가</div>
                    </div>
                    <div className="tome-home">
                        <Link to="/">
                            <i className="fas fa-home fa-2x" />
                        </Link>
                        <div className="tome-label home-label">메인 홈</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default experienceDone;
