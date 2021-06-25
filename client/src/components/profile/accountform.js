/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MYAC_RECEIVE_REQUEST, MYAC_SEND_PREVPW_REQUEST, MYAC_UPDATE_REQUEST } from 'redux/types';

const AccountForm = () => {
    const myaccountObj = useSelector(state => state.myac.payload);
    const myaccountChk = useSelector(state => state.myac.isMyAccountReceive);
    const myaccountSendChk = useSelector(state => state.myac.isMyAccountUpdate);
    const dispatch = useDispatch();
    const history = useHistory();
    const [profileImage, setProfileImage] = useState({ src: null });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [prevpw, setPrevPw] = useState('');
    const [newpw, setNewPw] = useState('');
    const [re_newpw, setReNewPw] = useState('');
    const [regexpPrevPwCheck, setExpPrevPwCheck] = useState(true);
    const [regexpNewPwCheck, setExpNewPwCheck] = useState(true);
    const [prevnewPwCheck, setPrevNewPwCheck] = useState(false);
    const [newrenewPwCheck, setNewRenewPwCheck] = useState(true);
    const [saveActive, setSaveActive] = useState(false);
    const [totalCheck, setTotalCheck] = useState(true);
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
        setProfileImage(myaccountObj.profileImage);
        console.log('계정정보 >> ', myaccountObj);
    }, [myaccountChk]);

    // 이전 비밀번호가 일치한다면, 새로운 이름과 비밀번호로 업데이트 하기
    useEffect(() => {
        console.log('myaccountObj 객체의 상태값이 바뀌었습니다');
        if (myaccountObj === true) {
            const body = {
                token: localStorage.getItem('token'),
                new_name: name,
                new_pw: newpw,
            };
            dispatch({
                type: MYAC_UPDATE_REQUEST,
                payload: body,
            });
        }
    }, [myaccountObj]);

    // 이전 비밀번호가 적절한 형식의 비밀번호를 갖추었는지 확인
    useEffect(() => {
        const pw = prevpw;
        const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\dd$@$!%*#?&]{8,50}$/.test(pw);
        if (!exp) {
            setExpPrevPwCheck(false);
        } else {
            setExpPrevPwCheck(true);
        }
    }, [prevpw]);

    // 새로운 비밀번호가 적절한 형식의 비밀번호를 갖추었는지 확인
    useEffect(() => {
        const pw = newpw;
        const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\dd$@$!%*#?&]{8,50}$/.test(pw);
        if (!exp) {
            setExpNewPwCheck(false);
        } else {
            setExpNewPwCheck(true);
        }
    }, [newpw]);

    // 이전 비밀번호와 새로운 비밀번호가 같은지 확인
    useEffect(() => {
        if (prevpw === newpw && newpw !== '') {
            setPrevNewPwCheck(true);
        } else {
            setPrevNewPwCheck(false);
        }
    });

    // 새로운 비밀번호와 재입력한 새로운 비밀번호가 같은지 확인
    useEffect(() => {
        if (newpw === re_newpw) {
            setNewRenewPwCheck(true);
        } else {
            setNewRenewPwCheck(false);
        }
    });

    // 저장버튼 활성화/비활성화 여부 확인
    useEffect(() => {
        if (
            regexpPrevPwCheck &&
            regexpNewPwCheck &&
            !prevnewPwCheck &&
            newrenewPwCheck &&
            name !== '' &&
            email !== '' &&
            prevpw !== '' &&
            newpw !== '' &&
            re_newpw !== ''
        ) {
            setSaveActive(true);
        } else {
            setSaveActive(false);
        }
    });

    // 프로필이 성공적으로 업데이트 되었을 때,
    useEffect(() => {
        if (myaccountSendChk) {
            history.push('/');
        }
    }, [myaccountSendChk]);

    const onChange = e => {
        const { className } = e.target;
        if (className === 'user-name-input') {
            setName(e.target.value);
        } else if (className === 'user-email-input') {
            setEmail(e.target.value);
        } else if (className === 'pwd-input') {
            setPrevPw(e.target.value);
        } else if (className === 'new-pwd-input') {
            setNewPw(e.target.value);
        } else if (className === 're-new-pwd-input') {
            setReNewPw(e.target.value);
        } else if (className === 'file-input') {
            console.log('이미지 들어옴', e.target.files);
        }
    };

    const onClick = e => {
        e.preventDefault();
        console.log('이전 비밀번호 일치여부 확인 -> 비밀번호 변경');
        // 저장 버튼 클릭 시, 이전과 새로운 비밀번호가 적절한 형식을 가지고 있는지 비교
        // 그리고 이전 비밀번호와 새로운 비밀번호의 비교, 새로운 비밀번호와 재입력한 새로운 비밀번호를 비교하여 문제가 없으면 저장
        const body = {
            pw: prevpw,
            token: localStorage.getItem('token'),
        };
        dispatch({
            type: MYAC_SEND_PREVPW_REQUEST,
            payload: body,
        });
    };

    const profileEdit = (
        <>
            <div className="ab-avatar user-avatar-remove" title="프로필 사진 삭제">
                <i className="far fa-trash-alt fa-2x" />
            </div>
            <label className="ab-avatar user-avatar-edit" title="프로필 사진 수정" htmlFor="input-file">
                <i className="fas fa-pen fa-2x" />
            </label>
            <input className="file-input" type="file" id="input-file" style={{ display: 'none' }} onChange={onChange} />
        </>
    );

    const prevpwContent = (
        <>
            <div className="err-wrap">
                {prevpw !== '' ? (
                    <div className="err-msg">현재 비밀번호와 맞지 않습니다.</div>
                ) : (
                    <div className="err-msg">현재 비밀번호를 입력해 주세요</div>
                )}
                {/* <div className="err-msg">현재 비밀번호와 맞지 않습니다.</div>
                                        <div className="err-msg">새 비밀번호가 서로 일치하지 않습니다.</div>  */}
            </div>
        </>
    );

    const newpwConteht = (
        <>
            <div className="err-wrap">
                {newpw !== '' ? (
                    <>
                        {regexpNewPwCheck ? null : <div className="err-msg">적절하지 않은 형식입니다(영문+숫자+특수문자 포함 8자리 이상)</div>}
                        {prevnewPwCheck ? <div className="err-msg">이전 비밀번호와 동일합니다.</div> : null}
                    </>
                ) : (
                    <div className="err-msg">새로운 비밀번호를 입력해 주세요</div>
                )}
            </div>
        </>
    );

    const renewpwContent = (
        <div className="err-wrap">
            {re_newpw !== '' ? (
                <>{newrenewPwCheck ? null : <div className="err-msg">새로운 비밀번호와 일치하지 않습니다.</div>}</>
            ) : (
                <div className="err-msg">확인을 위해 새로운 비밀번호를 다시 입력해주세요.</div>
            )}
        </div>
    );
    return (
        <>
            <div className="acc-title">나의 계정</div>
            <div className="acc-content">
                <div className="acc-header">내 프로필</div>
                <div className="modify-field">
                    <div className="modify-user-img">
                        {profileImage === null ? (
                            <div className="user-avatar-img">{profileEdit}</div>
                        ) : (
                            <img className="user-img" src={profileImage} alt="profile" />
                        )}
                    </div>

                    <div className="modify-user-info">
                        <div className="info-detail user-name">
                            <div className="info-label user-name-label">이름</div>
                            <input className="user-name-input" type="text" value={name || ''} onChange={onChange} />
                            {/* <div className="err-wrap">
                            <div className="err-msg">이름을 반드시 입력해주세요.</div>
                        </div> */}
                        </div>
                        <div className="info-detail user-email">
                            <div className="info-label user-email-label">이메일</div>
                            <input className="user-email-input" type="text" value={email || ''} onChange={onChange} disabled="disabled" />
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
                            <input className="pwd-input" type="password" onChange={onChange} />
                            {totalCheck ? null : prevpwContent}
                        </div>
                        <div className="info-detail new-pwd">
                            <div className="new-pwd-label">새 비번</div>
                            <input className="new-pwd-input" type="password" onChange={onChange} />
                            {totalCheck ? null : newpwConteht}
                        </div>
                        <div className="info-detail retype-pwd">
                            <div className="re-pwd-label">새 비번 (Retype)</div>
                            <input className="re-new-pwd-input" type="password" onChange={onChange} />
                            {/* 해당 부분 에러가 발생 (err-wrap 태그를 삭제하면 정상적으로 err-msg가 나오지만, 그렇지않으면 err-msg가 출력되지 않음) */}
                            {totalCheck ? null : renewpwContent}
                        </div>
                    </div>
                </div>
                <div>
                    <button className="acc-save" type="button" onClick={onClick}>
                        저장
                    </button>
                </div>
            </div>
        </>
    );
};

export default AccountForm;
