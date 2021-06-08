import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { REGISTER_REQUEST } from 'redux/types';

const Register = () => {
    const [form, setValues] = useState({
        userEmail: '',
        userName: '',
        userPassword: '',
    });
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
                <br />
                <input className="register-button lang-eng" type="submit" value="Sign Up" />
            </form>
        </div>
    );
};

export default Register;
