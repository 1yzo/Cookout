import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import '../styles/login-modal.css';

class LoginModal extends React.Component {
    state = {
        formType: 'login'
    };

    setFormType = (formType) => {
        this.setState(() => ({ formType }));
    }
    
    render() {
        return (
            <Modal 
                className="login-modal"
                overlayClassName="login-modal__overlay"
                isOpen={this.props.isOpen}
                ariaHideApp={false}
                onRequestClose={this.props.closeModal}
            >
                {this.state.formType === 'login' ? <LoginForm setFormType={this.setFormType}/> : <SignupForm />}
            </Modal>
        );
    }
}

export default LoginModal;