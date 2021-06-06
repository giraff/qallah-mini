import React from 'react';
import { Fragment } from 'react';
import LoginComponent from '../components/auth/Login';
import { Link } from 'react-router-dom';

const Login = () => (
  <section className="login-section">
      <div className="sections-overlay login-overlay">
          <div className="login-container">
              <div className="login-tab-wrapper">
                  <div className="register-tab">
                      <Link className="register-label sub-tab lang-eng" to="/Register">SignUp</Link>
                  </div>
                  <div className="login-tab">
                      <h1 className="login-label lang-eng">Log In</h1>
                  </div>
              </div>
              <div className="login-form">
                  <div className="login-form-container">
                    <LoginComponent></LoginComponent>
                  </div>
              </div>
          </div>
      </div>      
  </section>
)

export default Login;