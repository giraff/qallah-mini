import React from 'react';
import { Link } from 'react-router-dom';
// ../assets/double-quotation.png 이렇게 사용하거나 assets/double-quotation.png 이렇게 사용
import quote_l from 'assets/double-quotation.png';
import quote_r from 'assets/double-quotation2.png';
import q_tome from 'assets/나-icon.png';
import q_byothers from 'assets/남-icon.png';
import q_exp from 'assets/경험-icon.png';
import q_ref from 'assets/성찰-icon.png';

const Main = () => (
    <div className="main">
        <section className="main-banner-container">
            <div className="main-banner-overlay">
                <div className="banner-wrap">
                    <div className="banner banner-wrap">
                        <h1 className="banner-title">나에게</h1>
                        <h1 className="banner-title">질문하세요</h1>
                        <div className="banner-desc">모르는게 없는 세상</div>
                        <div className="banner-desc">나는 나를 안다고 말할 수 있을까?</div>
                    </div>
                    <div className="double-quotation double-quotation-l">
                        <img src={quote_l} alt="quote" />
                    </div>
                    <div className="double-quotation double-quotation-r">
                        <img src={quote_r} alt="quote" />
                    </div>
                </div>
            </div>
        </section>
        <section className="main-question-container">
            <h1 className="main-question-header eng-title">Question</h1>
            <div className="main-question-desc">살면서 마주할 수많은 질문들</div>
            <div className="main-question-list">
                <nav className="q-nav">
                    <ul>
                        <li>
                            <Link to="tome">
                                <img className="q_img" src={q_tome} alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link to="byother">
                                <img className="q_img" src={q_byothers} alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link to="experience">
                                <img className="q_img" src={q_exp} alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link to="refl">
                                <img className="q_img" src={q_ref} alt="" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
        <section className="main-answer-container">
            <h1 className="main-answer-header eng-title">Answer</h1>
        </section>
    </div>
);

export default Main;
