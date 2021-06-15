import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ToMeHistory = () => {
    const [historydate, setHistoryDate] = useState([]);

    const loadhistory = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        const result = await axios.get(`/api/tome/detail/history`, config);
        console.log('히스토리 가지고 왔냐 >>', result.data);
        return result.status === 200 ? result.data : 'error';
        // setHistoryDate([result.data.date]);
    };

    useEffect(() => {
        loadhistory().then(data => setHistoryDate(data));
    }, []);
    return (
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
                                <i style={{ color: 'white' }} className="fas fa-chevron-left fa-2x" />
                            </a>
                        </div>
                        <div className="history-label">내가 보는 나</div>
                    </div>
                    {/* <div className="scroll-on">
                        <div className="scroll-bar" style={{width:"50%"}} />
                    </div> */}
                    <div className="history-elem-container">
                        <div className="history-elem">
                            <div className="star" />
                        </div>
                        {(() =>
                            historydate.map(val => (
                                <div key={val.seq} className="history-elem">
                                    <div className="bar" />
                                    <div className="circle">
                                        <div className="sub-circle" />
                                    </div>
                                    <div className="history-desc">
                                        <div className="history-desc-title">내가 보는 나</div>
                                        <div className="history-desc-date">{val.history}</div>
                                    </div>
                                </div>
                            )))()}
                        {/* <div className="history-elem">
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
                        </div> */}
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
};
export default ToMeHistory;
