import {sliderMenuConstants} from '../constants';

const initialState = false;

export default function (state = initialState, action) {
    switch (action.type) {
        case sliderMenuConstants.SLIDER_MENU:
            {
                return action.payload;
            }
    }
    return state;
}