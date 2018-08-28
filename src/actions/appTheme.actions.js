import { appThemeConstants } from '../constants';

export const appThemeActions = {
    setAppTheme
};

function setAppTheme(themaName) {
    return {
        type: appThemeConstants.SET_THEME,
        payload: themaName
    };
}
