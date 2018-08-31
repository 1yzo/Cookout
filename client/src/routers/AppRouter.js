import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Header from '../components/Header';
import HostPage from '../components/HostPage';
import { startSetUser } from '../actions/user';

class AppRouter extends React.Component {
    componentDidMount() {
        const { tokenExists, startSetUser } = this.props;
        if (tokenExists) {
            startSetUser();
        }
    }
    
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" component={LandingPage} exact />
                        <Route path="/host" component={HostPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    tokenExists: !!state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    startSetUser: () => dispatch(startSetUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);