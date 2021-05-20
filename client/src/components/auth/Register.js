import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { REGISTER_REQUEST } from '../../redux/types'
const Register = () => {
  const [form, setValues] = useState({
    email: "",
    name:"",
    password: ""
  })

  const { email, name, password } = form;

  const dispatch = useDispatch();

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