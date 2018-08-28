import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import FullscreenIcon from 'material-ui-icons/Fullscreen';
import FullscreenExitIcon from 'material-ui-icons/FullscreenExit';

import { fullScreenActions } from '../actions';

class FullScreenButton extends React.Component {

    handleClick() {
        const { dispatch, fullScreen } = this.props;
        dispatch(fullScreenActions.setFullScreen(!fullScreen));
    }

    makeFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }

    cancelFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }

    render() {
        const { fullScreen } = this.props;

        if (fullScreen) {
            this.makeFullscreen(document.body);
        } else {
            this.cancelFullscreen();
        }

        return (
            <IconButton color="inherit" onClick={() => this.handleClick()}>
                {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
        );
    }
}

function mapStateToProps(state) {
    return { fullScreen: state.fullScreen };
}

export default connect(mapStateToProps)(FullScreenButton);
