import React from 'react';
import { Link } from 'react-router-dom';

const experienceForm = () => {
    const tmp = 0;

    // 날짜, 주제, 첨부파일, 링크 등 제목, 내용 적고 저장 하면 저장되고 구글 스프레드 시트에 띄워짐
    return (
        <section className="sections">
            <div className="sections-overlay">
                <div className="expr-wrap">
                    {/* <div className="expr-elem expr-header">나의 경험</div> */}
                    <div className="expr-elem expr-content">
                        <div className="expr-field expr-title">
                            <div className="title-chk">
                                <input type="checkbox" /> 제목
                            </div>
                            <div className="title-field">
                                <input className="input-field" type="text" />
                            </div>
                        </div>
                        <div className="expr-field expr-text">
                            <textarea className="input-field" name="exp-text" id="exp-text" cols="100%" rows="5" />
                        </div>
                        <div className="expr-field expr-date">
                            <div className="header-field date date-header">
                                <i className="fas fa-bars" /> 날짜
                            </div>

                            <div className="input-field date date-input">
                                <i className="fas fa-trash" />
                                <input type="date" />
                                <input type="checkbox" /> 기간
                            </div>
                        </div>
                        <div className="expr-field expr-theme">
                            <div className="header-field theme theme-header">
                                <i className="fas fa-bars" /> 주제
                            </div>
                            <div className="input-field theme theme-input">
                                <input className="input-field" type="text" placeholder="#을 이용하여 태그를 작성하세요!" />
                            </div>
                        </div>
                        <div className="expr-field expr-file">
                            <div className="header-field file file-header">
                                <i className="fas fa-bars" /> 첨부파일
                            </div>
                            <div className="file-wrapper">
                                <div className="file-input">
                                    <i className="fas fa-plus" />
                                </div>
                                <div className="file-input">
                                    <i className="fas fa-plus" />
                                </div>
                                <div className="file-input">
                                    <i className="fas fa-plus" />
                                </div>
                                <div className="file-input">
                                    <i className="fas fa-plus" />
                                </div>
                            </div>
                        </div>
                        <div className="expr-field expr-link">
                            <div className="header-field link link-header">
                                <i className="fas fa-bars" /> 링크
                            </div>
                            <div className="input-field link link-input">
                                <input className="input-field" type="text" />
                            </div>
                        </div>
                        <div className="expr-btn-wrap">
                            <Link to="/experience/done">
                                <div className="save-btn expr-add-btn">저장하기</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default experienceForm;
