import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import LoadingBar from 'react-redux-loading-bar'

//import logo from '../logo.svg';
import styles from '../styles/App.css';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import grey from 'material-ui/colors/grey';
import amber from 'material-ui/colors/amber';
import red from 'material-ui/colors/red';
import yellow from "material-ui/colors/yellow";
import blue from "material-ui/colors/blue";
import indigo from "material-ui/colors/indigo";
//import orange from "material-ui/colors/orange";

import { history } from '../helpers';
import { alertActions } from '../actions';
import { appThemeConstants } from '../constants';

import asyncComponent from '../components/AsyncComponent'
import { PrivateRoute } from '../components/PrivateRoute';
import LoginPage from './LoginPage';

const HomePage = asyncComponent(() =>
    import('./HomePage').then(module => module.default)
)

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    this.createBlackTheme = this.createBlackTheme.bind(this);
    this.createGreyTheme = this.createGreyTheme.bind(this);
    this.createPurpleTheme = this.createPurpleTheme.bind(this);
    this.createRedTheme = this.createRedTheme.bind(this);
    this.createGreenTheme = this.createGreenTheme.bind(this);
    this.createBlueTheme = this.createBlueTheme.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { i18n } = this.props;
    i18n.changeLanguage('en-US');
  }

  componentDidMount() {
  }

  handleClick() {
    const { sound } = this.props;
    if (sound) {
      let audio = new Audio();
      audio.src = "/assets/audio/Click1.mp3";
      audio.load();
      audio.play();
    }
  }

  createBlackTheme() {
    
    return createMuiTheme({
      palette: {
        primary: {
          light: grey[500],
          main: grey[900],
          dark: grey[900],
          //       contrastText: theme.palette.getContrastText(grey[500]),
        },
        secondary: {
          light: amber.A200,
          main: amber.A700,
          dark: amber.A700,
          //        contrastText: getContrastText(amber.A400),
        },
        error: {
          main: red[500],
        },
      },
      status: {
        danger: 'orange',
      },
    });
  }

  createGreyTheme() {
    return createMuiTheme({
      palette: {
        primary: {
          light: grey[500],
          main: grey[700],
          dark: grey[900],
          //       contrastText: theme.palette.getContrastText(grey[500]),
        },
        secondary: {
          light: amber.A200,
          main: amber.A400,
          dark: amber.A700,
          //        contrastText: getContrastText(amber.A400),
        },
        error: {
          main: red[500],
        },
      },
      status: {
        danger: 'orange',
      },
    });
  }

  createPurpleTheme() {
    return createMuiTheme({
      palette: {
        primary: {
          light: purple[500],
          main: purple[900],
          dark: purple[900],
          //       contrastText: theme.palette.getContrastText(grey[500]),
        },
        secondary: green,
      },
      status: {
        danger: 'orange',
      },
    });
  }

  createRedTheme() {
    return createMuiTheme({
      palette: {
        primary: {
          light: red[200],
          main: red[900],
          dark: red[900],
          //       contrastText: theme.palette.getContrastText(grey[500]),
        },
        secondary: yellow,
      },
      status: {
        danger: 'white',
      },
    });
  }

  createGreenTheme() {
    return createMuiTheme({
      palette: {
        primary: {
          light: green[500],
          main: green[900],
          dark: green[900],
          //       contrastText: theme.palette.getContrastText(grey[500]),
        },
        secondary: yellow,
      },
      status: {
        danger: 'white',
      },
    });
  }

  createBlueTheme = (theme) => {
    return createMuiTheme({
      palette: {
        primary: {
          light: indigo[300],
          main: blue[900],
          dark: blue[900],
          //       contrastText: theme.palette.getContrastText(grey[500]),
        },
        secondary: red,
      },
      status: {
        danger: 'white',
      },
    });
  }

  render() {
    const { appTheme, alert, company } = this.props;

    if (!company) {
      return (<h2> Loding </h2>)
    }

    window.addEventListener('click', this.handleClick, false);

    let theme;
    switch (appTheme) {
      case appThemeConstants.BLACK:
        theme = this.createBlackTheme();
        break;
      case appThemeConstants.GREY:
        theme = this.createGreyTheme();
        break;
      case appThemeConstants.PURPLE:
        theme = this.createPurpleTheme();
        break;
      case appThemeConstants.RED:
        theme = this.createRedTheme();
        break;
      case appThemeConstants.GREEN:
        theme = this.createGreenTheme();
        break;
      default:
        theme = this.createBlueTheme();
      //   theme = createMuiTheme();
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.mainscreen}>
        <LoadingBar />

          {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          }

          <Router history={history}>
            <div>
              <PrivateRoute exact path='/' component={HomePage} />
              <Route path="/login" component={LoginPage} />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    fullScreen: state.fullScreen,
    appTheme: state.appTheme,
    alert: state.alert,
    sound: state.sound,
    company: state.company
  };
}

export default translate('translations')(connect(mapStateToProps)(App));