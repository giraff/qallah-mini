import React, { useState } from 'react';

const Register = () => {
  const [form, setValues] = useState({
    email: "",
    name:"",
    password: ""
  })
  return (
    <>
      <h1>Sign up</h1>
      <form action="/register" method="POST">
        <label>email: </label>
        <input id="email" type="email" name="eamil"></input>
        <br></br>
        <label>name: </label>
        <input id="name" type="text" name="name"></input>
        <br></br>
        <label>pwd: </label>
        <input id="password" type="password" name="password"></input>
        <br></br>
        <input type="submit" />
      </form>
    </>
  );
};

export default Register;