import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles';
import { translate, Trans } from 'react-i18next';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import FullScreenButton from './FullScreenButton';
import SoundButton from './SoundButton';
import ThemeButton from './ThemeButton';
import LanguageButton from './LanguageButton';

const styles = {

    root: {
        width: '100%',

        //   top: 'calc(100vh - 128px)',
    },

    flex: {
        flex: 1,
        fontSize: '16px'
    },

    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreenEnabled: false,
        };

    }

    render() {
        const { classes, loggedIn, authenticatedUser } = this.props;
        const { t, i18n } = this.props;
        console.log("loggedIn", loggedIn);

        return (
            <AppBar position="static">
                <Toolbar style={{ minHeight: '48px' }}>
                    <Typography type="title" color="inherit" className={classes.flex}>

                    </Typography>

                    {loggedIn ? <LanguageButton /> : ""}
                    {loggedIn ? <ThemeButton /> : ""}
                    {loggedIn ? <SoundButton /> : ""}
                    {loggedIn ? <FullScreenButton /> : ""}

                    {!loggedIn ? <LanguageButton /> : ""}

                </Toolbar>
            </AppBar>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn, company: state.company, account: state.account };
}

export default translate('translations')(withStyles(styles)(withRouter(connect(mapStateToProps)(Footer))));
