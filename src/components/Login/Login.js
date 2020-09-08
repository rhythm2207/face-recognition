import React from 'react';
import './Login.css'

const Login = ({ onRouteChange }) => {
    return (
        <div className='container'>
            <div className='login-form'>
                <h1>SignIn</h1>
                <div className="credentials">
                    Username : <input className='type-box' type="text" />
                    Password : <input className='type-box' type="password" />
                    <input type='button' value='SignIn' className='type-box button-sign' onClick={() => onRouteChange('home')} />
                </div>
                <p className='register' onClick={() => onRouteChange('register')} >Register</p>

            </div>
        </div>
    )
}

export default Login