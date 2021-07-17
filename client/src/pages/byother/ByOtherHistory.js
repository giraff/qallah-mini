import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const ByOtherHistory = () => {
    const [historydate, setHistoryDate] = useState([]);
    const history = useHistory();

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
        getHistoryAPI().then(data => setHistoryDate(data));
    }, []);
    return (
        <>
            <section className="banner-section" />
            <div id="history-wrap" className="lang-kor">
                <section className="history-container">
                    <div className="history-header">
                        <div className="history-home">
                            <Link className="history-back-btn" to="/byother">
                                <i style={{ color: 'black' }} className="fas fa-chevron-left fa-2x" />
                                <div className="back-label">Back</div>
                            </Link>
                        </div>
                        <div className="history-label lang-kor">남이 보는 나</div>
                    </div>
                </section>
                <section className="history-elem-container">
                    <div className="history-elem">
                        <div className="star" />
                        {historydate.length === 0 ? (
                            <div className="history-err-wrap">
                                <div className="err-msg">저장한 답변이 없습니다</div>
                            </div>
                        ) : null}
                    </div>
                    {(() =>
                        historydate &&
                        historydate.map(val => (
                            <div key={val.seq} className="history-elem">
                                <div className="bar" />
                                <button
                                    type="button"
                                    className="circle"
                                    onClick={() =>
                                        history.push(`/profile/answer/view?type=answerbyothers&year=${val.YEAR}&month=${val.MONTH}&day=${val.DAY}`)
                                    }
                                >
                                    <div id="byothers-blue-circle" className="sub-circle" />
                                </button>
                                <div className="history-desc">
                                    <div className="history-desc-title lang-kor">남이 보는 나</div>
                                    <div className="history-desc-date lang-kor">{val.history}</div>
                                </div>
                            </div>
                        )))()}
                </section>
            </div>
        </>
    );
};

export default ByOtherHistory;
