import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import websocketMiddleware from '../middleware/websocket-middleware'
import allReducers from '../reducers';
import mySagas from '../sagas';
import createSagaMiddleware from 'redux-saga';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    allReducers, 
    {
        'common': {
            'fontSize': '16',
            'templateName': '',
            'color': '#333333',
            'bgcolor': 'rgb(240, 240, 240',
            'backgroundColor': '#FFFFFF',
        },
        'tinymce_config': {
            inline: true,
            menubar: false,
            paste_as_text: true,
            preview_styles: false,
            paste_data_images: false,
            paste_auto_cleanup_on_paste: true,
            plugins: ["link paste hr lists textcolor code"],
            toolbar: "bold italic forecolor backcolor hr styleselect removeformat | link unlink | code",
            paste_postprocess : function(pl, o) {
                o.node.innerHTML = o.node.innerHTML.replace(/&nbsp;/ig, " ");
                o.node.innerHTML = o.node.innerHTML.replace(/&quot;/ig, "\"");
            }
        },
        'template': [],
        'components': [],
        'tabs': {
            'blocks': true,
            'common': false,
            'options': false,
        }
    },
    applyMiddleware(
        websocketMiddleware,
        thunkMiddleware,
        sagaMiddleware,
        loggerMiddleware
    )
);

sagaMiddleware.run(mySagas);