import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { MYAC_RECEIVE_REQUEST } from 'redux/types';

const AccountForm = () => {
    const myaccountObj = useSelector(state => state.myac.payload);
    const myaccountChk = useSelector(state => state.myac.isMyAccountReceive);
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(myaccountObj.user_name);
    const [email, setEmail] = useState(myaccountObj.email);

    // DB에서 현재 로그인중인 계정정보 불러오기
    useEffect(() => {
        console.log('계정정보 불러오기');
        const body = {
            token: localStorage.getItem('token'),
        };
        dispatch({
            type: MYAC_RECEIVE_REQUEST,
            payload: body,
        });
    }, []);

    // 계정정보를 성공적으로 불러왔다면 이름과 이메일을 Input에 업데이트 하기
    useEffect(() => {
        setName(myaccountObj.user_name);
        setEmail(myaccountObj.email);
    }, [myaccountChk]);

    const onChange = e => {
        const { className } = e.target;
        if (className === 'user-name-input') {
            setName(e.target.value);
        } else if (className === 'user-email-input') {
            setEmail(e.target.value);
        }
    };
    return (
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
                            <input className="user-name-input" type="text" value={name} onChange={onChange} />
                            {/* <div className="err-wrap">
                            <div className="err-msg">이름을 반드시 입력해주세요.</div>
                        </div> */}
                        </div>
                        <div className="info-detail user-email">
                            <div className="info-label user-email-label">이메일</div>
                            <input className="user-email-input" type="text" value={email} onChange={onChange} />
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
};

export default AccountForm;
