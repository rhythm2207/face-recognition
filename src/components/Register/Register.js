import React from 'react';
import './Register.css'

class Register extends React.Component {

    constructor() {
        super()
        this.state = {
            reg_email: '',
            reg_password: '',
            name: ''
        }
    }
    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ reg_email: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ reg_password: event.target.value })
    }
    onRegisterSignIn = () => {
        fetch('https://still-plateau-92669.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.reg_email,
                password: this.state.reg_password,
                name: this.state.name
            })
        }).then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
    }
    render() {
        const { onRouteChange } = this.props
        return (
            <div className='container'>
                <div className='register-form'>
                    <h1>Register</h1>
                    <div className="credentials">

                        <div className="field">
                            Name  : <input className='type-box' type="text" onChange={this.onNameChange} />
                        </div>

                        <div className="field">
                            Email : <input className='type-box' type="email" onChange={this.onEmailChange} />
                        </div>
                        <div className="field">
                            Password : <input className='type-box' type="password" onChange={this.onPasswordChange} />
                        </div>

                        <div className="field">
                            <input type='button' value='Register' className='type-box button-register' onClick={this.onRegisterSignIn} />
                        </div>
                    </div>
                    <p className='register' onClick={() => onRouteChange('signin')} >SignIn</p>
                </div>

            </div>
        )
    }
}

export default Register