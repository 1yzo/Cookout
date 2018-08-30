export const setAuthToken = (token) => ({
    type: 'SET_AUTH_TOKEN',
    token
});

export const removeAuthToken = () => ({
    type: 'REMOVE_AUTH_TOKEN'
});

export const startSignup = (email, password) => {
    return (dispatch) => {
        return fetch('/auth/signup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userName: email, password })
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error('An account with that email already exists');
                }
            })
            .then((user) => dispatch(startLogin(email, password)))
            .catch((err) => dispatch(setAuthError(err.toString())));
    };
};

export const startLogin = (email, password) => {
    return (dispatch) => {
        return fetch('/auth/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userName: email, password })
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error('Wrong email or password');
                }
            })
            .then((token) => dispatch(setAuthToken(token)))
            .catch((err) => dispatch(setAuthError(err.toString())));
    };
}

export const setAuthError = (error) => ({
    type: 'SET_AUTH_ERROR',
    error
});