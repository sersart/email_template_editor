import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import IconButton from 'material-ui/IconButton';
//import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import FormatColorFillIcon from 'material-ui-icons/FormatColorFill';
import PalettIcon from 'material-ui-icons/Palette';

import { appThemeConstants } from '../constants';
import { appThemeActions } from '../actions/appTheme.actions';

const styles = theme => ({
 
  root: {
    width: '100%'
  },

  flex: {
    flex: 1
  },
  menu: {
  },
  primary: {
 //   color: theme.palette.primary.dark
  },
  icon: {},
  text: {
    paddingLeft: '0px'
  },
});

class ThemeButton extends React.Component {

  state = {
    auth: true,
    anchorEl: null
  };

  constructor(props) {
    super(props);

    this.setTheme = this.setTheme.bind(this);
  }

  setTheme(themeName) {
    console.log(themeName);
    this.setState({ anchorEl: null });
    const { dispatch } = this.props;
    dispatch(appThemeActions.setAppTheme(themeName));
  }

  // handleChange = (event, checked) => {
  //   this.setState({ auth: checked });
  // };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    //   style={{ top: calc(100vh - 64px) }}
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit">
          <FormatColorFillIcon />
        </IconButton>
        <Menu className={classes.menu}
          id="menu-appbar"
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
          <MenuItem onClick={() => this.setTheme(appThemeConstants.BLUE)}>
            <ListItemIcon className={classes.icon}>
              <PalettIcon style={{ fill: 'blue' }} />
            </ListItemIcon>
            <ListItemText className={classes.text} style={{color: 'blue'}} classes={{ primary: classes.primary }} inset primary="Blue" />
          </MenuItem>
          <MenuItem onClick={() => this.setTheme(appThemeConstants.BLACK)}>
            <ListItemIcon className={classes.icon}>
              <PalettIcon style={{ fill: 'black' }} />
            </ListItemIcon>
            <ListItemText className={classes.text} style={{color: 'black'}} classes={{ primary: classes.primary }} inset primary="Black" />
          </MenuItem>
          <MenuItem onClick={() => this.setTheme(appThemeConstants.GREY)}>
            <ListItemIcon className={classes.icon}>
              <PalettIcon style={{ fill: 'grey' }} />
            </ListItemIcon>
            <ListItemText className={classes.text} style={{color: 'grey'}} classes={{ primary: classes.primary }} inset primary="Grey" />
          </MenuItem>
          <MenuItem onClick={() => this.setTheme(appThemeConstants.PURPLE)}>
            <ListItemIcon className={classes.icon}>
              <PalettIcon style={{ fill: 'purple' }} />
            </ListItemIcon>
            <ListItemText className={classes.text} style={{color: 'purple'}} classes={{ primary: classes.primary }} inset primary="Purple" />
          </MenuItem>
          <MenuItem onClick={() => this.setTheme(appThemeConstants.RED)}>
            <ListItemIcon className={classes.icon}>
              <PalettIcon style={{ fill: 'red' }} />
            </ListItemIcon>
            <ListItemText className={classes.text} style={{color: 'red'}} classes={{ primary: classes.primary }} inset primary="Red" />
          </MenuItem>
          <MenuItem onClick={() => this.setTheme(appThemeConstants.GREEN)}>
            <ListItemIcon className={classes.icon}>
              <PalettIcon style={{ fill: 'green' }} />
            </ListItemIcon>
            <ListItemText className={classes.text} style={{color: 'green'}} classes={{ primary: classes.primary }} inset primary="Green" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { authenticatedUser } = state;
  return { loggingIn, company: state.company, authenticatedUser, appTheme: state.appTheme };
}

export default withStyles(styles)(connect(mapStateToProps)(ThemeButton));
