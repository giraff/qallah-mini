import React from 'react';
import { Link } from 'react-router-dom';
import RegisterComponent from '../components/register/Register';

const Register = () => (
    <section className="register-section">
        <div className="sections-overlay register-overlay">
            <div className="register-container">
                <div className="register-tab-wrapper">
                    <div className="login-tab">
                        <Link className="login-label sub-tab lang-eng" to="/Login">
                            Login
                        </Link>
                    </div>
                    <div className="register-tab">
                        <h1 className="register-label lang-eng">Sign Up</h1>
                    </div>
                </div>
                <div className="register-form">
                    <div className="register-form-container">
                        <RegisterComponent />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Register;
