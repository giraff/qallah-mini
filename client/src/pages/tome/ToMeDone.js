import React from "react"
import { Link, Route } from 'react-router-dom';

const ToMeDone = () => {
    return(
        <section className="sections">
            <div className="sections-overlay">
                <div className="q-main-container">
                    <div className="q-main-title">
                        <h1>내가 보는 나</h1>
                    </div>
                    <div className="q-main-content">
                        <div>답변이 완료되었습니다.</div>
                    </div>
                    <div className="q-main-nav">
                        <div className="tome-start">
                            <Link to="/tome">
                                <i className="fas fa-play fa-2x"></i>
                            </Link>
                            <label>다시 답변</label>
                        </div>
                        <div className="tome-history">
                            <Link to={`/tome/history`}>
                                <i className="fas fa-history fa-2x"></i>
                            </Link>
                            <label>과거 답변</label>
                        </div>
                        <div className="tome-home">
                            <Link to="/">
                                <i className="fas fa-home fa-2x"></i>
                            </Link>
                            <label>메인 홈</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ToMeDone;