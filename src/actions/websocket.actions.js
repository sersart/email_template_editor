import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { history } from '../helpers';
import { websocketConstants } from '../constants';
//import { appConstants, userInstrumentConstants, userRolesConstants } from '../constants';
//import { instrumentGroupsConstants, instrumentConstants, rateConstants, chartsConstants } from '../constants';
//import { accountConstants, newsConstants, orderConstants, historyConstants } from '../constants';

export const websocketActions = {
    connect,
    connecting,
    connected,
    disconnected,
    messageReceived,
    sendMessage
};

function connect(connectionInfo) {
    console.log("web socket connect: ", connectionInfo);
    return dispatch => {
        dispatch(connect(connectionInfo));
    };
    function connect(data) { return { type: websocketConstants.WEB_SOCKET_CONNECT, payload: data } }
}

function connecting(url) {
    console.log("web socket connecting: ", url);
    return dispatch => {
        dispatch(showLoading())
    };
}

function connected(connectionInfo) {
    console.log("web socket connected: ", connectionInfo);
    return dispatch => {
        dispatch(login({ action: 'login', token: connectionInfo.token }))
        dispatch(hideLoading())
        history.push('/');
    };
    function login(data) { return { type: websocketConstants.WEB_SOCKET_SEND_MESSAGE, payload: data } }
}

function disconnected(url) {
    console.log("web socket disconnected: ");
    return dispatch => {
        dispatch(hideLoading())
    };
}

function sendMessage(msg) {
    console.log("Send message to web socket: ", msg);
    return {
        type: websocketConstants.WEB_SOCKET_SEND_MESSAGE,
        payload: msg
    };
}

function messageReceived(msg) {
 /*   return dispatch => {
        switch (msg.action) {
            case 'UpdateRate':
                dispatch(success_rates(msg.payload));
                break;
            case 'account':
                dispatch(success_authenticated_user(msg));
                break;
            case 'possition':
                dispatch(success_authenticated_user(msg));
                break;
        }
    };
    function success_authenticated_user(data) { return { type: appConstants.AUTHENTICATED_USER, data } }
    function success_user_roles(data) { return { type: userRolesConstants.GET_ROLES_SUCCESS, data } }
    function success_user_instruments(data) { return { type: userInstrumentConstants.GET_USER_INSTRUMENTS_SUCCESS, data } }
    function success_instrument_groups(data) { return { type: instrumentGroupsConstants.GET_INSTRUMENT_GROUPS_SUCCESS, data } }
    function success_instruments(data) { return { type: instrumentConstants.GET_INSTRUMENTS_SUCCESS, data } }
    function success_account(data) { return { type: accountConstants.GET_ACCOUNT_SUCCESS, data } }
    function success_orders(data) { return { type: orderConstants.GET_ORDERS_SUCCESS, data } }
    function success_history(data) { return { type: historyConstants.GET_HISTORIES_SUCCESS, data } }
    function success_news(data) { return { type: newsConstants.GET_NEWSES_SUCCESS, data } }
    function success_rates(data) { return { type: rateConstants.SET_RATE, payload: data } }*/
}
