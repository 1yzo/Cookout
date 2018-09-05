import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { removeAuthToken } from '../actions/auth';
import { removeUser } from '../actions/user';

import '../styles/header.css';

class Header extends React.Component {
    state = {
        modalShouldOpen: false
    };
    
    handleLoginClick = () => {
        this.setState(() => ({ modalShouldOpen: true }));
    }

    handleLogoutClick = () => {
        const { dispatch } = this.props;
        dispatch(removeAuthToken());
        dispatch(removeUser());
    }
    
    closeModal = () => {
        this.setState(() => ({ modalShouldOpen: false }));
    }

    
    render() {
        const { isLoggedIn } = this.props;
        return (
            <div className="header">
                <Link to="/"><h1>Cookout</h1></Link>
                <div className="header__link-container">
                    <Link to="/host">Host</Link>
                    {!isLoggedIn && <a onClick={this.handleLoginClick}>Login</a>}
                    {isLoggedIn && <a>Bookings</a>}
                    {isLoggedIn && <a>Saved</a>}
                    {isLoggedIn && <i onClick={this.handleLogoutClick} className="fas fa-user-circle profile-icon"></i>}
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