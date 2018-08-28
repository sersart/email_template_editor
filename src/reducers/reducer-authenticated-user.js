import { appConstants } from '../constants';

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case appConstants.AUTHENTICATED_USER:
            return action.data;
        case "RESET":
            {
                state = initialState;
                return state;
            }
        default:
            return state
    }
}
