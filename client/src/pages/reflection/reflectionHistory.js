import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const ReflectionHistory = () => {
    const [historydate, setHistoryDate] = useState([]);
    const history = useHistory();
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
        const result = await axios.get(`/api/refl/detail/history`, config);
        console.log('히스토리 가지고 왔냐 >>', result.data);
        return result.status === 200 ? result.data : 'error';
        // setHistoryDate([result.data.date]);
    };

    useEffect(() => {
        loadhistory().then(data => setHistoryDate(data));
    }, []);
    return (
        <>
            <section className="banner-section" />
            <div id="history-wrap" className="lang-kor">
                <section className="history-container ">
                    <div className="history-header">
                        <div className="history-home">
                            <a className="history-back-btn" href="/refl">
                                <i style={{ color: 'black' }} className="fas fa-chevron-left fa-2x" />
                                <div className="back-label">Back</div>
                            </a>
                        </div>
                        <div className="history-label">인생의 성찰</div>
                    </div>
                </section>
                <section className="history-elem-container">
                    <div className="history-elem">
                        <div className="star" />
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
                                        history.push(`/profile/answer/view?type=answerforrefl&year=${val.YEAR}&month=${val.MONTH}&day=${val.DAY}`)
                                    }
                                >
                                    <div id="refl-orange-circle" className="sub-circle" />
                                </button>
                                <div className="history-desc">
                                    <div className="history-desc-title">성찰</div>
                                    <div className="history-desc-date">{val.history}</div>
                                </div>
                            </div>
                        )))()}
                </section>
            </div>
        </>
    );
};
export default ReflectionHistory;
