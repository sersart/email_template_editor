import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { history } from '../helpers';
import { alertActions, serverActions } from './';

import { appService } from '../services'
import { websocketConstants } from '../constants';

import { appConstants, userRolesConstants } from '../constants';
//import { instrumentGroupsConstants, instrumentConstants } from '../constants';
//import { accountConstants, newsConstants, orderConstants, historyConstants } from '../constants';

import { userService } from '../services';

export const appActions = {
    login,
    logout,
    getAllData,
};

function login(username, password, server) {
    return dispatch => {
        dispatch(showLoading())

        dispatch(request({ username }));
        this.server = server;
        var self = this;
        userService.login(username, password, server)
            .then(
            user => {
                if (user.code !== 1) {
                    dispatch(failure(user.code));
                    dispatch(alertActions.error(user.code));
                    dispatch(hideLoading())
                    return;
                }

                dispatch(serverActions.setServer(self.server));

                dispatch(this.getAllData(self.server, user.token));

                dispatch(hideLoading())
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(hideLoading())
            }
            );
    };

    function request(user) { return { type: appConstants.LOGIN_REQUEST, user } }
    function failure(error) { return { type: appConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        userService.logout();
        dispatch(websocket_disconnect());
        dispatch(success());
        history.push('/login');
    };
    function success() { return { type: appConstants.LOGOUT } }
} function websocket_disconnect() { return { type: websocketConstants.WEB_SOCKET_DISCONNECT } }


function getAllData(server, token) {
    return dispatch => {
        var self = this;
        console.log("1 token", token);
        
        dispatch(showLoading())

        appService.getAllData(server)
            .then(
            data => {
                if (data.code !== 1) {
                    dispatch(alertActions.error(data.code));
                    dispatch(hideLoading())
                    return;
                }

                dispatch(success_authenticated_user(data.payload.authenticated_user));
                dispatch(success_user_roles(data.payload.roles));
    /*            dispatch(success_user_instruments(data.payload.user_instruments));
                dispatch(success_instrument_groups(data.payload.instrument_groups));
                dispatch(success_instruments(data.payload.instruments));
                dispatch(success_account(getAccount()));
                dispatch(success_orders(defaultData()));
                dispatch(success_history(defaultData()));
                dispatch(success_news(defaultData()));

                dispatch(websocket_connect({ url: server.url, port: server.port, serviceName: 'TraderService', token: user.token }));
        */

        console.log("2 user", token);
                 dispatch(success(token));
                  history.push('/');

                dispatch(hideLoading())
            },
            error => {
                dispatch(alertActions.error(error));
                dispatch(hideLoading())
            }
            );
    };

    function success_authenticated_user(data) { return { type: appConstants.AUTHENTICATED_USER, data } }
    function success_user_roles(data) { return { type: userRolesConstants.GET_ROLES_SUCCESS, data } }
 //   function success_user_instruments(data) { return { type: userInstrumentConstants.GET_USER_INSTRUMENTS_SUCCESS, data } }
 //   function success_instrument_groups(data) { return { type: instrumentGroupsConstants.GET_INSTRUMENT_GROUPS_SUCCESS, data } }
 //   function success_instruments(data) { return { type: instrumentConstants.GET_INSTRUMENTS_SUCCESS, data } }
 //   function success_account(data) { return { type: accountConstants.GET_ACCOUNT_SUCCESS, data } }
//    function success_orders(data) { return { type: orderConstants.GET_ORDERS_SUCCESS, data } }
//    function success_history(data) { return { type: historyConstants.GET_HISTORIES_SUCCESS, data } }
//    function success_news(data) { return { type: newsConstants.GET_NEWSES_SUCCESS, data } }
      function success(token) { return { type: appConstants.LOGIN_SUCCESS, token } }

    function websocket_connect(data) { return { type: websocketConstants.WEB_SOCKET_CONNECT, payload: data } }

    function getAccount() {
        return { id: 12345678, balance: 1000000 };
    }

    function defaultData() {
        return [{
            id: 1,
            name: 'John Smith',
            status: 'Employed',
        },
        {
            id: 2,
            name: 'Randal White',
            status: 'Unemployed',
        },
        {
            id: 3,
            name: 'Stephanie Sanders',
            status: 'Employed',
        },
        {
            id: 4,
            name: 'Steve Brown',
            status: 'Employed',
        },
        {
            id: 5,
            name: 'Joyce Whitten',
            status: 'Employed',
        },
        {
            id: 6,
            name: 'Samuel Roberts',
            status: 'Employed',
        },
        {
            id: 7,
            name: 'Adam Moore',
            status: 'Employed',
        },
        {
            id: 8,
            name: 'Randal White',
            status: 'Unemployed',
        },
        {
            id: 9,
            name: 'Stephanie Sanders',
            status: 'Employed',
        },
        {
            id: 10,
            name: 'Steve Brown',
            status: 'Employed',
        },
        {
            id: 11,
            name: 'Joyce Whitten',
            status: 'Employed',
        },
        {
            id: 12,
            name: 'Samuel Roberts',
            status: 'Employed',
        },
        {
            id: 13,
            name: 'Adam Moore',
            status: 'Employed',
        },
        {
            id: 14,
            name: 'Stephanie Sanders',
            status: 'Employed',
        },
        {
            id: 15,
            name: 'Steve Brown',
            status: 'Employed',
        },
        ]

    }
}
