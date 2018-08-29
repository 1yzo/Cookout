export const setAuthToken = (token) => ({
    type: 'SET_AUTH_TOKEN',
    token
});

export const removeAuthToken = () => ({
    type: 'REMOVE_AUTH_TOKEN'
});

export const startSignup = (email, password) => {
    return (dispatch) => {
        fetch('/auth/signup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userName: email, password })
        })
            .then((res) => res.json())
            .then((user) => dispatch(startLogin(email, password)));
    };
};

export const startLogin = (email, password) => {
    return (dispatch) => {
        fetch('/auth/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userName: email, password })
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    console.log('Wrong email or password');
                }
            })
            .then((token) => dispatch(setAuthToken(token)));
    };
}
