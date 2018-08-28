import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import IconButton from 'material-ui/IconButton';
//import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
//import FormatColorFillIcon from 'material-ui-icons/FormatColorFill';
//import PalettIcon from 'material-ui-icons/Palette';

import ReactCountryFlag from 'react-country-flag';

import { languageConstants } from '../constants';
import { languageActions } from '../actions/language.actions';
import { translate } from 'react-i18next'

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
    icon: {
        //       paddingRight: '10px' 
    },
    text: {
        //  paddingLeft: '0px'
    },
});

class LanguageButton extends React.Component {

    state = {
        auth: true,
        anchorEl: null
    };

    constructor(props) {
        super(props);

        this.setLanguage = this.setLanguage.bind(this);
    }

    setLanguage(language) {
        const { i18n } = this.props;
        this.setState({ anchorEl: null });
        this.props.dispatch(languageActions.setLanguage(language));
        i18n.changeLanguage(language);
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
/*
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}

*/
    render() {

        const { classes, language } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const icon = language.substr(3);
        //   style={{ top: calc(100vh - 64px) }}
        return (
            <div>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit">
                    <ReactCountryFlag code={icon} />
                </IconButton>
                <Menu className={classes.menu}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}>
                    <MenuItem onClick={() => this.setLanguage(languageConstants.EN)}>
                        <ListItemIcon className={classes.icon}>
                            <ReactCountryFlag code={'US'} />
                        </ListItemIcon>
                        <ListItemText className={classes.text} classes={{ primary: classes.primary }} inset primary="English" />
                    </MenuItem>
                    <MenuItem onClick={() => this.setLanguage(languageConstants.RU)}>
                        <ListItemIcon className={classes.icon}>
                            <ReactCountryFlag code={'RU'} />
                        </ListItemIcon>
                        <ListItemText className={classes.text} classes={{ primary: classes.primary }} inset primary="Russian" />
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { language: state.language };
}

export default translate('translations')(withStyles(styles)(connect(mapStateToProps)(LanguageButton)));
