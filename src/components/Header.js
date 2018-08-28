import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles';
import { translate, Trans } from 'react-i18next';
import { history } from '../helpers';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import UserButton from './UserButton';
import LanguageButton from './LanguageButton';

import { sliderMenuActions } from '../actions';

const styles = {

  root: {
    width: '100%'
  },

  flex: {
    flex: 1
  },
};

class Header extends React.Component {

  constructor(props) {
    super(props);

    history.listen((location, action) => {
      const { sliderMenuStatus } = this.props;

        this.props.dispatch(sliderMenuActions.setSliderMenuStatus(!sliderMenuStatus));
    })
  }

  handleDrawerOpen = () => {
    const { sliderMenuStatus } = this.props;
    this.props.dispatch(sliderMenuActions.setSliderMenuStatus(!sliderMenuStatus));
  };

  render() {

    const { classes, loggedIn, authenticatedUser, sliderMenuStatus } = this.props;
    const { t, i18n } = this.props;

    return (
      <AppBar position="static">
        <Toolbar style={{ minHeight: '48px', paddingLeft: 5, paddingRight: 16 }}>
{/*         <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, sliderMenuStatus && classes.hide)}
          >
            <MenuIcon />
    </IconButton> */}
          <Typography type="title" color="inherit" className={classes.flex}>
            Email Template Editor
          </Typography>

          {!loggedIn ? <LanguageButton /> : <UserButton />}

        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  const { authenticatedUser } = state;
  const { sliderMenuStatus } = state;
  return {
    loggedIn,
    company: state.company,
    authenticatedUser,
    sliderMenuStatus,
    drawerSettings: state.drawerSettings
  };
}

export default translate('translations')(withStyles(styles)(withRouter(connect(mapStateToProps)(Header))));