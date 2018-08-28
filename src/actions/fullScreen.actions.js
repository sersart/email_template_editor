import { fullScreenConstants } from '../constants';

export const fullScreenActions = {
    setFullScreen
};

function setFullScreen(status) {
    return {
        type: fullScreenConstants.FULL_SCREEN,
        payload: status
    };
}
