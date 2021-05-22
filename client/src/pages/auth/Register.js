import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import regReducer from '../../components/redux/reducers/regReducer';
import { REGISTER_REQUEST } from '../../components/redux/types';


const Register = () => {
  const [form, setValues] = useState({
    email: "",
    name:"",
    password: ""
  })
  // useSelector : isRegistied 현재 값을 참, 거짓 값으로 가져오기
  const regResult = useSelector(state => state.reg.isRegistied);

  const { email, name, password } = form;
   // dispatch : redux에 타입 (상태) 전달함으로써 상태 변화 일으키기 
  const dispatch = useDispatch();
  // history : 회원가입 후 , login 페이지로 이동하기
  const history = useHistory();

  const onChange = (e) => {
    const {name, value} = e.target;

    setValues({
      ...form,
      [name]: value,
    })
    console.log(form);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {email, name, password} = form;
    const user = {email, name, password}
    console.log(`register submit: ${user.email}, ${user.name}, ${user.password}`);
    dispatch({
      type: REGISTER_REQUEST,
      payload: user
    })
  }

  useEffect(() => {
      console.log('Reg Render', regResult);
      if(regResult) history.push('/login')
  }, [regResult]);

  
  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label>email: </label>
        <input id="email" type="email" name="email" value={email} onChange={onChange}></input>
        <br></br>
        <label>name: </label>
        <input id="name" type="name" name="name" value={name} onChange={onChange}></input>
        <br></br>
        <label>pwd: </label>
        <input id="password" type="password" name="password" value={password} onChange={onChange}></input>
        <br></br>
        <input type="submit" />
      </form>
    </>
  );
};

export default Register;