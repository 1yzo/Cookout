import React from 'react';
import { connect } from 'react-redux';
import { startSignup } from '../actions/auth';

class SignupForm extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        passwordMatchError: ''
    };

    handleChange = (e) => {
        const { id: field, value } = e.target;
        const nextState = { ...this.state };
        nextState[field] = value;
        this.setState(() => nextState);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, name } = this.state;
        if (password === confirmPassword) {
            this.setState(() => ({ passwordMatchError: '' }));
            this.props.signup(email, password, name)
                .then(() => {
                    if (!this.props.error) {
                        this.setState({
                            email: '',
                            password: '',
                            confirmPassword: '',
                            error: '',
                            passwordMatchError: ''
                        });
                        this.props.closeModal();
                    } 
                });
        } else {
            this.setState(() => ({ passwordMatchError: 'Passwords do not match' }));
        }
    }

    changeFormType = () => {
        this.props.setFormType('login');
    }
    
    render() {
        const { error } = this.props;
        const { passwordMatchError } = this.state;
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <label>Name</label> 
                <input
                    id="name"
                    type="text"
                    onChange={this.handleChange}
                />
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
                <div onClick={this.changeFormType}>Already have an account?</div>
                {passwordMatchError && <div>{passwordMatchError}</div>}
                {error && <div className="login-form__error">{error}</div>}
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
    signup: (email, password, name) => dispatch(startSignup(email, password, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);