import React from 'react';

const AccountModal = ({ modalMsg, setShowModal, setModalMsg }) => (
    <div className="account-modal-overlay lang-kor">
        <div className="account-modal-wrap">
            {modalMsg === '' ? (
                <>
                    <div className="account-modal-header">이미지 업로드 성공!</div>
                    <div className="account-modal-content">이미지가 성공적으로 업로드 되었습니다.</div>
                </>
            ) : (
                <>
                    <div className="account-modal-header">이미지 업로드 실패</div>
                    <div className="account-modal-content">{modalMsg}</div>
                </>
            )}
            <button
                type="button"
                onClick={() => {
                    setModalMsg('');
                    setShowModal(false);
                }}
                className="account-modal-button"
            >
                확인
            </button>
        </div>
    </div>
);

export default AccountModal;
