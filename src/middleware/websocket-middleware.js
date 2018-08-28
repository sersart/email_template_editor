import { websocketActions } from '../actions/websocket.actions'
import { websocketConstants } from '../constants';

const websocketMiddleware = (function () {
    var socket = null;

    const onOpen = (ws, store, action) => evt => {
        //Send a handshake, or authenticate with remote end

        //Tell the store we're connected
        store.dispatch(websocketActions.connected(action));
    }

    const onClose = (ws, store) => evt => {
        //Tell the store we've disconnected
        store.dispatch(websocketActions.disconnected());
    }

    const onMessage = (ws, store) => evt => {
        //Parse the JSON message received on the websocket
        var msg = JSON.parse(evt.data);
        store.dispatch(websocketActions.messageReceived(msg));
    }

    return store => next => action => {
        switch (action.type) {

            //The user wants us to connect
            case websocketConstants.WEB_SOCKET_CONNECT:
                //Start a new connection to the server
                if (socket != null) {
                    socket.close();
                }
                //Send an action that shows a "connecting..." status for now
                store.dispatch(websocketActions.connecting(action.payload));

                //Attempt to connect (we could send a 'failed' action on error)
                //             let serverURL = 'ws://' + action.payload.url + ':' + action.payload.port + '/' + action.payload.serviceName;
                let serverURL = 'ws://' + action.payload.url + ':8089/' + action.payload.serviceName;
                console.log(serverURL);
                socket = new WebSocket(serverURL);
                socket.onmessage = onMessage(socket, store);
                socket.onclose = onClose(socket, store);
                socket.onopen = onOpen(socket, store, action.payload);

                break;

            //The user wants us to disconnect
            case websocketConstants.WEB_SOCKET_DISCONNECT:
                if (socket != null) {
                    socket.close();
                }
                socket = null;

                //Set our state to disconnected
            //    store.dispatch(websocketActions.disconnected());
                break;

            //Send the 'SEND_MESSAGE' action down the websocket to the server
            case websocketConstants.WEB_SOCKET_SEND_MESSAGE:
                socket.send(JSON.stringify(action.payload));
                break;

            //This action is irrelevant to us, pass it on to the next middleware
            default:
                return next(action);
        }
    }

})();

export default websocketMiddleware