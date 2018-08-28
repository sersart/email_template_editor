import { serverConstants } from '../constants';

export const serverActions = {
    setServer
};

function setServer(config) {
    return {
        type: serverConstants.SET_SERVER,
        payload: config
    };
}
