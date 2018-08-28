import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './styles/index.css';
import 'material-responsive-grid/material-responsive-grid.css';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import './utils/i18n'

import { store } from './helpers'; 
 
let templateId = '';
document.location.search.substring(1).split('&').map(el => el.indexOf('id=') !== -1 && (templateId = el.split('id=').join('')));

store.dispatch({type:"LOAD_COMPONENTS"});
store.dispatch({type:"LOAD_TEMPLATE", templateId});
store.dispatch({type:"LOAD_COMPANY", host_name: 'localhost'});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

