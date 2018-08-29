import React from 'react';
import { connect } from 'react-redux';
import { startSignup } from '../actions/auth';

class SignupForm extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    handleChange = (e) => {
        const { id: field, value } = e.target;
        const nextState = { ...this.state };
        nextState[field] = value;
        this.setState(() => nextState);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.signup(email, password);
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <label>Email</label>
                <input
                    id="email"
                    type="text"
                    onChange={this.handleChange}
                />
                <label>Password</label>
                <input
                    id="password"
                    type="password"
                    onChange={this.handleChange}
                />
                <label>Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    onChange={this.handleChange}
                />
                <button>Sign Up</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    signup: (email, password) => dispatch(startSignup(email, password))
});

export default connect(null, mapDispatchToProps)(SignupForm);