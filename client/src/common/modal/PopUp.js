import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

const PopUp = ({ modal, setModal, FirstPageLink, routerLink }) => {
    const history = useHistory();
    const loadAnswer = async load => {
        // No -> DB 오늘 답변 정보 삭제 후 detail 페이지로 이동
        // YES -> 바로 detail 페이지로 이동
        if (!load) {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            if (token) {
                config.headers['x-auth-token'] = token;
            }

            await axios.delete(`${routerLink}`, config);
        }
        history.push(`${FirstPageLink}`);
    };
    return (
        <>
            {modal ? (
                <>
                    {console.log(modal)}
                    <div
                        className="modal-overlay"
                        aria-label="ovelay"
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => setModal(false)}
                        onClick={() => setModal(false)}
                    />
                    <div className="modal">
                        <div className="popup-content">
                            <div>이전 답변 불러오시겠습니까?</div>
                        </div>
                        <div className="popup-button-wrap">
                            <button type="button" onClick={() => loadAnswer(false)}>
                                아니오
                            </button>
                            <button type="button" onClick={() => loadAnswer(true)}>
                                예
                            </button>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default PopUp;
