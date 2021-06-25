import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { REGISTER_REQUEST } from 'redux/types';

const Register = () => {
    const [form, setValues] = useState({
        userEmail: '',
        userName: '',
        userPassword: '',
    });
    const [pwCheck, setPwCheck] = useState(false);
    // useSelector : isRegistied 현재 값을 참, 거짓 값으로 가져오기
    const regResult = useSelector(state => state.reg.isRegistied);

    // dispatch : redux에 타입 (상태) 전달함으로써 상태 변화 일으키기
    const dispatch = useDispatch();
    // history : 회원가입 후 , login 페이지로 이동하기
    const history = useHistory();

    const onChange = e => {
        const { name, value } = e.target;

        setValues({
            ...form,
            [name]: value,
        });
        console.log(form);
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
        if (regResult) history.push('/login');
    }, [regResult]);

    useEffect(() => {
        const pw = form.userPassword;
        const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\dd$@$!%*#?&]{8,50}$/.test(pw);
        if (!exp) {
            setPwCheck(false);
        } else {
            setPwCheck(true);
        }
        console.log('현재의 참 거부 값 =>', pwCheck);
    }, [form.userPassword]);

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <input
                    className="register-field lang-eng"
                    id="email"
                    type="email"
                    name="userEmail"
                    placeholder="email"
                    value={form.userEmail}
                    onChange={onChange}
                />
                <br />
                <input
                    className="register-field lang-eng"
                    id="name"
                    type="name"
                    name="userName"
                    placeholder="name"
                    value={form.userName}
                    onChange={onChange}
                />
                <br />
                <input
                    className="register-field lang-eng"
                    id="password"
                    type="password"
                    name="userPassword"
                    placeholder="password"
                    value={form.userPassword}
                    onChange={onChange}
                />
                <div className="register-err-field err-wrap">
                    {/* 이 부분은 비밀번호 입력하는 input 밑에 나오는것이 아니라 홈페이지 밑부분에 출력됩니다. 수정이 필요함. */}
                    {pwCheck ? null : <div className="err-msg">적절하지 않은 형식입니다(영문+숫자+특수문자 포함 8자리 이상)</div>}
                </div>
                <br />
                <input className="register-button lang-eng" type="submit" value="Sign Up" disabled={!pwCheck} />
            </form>
        </div>
    );
};

export default Register;
