import {languageConstants} from '../constants';

const initialState = 'en-US';

export default function (state = initialState, action) {
    switch (action.type) {
        case languageConstants.SET_LANGUAGE:
            {
                return action.payload;
            }
    }
    return state;
}