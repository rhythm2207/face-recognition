import React from 'react';
import './Register.css'

const Login = ({ onRouteChange }) => {
    return (
        <div className='container'>
            <div className='login-form'>
                <h1>Register</h1>
                <div className="credentials">
                    Name  : <input className='type-box' type="text" />
                    Email : <input className='type-box' type="email" />
                    Password : <input className='type-box' type="password" />

                    <input type='button' value='Register' className='type-box button-sign' onClick={() => onRouteChange('home')} />
                </div>

            </div>
        </div>
    )
}

export default Login