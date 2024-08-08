export const Types = {
    GET_USERS_REQUEST: 'users/get_users_request',
    GET_USERS_SUCCESS: 'users/get_users_success',
    USERS_ERROR: 'users/user_error',
    ADD_USER: 'ADD_USER',
    DELETE_USER: 'DELETE_USER',
};


export const getUsersRequest = () => ({
    type: Types.GET_USERS_REQUEST
});

export const getUsersSuccess = ({ item }) => ({
    type: Types.GET_USERS_SUCCESS,
    payload: {
        item
    }
});

export const usersError = () => ({
    type: Types.USERS_ERROR
});

export const addUser = (user) => ({
    type: Types.ADD_USER,
    payload: user
});

export const deleteUser = (userId) => ({
    type: Types.DELETE_USER,
    payload: userId
});