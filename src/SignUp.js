import React from 'react';
import { css } from 'glamor';
import { Auth } from 'aws-amplify';

class SignUp extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',
        phone_number: '',
        authCode: ''
    };

    onChange = (key, value) => {
        this.setState({ [key]: value });
    };

    signUp = () => {
        const { username, password, email, phone_number } = this.state;
        Auth.signUp({
            username,
            password,
            attributes: {
                email,
                phone_number
            }
        })
        .then(() => console.log('successful sign up!'))
        .catch(err => console.log('error signing up: ', err));
    }

    confirmSignUp = () => {
        Auth.confirmSignUp(this.state.username, this.state.authCode)
        .then(console.log('successful confirm sign up!'))
        .catch(err => console.log('error confirming signing up: ', err));
    }

    render() {
        return (
            <div {...css(styles.container)}>
                <h2>SignUp</h2>
                <input
                    {...css(styles.input)}
                    placeholder='Username'
                    onChange={evt => this.onChange('username', evt.target.value)}
                />
                <input
                    {...css(styles.input)}
                    placeholder='Password'
                    type='password'
                    onChange={evt => this.onChange('password', evt.target.value)}
                />
                <input
                    {...css(styles.input)}
                    placeholder='Email'
                    onChange={evt => this.onChange('email', evt.target.value)}
                />
                <input
                    {...css(styles.input)}
                    placeholder='Phone Number'
                    onChange={evt => this.onChange('phone_number', evt.target.value)}
                />
                <div {...css(styles.button)} onClick={this.signUp}>
                    <span>Sign Up</span>
                </div>

                <input
                    {...css(styles.input)}
                    placeholder='Authentication Code'
                    onChange={evt => this.onChange('authCode', evt.target.value)}
                />
                <div {...css(styles.button)} onClick={this.confirmSignUp}>
                    <span>Confirm Sign Up</span>
                </div>
            </div>
        );
    }
}
let styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        width: '170px',
        padding: '10px 0px',
        backgroundColor: '#ddd',
        cursor: 'pointer',
        borderRadius: '3px',
        ':hover': {
            backgroundColor: '#ededed'
        }
    },
    input: {
        height: 40,
        marginBottom: '10px',
        border: 'none',
        outline: 'none',
        borderBottom: '2px solid #4CAF50',
        fontSize: '16px',
        '::placeholder': {
            color: 'rgba(0,0,0,.3)'
        }
    }
};

export default SignUp
