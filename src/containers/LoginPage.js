import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { withStyles } from 'material-ui/styles';
import { translate } from 'react-i18next';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import MenuItem from 'material-ui/Menu/MenuItem';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { appActions } from '../actions';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        width: '50%', margin: '0 auto'
    }),

    container: {
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },

    flex: {
        flex: 1,
    },

    formControl: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 165,
    },
    menu: {
        width: 165,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },

    bottom_bar: {
        position: 'absolute',
        top: 'calc(100vh - 64px)',
    }

});

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            server_id: 0,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });

        const { username, password, server_id } = this.state;
        const { dispatch, company } = this.props;
        let selectedServer = company.servers.find(item => item.id === server_id);

        if (username && password && selectedServer) {
            dispatch(appActions.login(username, password, selectedServer));
        }
    } 

    render() {
        const { classes, t, loggingIn, company, server } = this.props;
        if(!company) return null;
        return (
            <div>
                <Header />

                <div style={{ width: '100vw', height: 'calc(100vh - 96px)', position: 'relative' }}>

                    <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <h2>{t('login.title')}</h2>
                        <Divider />
                        <div className={classes.container}>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="user-name">{t('login.username')}</InputLabel>
                                <Input id="user-name" type="text" name="username" value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </FormControl>

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="password">{t('login.password')}</InputLabel>
                                <Input id="password" name="password" type="password" value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </FormControl>

                            <FormControl fullWidth={true} >
                                <InputLabel htmlFor="server">{t('login.server')}</InputLabel>
                                <Select name="server_id"
                                    value={this.state.server_id} style={{ textAlign: 'left' }}
                                    onChange={this.handleChange}
                                    input={<Input id="server_id" />}
                                >
                                    {company.servers.map(item => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <Divider />

                        <div style={{ margin: 10, textAlign: 'right' }}>
                            <div className="col-xs end-xs">
                                <Button variant="raised" color="primary" onClick={this.handleSubmit} >
                                    {t('login.login')}
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </div>


                <Footer />
            </div>
        );
    }

}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        company: state.company,
        server: state.server
    };
}

export default translate('translations')(withStyles(styles)(withRouter(connect(mapStateToProps)(LoginPage))));
