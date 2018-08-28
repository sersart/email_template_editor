import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import VolumeUpIcon from 'material-ui-icons/VolumeUp';
import VolumeOffIcon from 'material-ui-icons/VolumeOff';

import {soundActions} from '../actions';

class SoundButton extends React.Component {

    handleClick() {
       const { dispatch, sound } = this.props;
        dispatch(soundActions.setSound(!sound));
    }

    render() {
         const { sound } = this.props;
 
        return (
            <IconButton color="inherit" onClick={()=>this.handleClick()}>
               {sound ? <VolumeUpIcon/> : <VolumeOffIcon />}
            </IconButton>
        );
    }
}

function mapStateToProps(state) {
    return { sound : state.sound};
}

export default connect(mapStateToProps)(SoundButton);
