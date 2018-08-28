import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'

import { alert } from './reducer-alert';
import SliderMenuStatus from './reducer-slider-menu';
import CompanyReducer from './reducer-company';
import LanguageReducer from './reducer-language';
import FullScreenReducer from './reducer-fullScreen';
import AppThemeReducer from './reducer-appTheme';
import SoundReducer from './reducer-sound';
import ServerReducer from './reducer-server';
import Authentication from './reducer-authentication';
import AuthenticatedUserReducer from './reducer-authenticated-user';
import Components from './reducer-components';
import Tabs from './reducer-tabs';
import ReducerTemplate from './reducer-template';
import Common from './reducer-common';
import templateId from './reducer-templateId';
import tinymce_config from './reducer-tinymce_config';


const allReducers = combineReducers({
    loadingBar: loadingBarReducer,
    alert: alert,
    sliderMenuStatus: SliderMenuStatus,
    company: CompanyReducer,
    language: LanguageReducer,
    fullScreen: FullScreenReducer,
    appTheme: AppThemeReducer,
    sound: SoundReducer,
    server: ServerReducer,
    authentication: Authentication,
    authenticatedUser: AuthenticatedUserReducer,
    components: Components,
    tabs: Tabs,
    template: ReducerTemplate,
    common: Common,
    templateId,
    tinymce_config

});

export default allReducers