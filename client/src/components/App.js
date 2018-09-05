import React from 'react';
import { connect } from 'react-redux';
import { startSetUser } from '../actions/user';
import AppRouter from '../routers/AppRouter';

class App extends React.Component {
    state = {
        isLoaded: this.props.token ? false : true
    };
    
    render() {
        if (this.state.isLoaded) {
            return <AppRouter />
        } else {
            this.props.dispatch(startSetUser()).then(() => this.setState(() => ({ isLoaded: true })));
            return <div>Loading...</div>
        }
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});

export default connect(mapStateToProps)(App);