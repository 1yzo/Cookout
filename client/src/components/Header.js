import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

import '../styles/header.css';

class Header extends React.Component {
    state = {
        modalShouldOpen: false
    };
    
    handleLoginClick = () => {
        this.setState(() => ({ modalShouldOpen: true }));
    }
    
    closeModal = () => {
        this.setState(() => ({ modalShouldOpen: false }));
    }
    
    render() {
        return (
            <div className="header">
                <h1>Cookout</h1>
                <div className="header__link-container">
                    <a>Host</a>
                    <a onClick={this.handleLoginClick}>Login</a>
                </div>
                <LoginModal isOpen={this.state.modalShouldOpen} closeModal={this.closeModal} />
            </div>
        );
    }
}

export default connect()(Header);