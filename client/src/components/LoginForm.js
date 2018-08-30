import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
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
        const { email, password } = this.state;
        this.props.login(email, password)
            .then(() => {
                if (!this.props.error) {
                    this.setState({
                        email: '',
                        password: '',
                        error: ''
                    });
                    this.props.closeModal();
                }
            });
    }

    changeFormType = () => {
        this.props.setFormType('signup');
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input 
                        id="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label>Password</label>
                    <input
                        id="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Login</button>
                    <div onClick={this.changeFormType}>Create An Account</div>
                    {this.props.error && <div className="login-form__error">{this.props.error}</div>}
                </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(startLogin(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);