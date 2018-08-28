import { soundConstants } from '../constants';

export const soundActions = {
    setSound
};

function setSound(status) {
    return {
        type: soundConstants.SOUND,
        payload: status
    };
}
