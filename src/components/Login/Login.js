import React from 'react';
import './Login.css'

class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }
    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
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
        const { onRouteChange } = this.props;
        return (
            <div className='container'>
                <div className='login-form'>
                    <h1>SignIn</h1>
                    <div className="credentials">
                        <div className="field">
                            Username : <input className='type-box' type="text" onChange={this.onEmailChange} />
                        </div>
                        <div className="field">
                            Password : <input onChange={this.onPasswordChange} className='type-box'
                                type="password" />
                        </div>
                        <div className="field">
                            <input type='button' value='SignIn' className='type-box button-sign' onClick={this.onSubmitSignIn} />
                        </div>
                    </div>
                    <p className='register' onClick={() => onRouteChange('register')} >Register</p>

                </div>
            </div>
        )
    }
}
export default Login