import {soundConstants} from '../constants';

const initialState = false;

export default function (state = initialState, action) {
    switch (action.type) {
        case soundConstants.SOUND:
            {
                return action.payload;
            }
    }
    return state;
}