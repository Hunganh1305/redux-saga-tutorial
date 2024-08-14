import API_BASE_URL from "./apiConfig";

export const getUsers = () => {
    return API_BASE_URL.get('/users', {
        params: {
            limit: 1000,
        }
    });
};
