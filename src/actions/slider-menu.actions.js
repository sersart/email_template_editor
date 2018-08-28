import { sliderMenuConstants } from '../constants';

export const sliderMenuActions = {
    setSliderMenuStatus
};

function setSliderMenuStatus(status) {
    return {
        type: sliderMenuConstants.SLIDER_MENU,
        payload: status
    };
}
