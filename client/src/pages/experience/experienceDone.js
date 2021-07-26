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
                    <div className="done-description">경험이 저장되었습니다</div>
                </div>
                <div className="expr-done-btns">
                    <div className="expr-start">
                        <Link className="expr-nav-item" to="/experience">
                            <i className="fas fa-play fa-2x" />
                        </Link>
                        <div className="nav-label">타임 라인</div>
                    </div>
                    <div className="tome-home">
                        <Link className="expr-nav-item" to="/">
                            <i className="fas fa-home fa-2x" />
                        </Link>
                        <div className="nav-label">메인홈</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default experienceDone;
