import React from 'react';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Menu, { MenuItem } from 'material-ui/Menu';

import { appActions } from '../actions';

class LogoutMenuItem extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCancel = () => {
    this.setState({ open: false });
    this.props.onClick();
  };

  handleOk = () => {
    this.setState({ open: false });
    const { dispatch } = this.props;
    dispatch(appActions.logout());
    this.props.onClick();
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <MenuItem onClick={() => this.handleClickOpen()}>{t('user_button.logout')}</MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            To subscribe to this website, please enter your email address here. We will send
              updates occationally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { authenticatedUser } = state;
  return { loggingIn, company: state.company, authenticatedUser };
}

//export default LogoutMenuItem;
//export default connect(mapStateToProps)(LogoutMenuItem);
export default translate('translations')(connect(mapStateToProps)(LogoutMenuItem));
