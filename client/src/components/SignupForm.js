import React from 'react';
import { connect } from 'react-redux';
import { startSignup } from '../actions/auth';

class SignupForm extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
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
        this.props.signup(email, password, name)
            .then(() => {
                if (!this.props.error) {
                    this.setState({
                        email: '',
                        password: '',
                        confirmPassword: '',
                        error: ''
                    });
                    this.props.closeModal();
                } 
            });
    }

    changeFormType = () => {
        this.props.setFormType('login');
    }
    
    render() {
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
                {this.props.error && <div className="login-form__error">{this.props.error}</div>}
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