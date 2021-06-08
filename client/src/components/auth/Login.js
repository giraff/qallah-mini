import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LOGIN_REQUEST, CLEAR_ERROR_REQUEST } from '../../redux/types';

const Login = () => {
    // 로그인 할 때 나타날 에러 메시지 등을 표시
    const [localMsg, setLocalMsg] = useState('');
    const [form, setValues] = useState({
        email: '',
        password: '',
    });

    // useSelector: reducer에서 상태값 가져오기
    const { errorMsg, isAuthenticated } = useSelector(state => state.auth);
    // dispatch : redux에 타입 (상태) 전달함으로써 상태 변화 일으키기
    const dispatch = useDispatch();
    // history : 회원가입 후 , login 페이지로 이동하기
    const history = useHistory();

    // errorMsg 표시 업데이트 및 로그인 완료 후 메인 페이지로 이동
    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
            if (isAuthenticated) history.push('/');
        } catch (e) {
            console.log(e);
        }
    }, [errorMsg, isAuthenticated]);

    useEffect(() => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        });
    }, [dispatch, history.location]);

    const onChange = e => {
        const { name, value } = e.target;
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        });
        setValues({
            ...form,
            [name]: value,
        });
        console.log(form);
    };

    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = form;
        const user = { email, password };
        console.log(`login submit: ${user.email}, ${user.password}`);
        dispatch({
            type: LOGIN_REQUEST,
            // payload에 Object 형태로 전달
            payload: user,
        });
    };

    return (
        <div>
            {localMsg ? <div style={{ color: 'red' }}>{localMsg}</div> : null}
            <form onSubmit={e => onSubmit(e)}>
                <input className="login-field" id="email" type="email" name="email" placeholder="email" onChange={e => onChange(e)} />
                <br />
                <input className="login-field" id="password" type="password" name="password" placeholder="password" onChange={e => onChange(e)} />
                <br />
                <input className="login-button lang-eng" type="submit" value="LogIn" />
            </form>
        </div>
    );
};

export default Login;
