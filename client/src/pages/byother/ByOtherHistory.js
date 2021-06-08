import React from 'react';
import { Link } from 'react-router-dom';

const ByOtherHistory = () => (
    <section className="sections answer-section">
        <div className="sections-overlay">
            <div className="history-container byother-history-container">
                {/* <div className="history-overlay">
              <div className="history-overlay-inner">
                  아직 작성된 답변이 없습니다.
              </div>
          </div> */}
                <div className="history-header">
                    <div className="history-home">
                        <Link className="history-pre-btn" to="/byother">
                            <i style={{ color: 'white' }} className="fas fa-chevron-left fa-2x" />
                        </Link>
                    </div>
                    <div className="history-label">남이 보는 나</div>
                </div>
                {/* <div className="scroll-on">
              <div className="scroll-bar" style="width:50%"></div>
          </div> */}
                <div className="history-elem-container">
                    <div className="history-elem">
                        <div className="star" />
                    </div>
                    <div className="history-elem">
                        <div className="bar" />
                        <div className="circle">
                            <div className="sub-circle" />
                        </div>
                    </div>
                    <div className="history-elem">
                        <div className="bar" />
                        <div className="circle">
                            <div className="sub-circle" />
                        </div>
                    </div>
                    <div className="history-elem">
                        <div className="bar" />
                        <div className="circle">
                            <div className="sub-circle" />
                        </div>
                    </div>
                    <div className="history-elem">
                        <div className="bar" />
                        <div className="circle">
                            <div className="sub-circle" />
                        </div>
                    </div>
                    <div className="history-elem">
                        <div className="bar" />
                        <div className="circle">
                            <div className="sub-circle" />
                        </div>
                    </div>
                    <div className="history-elem last">
                        <div className="bar" />
                        <div className="circle">
                            <div className="sub-circle" />
                        </div>
                        <div className="bar" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default ByOtherHistory;
