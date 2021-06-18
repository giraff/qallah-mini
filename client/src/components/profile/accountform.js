import React from 'react';

const AccountForm = () => (
    <>
        <div className="acc-title">나의 계정</div>
        <div className="acc-content">
            <div className="acc-header">내 프로필</div>
            <div className="modify-field">
                <div className="modify-user-img">
                    <div className="user-avatar-img">
                        <div className="ab-avatar user-avatar-remove" title="프로필 사진 삭제">
                            <i className="far fa-trash-alt fa-2x" />
                        </div>
                        <div className="ab-avatar user-avatar-edit" title="프로필 사진 수정">
                            <i className="fas fa-pen fa-2x" />
                        </div>
                    </div>
                </div>

                <div className="modify-user-info">
                    <div className="info-detail user-name">
                        <div className="info-label user-name-label">이름</div>
                        <input type="text" />
                        {/* <div className="err-wrap">
                            <div className="err-msg">이름을 반드시 입력해주세요.</div>
                        </div> */}
                    </div>
                    <div className="info-detail user-email">
                        <div className="info-label user-email-label">이메일</div>
                        <input type="text" />
                        {/* <div className="err-wrap">
                            <div className="err-msg">이메일 형식에 맞게 작성해주세요</div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="modify-pwd">
                <div className="pwd-title">비밀번호 변경</div>
                <div className="pwd-fields">
                    <div className="info-detail current-pwd">
                        <div className="cnt-pwd-label">현재 비번</div>
                        <input className="pwd-input" type="password" />

                        <div className="err-wrap">
                            <div className="err-msg">적절하지 않은 비밀번호입니다(영문+숫자 포함 8자리 이상)</div>
                            {/* <div className="err-msg">현재 비밀번호와 맞지 않습니다.</div>
                                        <div className="err-msg">새 비밀번호가 서로 일치하지 않습니다.</div>  */}
                        </div>
                    </div>
                    <div className="new-pwd">
                        <div className="new-pwd-label">새 비번</div>
                        <input className="pwd-input" type="password" />
                    </div>
                    <div className="retype-pwd">
                        <div className="re-pwd-label">새 비번 (Retype)</div>
                        <input className="pwd-input" type="password" />
                    </div>
                </div>
            </div>
            <div className="acc-save">저장</div>
        </div>
    </>
);
export default AccountForm;
