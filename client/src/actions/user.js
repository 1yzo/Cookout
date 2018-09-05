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
            .then((user) => dispatch(setUser(user)))
            .catch((err) => console.log(err));
    };
};

export const setListings = (listings) => ({
    type: 'SET_LISTINGS',
    listings
});

export const startSetListings = (userId) => {
    return (dispatch) => {
        return fetch(`/users/${userId}`)
            .then((res) => res.json())
            .then((user) => dispatch(setListings(user.listings)))
            .catch((err) => console.log(err));
    };
}