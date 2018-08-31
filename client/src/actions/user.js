export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const startSetUser = () => {
    return (dispatch, getState) => {
        const { token } = getState().auth;
        return fetch('/auth/getUser', {
            method: 'GET',
            headers: { 'Authorization': token }
        })
            .then((res) => res.json())
            .then((user) => dispatch(setUser(user)));
    };
};