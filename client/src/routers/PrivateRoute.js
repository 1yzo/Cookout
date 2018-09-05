import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ userExists, component: Component, ...rest }) => {
    if (userExists) {
        return <Route {...rest} component={Component} />
    } else {
        return <Redirect to="/" />
    }
};

const mapStateToProps = (state) => ({
    userExists: state.user._id
});

export default connect(mapStateToProps)(PrivateRoute);