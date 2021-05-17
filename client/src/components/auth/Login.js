import React from 'react';

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <form action="/login" method="POST">
        <label>email: </label>
        <input id="userEamil" type="email" name="userEmail"></input>
        <br></br>
        <label>pwd: </label>
        <input id="userPassword" type="password" name="userPassword"></input>
        <br></br>
        <input type="submit" />
      </form>
    </>
  );
};

export default Login;