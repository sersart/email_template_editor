import { languageConstants } from '../constants';

export const languageActions = {
    setLanguage
};

function setLanguage(code) {
    return {
        type: languageConstants.SET_LANGUAGE,
        payload: code
    };
}