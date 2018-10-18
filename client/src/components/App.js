import React from 'react';
import { connect } from 'react-redux';
import { startSetUser } from '../actions/user';
import AppRouter from '../routers/AppRouter';

// If a persisted token exists then load the user and then render AppRouter
export class App extends React.Component {
    state = {
        isLoaded: this.props.token ? false : true
    };
    
    render() {
        if (this.state.isLoaded) {
            return <AppRouter />
        } else {
            this.props.startSetUser().then(() => this.setState(() => ({ isLoaded: true })));
            return <div>Loading...</div>
        }
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
    startSetUser: () => dispatch(startSetUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);