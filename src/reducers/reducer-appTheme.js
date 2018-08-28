import {appThemeConstants} from '../constants';

const initialState = appThemeConstants.BLUE;

export default function (state = initialState, action) {
    switch (action.type) {
        case appThemeConstants.SET_THEME:
            {
                return action.payload;
            }
    }
    return state;
}