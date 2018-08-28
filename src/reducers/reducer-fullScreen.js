import {fullScreenConstants} from '../constants';

const initialState = false;

export default function (state = initialState, action) {
    switch (action.type) {
        case fullScreenConstants.FULL_SCREEN:
            {
                return action.payload;
            }
    }
    return state;
}