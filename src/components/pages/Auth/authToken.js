// authToken.js

// let authToken = null;
// let estId = null;

export const setAuthToken = (token) => {
    // authToken = token;
    localStorage.setItem('token', token);
};

export const getAuthToken = () => {
    // return authToken;
    return localStorage.getItem('token');
};

export const deleteAuthToken = () => {
    // authToken = null;
    // Removing an item from localStorage
    localStorage.removeItem('token');

};

export const setEstId = (id, er_id) => {
    // estId = id;
    localStorage.setItem('estId', id);
    localStorage.setItem('erId', er_id);
};

export const getEstId = () => {
    // return estId;
    return  localStorage.getItem('estId');
};

export const getErId = () => {
    // return estId;
    return  localStorage.getItem('erId');
};
export const deleteEstId = () => {
    // estId=null;
    localStorage.removeItem('estId');
    localStorage.removeItem('erId');
};