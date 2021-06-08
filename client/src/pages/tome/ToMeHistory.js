import React from "react"

const ToMeHistory = () => {
    return(
        <section className="sections answer-section">
            <div className="sections-overlay">
                <div className="history-container tome-history-container">
                    {/* 아무 히스토리도 없을 때  */}
                        {/* <div className="history-overlay">
                        <div className="history-overlay-inner">
                            아직 작성된 답변이 없습니다.
                        </div>
                    </div>  */}
                    <div className="history-header">
                        <div className="history-home">
                            <a className="history-pre-btn" href="ToMeMain.html">
                                <i style={{color:"white"}} className="fas fa-chevron-left fa-2x"></i>
                            </a>                    
                        </div>
                        <div className="history-label">내가 보는 나</div>
                    </div>
                    {/* <div className="scroll-on">
                        <div className="scroll-bar" style={{width:"50%"}}></div>
                    </div> */}
                    <div className="history-elem-container">
                        <div className="history-elem">
                            <div className="star"></div>
                        </div>
                        <div className="history-elem">
                            <div className="bar"></div>
                            <div className="circle">
                                <div className="sub-circle"></div>
                            </div>
                        </div>
                        <div className="history-elem">
                            <div className="bar"></div>
                            <div className="circle">
                                <div className="sub-circle"></div>
                            </div>
                            <div className="history-desc">
                                <div className="history-desc-title">내가 보는 나</div>
                                <div className="history-desc-date">2020.07.01</div>
                            </div>
                        </div>
                        {/* <div className="history-elem">
                            <div className="bar"></div>
                            <div className="circle">
                                <div className="sub-circle"></div>
                            </div>
                        </div>
                        <div className="history-elem">
                            <div className="bar"></div>
                            <div className="circle">
                                <div className="sub-circle"></div>
                            </div>
                        </div>
                        <div className="history-elem">
                            <div className="bar"></div>
                            <div className="circle">
                                <div className="sub-circle"></div>
                            </div>
                        </div> */}
                        <div className="history-elem last">
                            <div className="bar"></div>
                            <div className="circle">
                                <div className="sub-circle"></div>
                            </div>
                            <div className="bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ToMeHistory;