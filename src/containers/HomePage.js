import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles';
import { translate } from 'react-i18next';

import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import { appActions } from '../actions';
import { deselectBlocks } from '../actions';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Editor from './Editor';

const drawerWidth = 360;

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: 'calc(100vh - 48px)',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },

    flex: {
        flex: 1,
        fontSize: '16px'
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        borderRight: '1px solid ' + theme.palette.primary.light
    },
    drawerPaperClose: {
        width: 0, //0 if you do not want to show icon
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerPaperCloseWithIcon: {
        width: 60, //if you want to show icon
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    icon: {
        fill: theme.status.danger
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 0,
        height: 'calc(100vh - 96px)'
    },
});

class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { loggedIn, token, authenticatedUser, server } = this.props;
        if (!loggedIn) this.props.history.push('/login');

        if (authenticatedUser === null) {
            this.props.dispatch(appActions.getAllData(server, token));
        }
    }

    deselectBlocks(){
        this.props.dispatch(deselectBlocks());
    }

    render() {
        const { classes, theme, t, loggedIn, sliderMenuStatus } = this.props;
        if (!loggedIn) return null;

        return (
            <div style={{ width: '100vw', height: '100vh' }}>
                <Header onClick={this.handleHeaderClick} />

                <div className={classes.root} style={{ width: '100vw', height: 'calc(100vh - 96px)' }}>
                    <Editor />
                </div>

                <Footer />

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, token } = state.authentication;
    const { sliderMenuStatus } = state;
    return {
        loggedIn,
        token,
        company: state.company,
        server: state.server,
        authenticatedUser: state.authenticatedUser,
        sliderMenuStatus,
    };
}

export default translate('translations')(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(HomePage))));
