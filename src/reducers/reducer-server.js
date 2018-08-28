import { serverConstants } from '../constants';

let server = JSON.parse(localStorage.getItem('server'));
const initialState = server ? server : null;

export default function (state = initialState, action) {
    switch (action.type) {
        case serverConstants.SET_SERVER:
            return action.payload;
    }
    return state
}