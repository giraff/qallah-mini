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
                            <div className="q-byother-warning lang-kor">
                                1일 1개의 답변 그룹만 작성 가능{' '}
                                <p style={{ lineHeight: '25px' }}>
                                    <span style={{ color: 'rgb(221, 41, 41)' }}>[아니오]</span> 누를 경우 당일 작성한 답변 모두{' '}
                                    <span style={{ color: 'rgb(221, 41, 41)' }}>초기화</span>
                                </p>
                            </div>
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
