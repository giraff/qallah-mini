import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGIN_REQUEST } from '../../redux/types';

const Login = () => {
  const [form, setValues] = useState({
    email: "",
    password: ""
  });

  // dispatch : redux에 타입 (상태) 전달함으로써 상태 변화 일으키기 
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(form);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const {email, password} = form;
    const user = {email, password}
    console.log(`login submit: ${user.email}, ${user.password}`);
    dispatch({
      type: LOGIN_REQUEST,
      //payload에 Object 형태로 전달
      payload: user
    })

  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label>email: </label>
        <input 
          id="email" 
          type="email" 
          name="email"
          onChange={(e) => onChange(e)}
        ></input>
        <br></br>
        <label>pwd: </label>
        <input 
          id="password" 
          type="password" 
          name="password"
          onChange={(e) => onChange(e)}
        ></input>
        <br></br>
        <input type="submit" />
      </form>
    </>
  );
};

export default Login;