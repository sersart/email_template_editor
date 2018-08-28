import { authHeader } from '../helpers';

export const appService = {
    getAllData,
};

function getAllData(server) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({})
    };

    const serviceURL = "http://" + server.url + ":" + server.port.toString() + "/TraderService";

    return fetch(serviceURL + '/getAllData', requestOptions)
        .then(response => {
            console.log(response);
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
}