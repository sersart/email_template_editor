import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles';
import { translate, Trans } from 'react-i18next';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';
import Gravatar from 'react-gravatar';

import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';


import { appActions } from '../actions';

import LogoutMenuItem from './LogoutMenuItem';

import classNames from 'classnames';

const styles = theme => ({

  root: {
    transform: 'skew(-20deg)',
    border: '1px solid ' + theme.palette.primary.light,
    maxHeight: 46
  },

  flex: {
    flex: 1
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },

  gavatar_img: {
    borderRadius: '50%'
  },
  menu: {
  }

});

class UserButton extends React.Component {

  state = {
    auth: true,
    anchorEl: null,
    open: false
  };

  constructor(props) {
    super(props);
  }

  handleLogout() {
    console.log("logout")
    const { dispatch } = this.props;
    dispatch(appActions.logout());
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget, open: true });
  };

  handleClose = () => {
    // this.setState({ anchorEl: null });
    this.setState({ open: false });
  };

  render() {

    const { t, classes, authenticatedUser } = this.props;
    const { auth, anchorEl } = this.state;
    if(!authenticatedUser) return null;
    //  const open = Boolean(anchorEl);
    const open = this.state.open;

    return (
      <div className={classes.root}>
        <Manager>
          <Target>

            <Button color="inherit" onClick={this.handleMenu}>{authenticatedUser.first_name} {authenticatedUser.last_name}</Button>
            <IconButton style={{transform: 'skew(20deg)'}}
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit">

              <Gravatar 
                email={authenticatedUser.email}
                size={32}
                rating="pg"
                default="monsterid"
                className={classes.gavatar_img} />

            </IconButton>
          </Target>
          <Menu
            id="menu-appbar"
            style={{ top: 32 + 'px' }}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={this.handleClose}>
            <MenuItem onClick={this.handleClose}>{t('user_button.profile')}</MenuItem>
            <MenuItem onClick={this.handleClose}>{t('user_button.account')}</MenuItem>
            <LogoutMenuItem onClick={this.handleClose} />
          </Menu>
  

        </Manager>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { authenticatedUser } = state;
  return { loggingIn, company: state.company, authenticatedUser };
}

export default translate('translations')(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(UserButton))));
