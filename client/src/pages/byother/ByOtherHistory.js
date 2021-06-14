import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ByOtherHistory = () => {
    const [history, setHistory] = useState([]);

    const getHistoryAPI = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            if (token) {
                config.headers['x-auth-token'] = token;
            }

            const res = await axios.get('/api/byother/history', config);
            return res.status === 200 ? res.data : 'error';
        } catch (err) {
            return err;
        }
    };
    useEffect(() => {
        getHistoryAPI().then(data => setHistory(data));
    }, []);
    return (
        <section className="sections">
            <div className="sections-overlay">
                <div className="history-container byother-history-container">
                    {/* <div className="history-overlay">
                    <div className="history-overlay-inner">아직 작성된 답변이 없습니다.</div>
                </div> */}
                    <div className="history-header">
                        <div className="history-home">
                            <Link className="history-pre-btn" to="/byother">
                                <i style={{ color: 'white' }} className="fas fa-chevron-left fa-2x" />
                            </Link>
                        </div>
                        <div className="history-label lang-kor">남이 보는 나</div>
                    </div>
                    {/* <div className="scroll-on">
                    <div className="scroll-bar" style={{ width: '50%' }} />
                </div> */}
                    <div className="history-elem-container">
                        <div className="history-elem">
                            <div className="star" />
                        </div>
                        {(() =>
                            history.map(val => (
                                <div key={val.seq} className="history-elem">
                                    <div className="bar" />
                                    <div className="circle">
                                        <div className="sub-circle" />
                                    </div>
                                    <div className="history-desc">
                                        <div className="history-desc-title lang-kor">남이 보는 나</div>
                                        <div className="history-desc-date lang-kor">{val.time}</div>
                                    </div>
                                </div>
                            )))()}
                        {/* <div className="history-elem last">
                            <div className="bar" />
                            <div className="circle">
                                <div className="sub-circle" />
                            </div>
                            <div className="bar" />
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ByOtherHistory;
