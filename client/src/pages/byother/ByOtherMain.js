import React from 'react';
import { Link } from 'react-router-dom';

const ByOtherMain = () => (
    <section className="sections">
        <div className="sections-overlay">
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
                        <Link to="/byother/detail/1">
                            <i className="fas fa-play fa-2x" />
                        </Link>
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

export default ByOtherMain;
