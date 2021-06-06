import React from 'react';
import { Fragment } from 'react';
import RegisterComponent from '../components/register/Register';
import { Link } from 'react-router-dom';

const Register = () => (
<section class="register-section">
  <div class="sections-overlay register-overlay">
      <div class="register-container">
          <div class="register-tab-wrapper">
              <div class="login-tab">
                  <Link class="login-label sub-tab lang-eng" to="/Login">Login</Link>
              </div>
              <div class="register-tab">
                  <h1 class="register-label lang-eng">Sign Up</h1>
              </div>
          </div>
          <div class="register-form">
              <div class="register-form-container">
                <RegisterComponent></RegisterComponent>
              </div>
          </div>
      </div>      
  </div>
</section>

)

export default Register;