import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { REGISTER_FAILURE, REGISTER_REQUEST } from 'redux/types';

const Register = () => {
    const [form, setValues] = useState({
        userEmail: '',
        userName: '',
        userPassword: '',
    });
    const [pwCheck, setPwCheck] = useState(true);
    // useSelector : isRegistied 현재 값을 참, 거짓 값으로 가져오기
    const regResult = useSelector(state => state.reg.isRegistied);

    // dispatch : redux에 타입 (상태) 전달함으로써 상태 변화 일으키기
    const dispatch = useDispatch();
    // history : 회원가입 후 , login 페이지로 이동하기
    const history = useHistory();

    const onChange = e => {
        const { name, value } = e.target;
        if (name === 'userPassword') {
            const pw = value;
            const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\dd$@$!%*#?&]{8,50}$/.test(pw);
            if (!exp) {
                setPwCheck(false);
            } else {
                setPwCheck(true);
            }
        }
        setValues({
            ...form,
            [name]: value,
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        const { userEmail, userName, userPassword } = form;
        const user = { userEmail, userName, userPassword };
        console.log(`register submit: ${user.userEmail}, ${user.userName}, ${user.userPassword}`);
        dispatch({
            type: REGISTER_REQUEST,
            payload: user,
        });
    };

    useEffect(() => {
        console.log('Reg Render', regResult);
        if (regResult) {
            history.push('/login');
            dispatch({
                type: REGISTER_FAILURE,
            });
        }
    }, [regResult]);

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <input
                    className="register-field lang-eng"
                    id="email"
                    type="email"
                    name="userEmail"
                    placeholder="이메일"
                    value={form.userEmail}
                    onChange={onChange}
                />
                <br />
                <input
                    className="register-field lang-eng"
                    id="name"
                    type="name"
                    name="userName"
                    placeholder="별명"
                    value={form.userName}
                    onChange={onChange}
                />
                <br />
                <input
                    className="register-field lang-eng"
                    id="password"
                    type="password"
                    name="userPassword"
                    placeholder="비밀번호"
                    value={form.userPassword}
                    onChange={onChange}
                />
                <br />
                <div className="register-err-field">
                    {pwCheck ? null : (
                        <div className="err-msg">
                            적절하지 않은 형식입니다.
                            <br />
                            (영문+숫자+특수문자 포함 8~50자)
                        </div>
                    )}
                </div>
                <input className="register-button lang-eng" type="submit" value="Register" disabled={!pwCheck} />
            </form>
        </div>
    );
};

export default Register;
