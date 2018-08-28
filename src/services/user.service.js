import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    getAllData,
};

function login(username, password, server) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'userName': username, 'password': password })
    };

    const serviceURL = "http://" + server.url + ":" + server.port.toString() + "/TraderService";

    return fetch(serviceURL +'/login', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }
            console.log(response);
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('server', JSON.stringify(server));
            }

            return user;
        });
}

function getAllData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/getAllData', requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('server');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/register', requestOptions).then(handleResponse);
}
function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}