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
        const { isLoggedIn } = this.props;
        return (
            <div className="header">
                <h1>Cookout</h1>
                <div className="header__link-container">
                    <a>Host</a>
                    {!isLoggedIn && <a onClick={this.handleLoginClick}>Login</a>}
                    {isLoggedIn && <a>Bookings</a>}
                    {isLoggedIn && <a>Saved</a>}
                    {isLoggedIn && <i className="fas fa-user-circle profile-icon"></i>}
                </div>
                <LoginModal isOpen={this.state.modalShouldOpen} closeModal={this.closeModal} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: !!state.auth.token
});

export default connect(mapStateToProps)(Header);