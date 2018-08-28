import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { setVisible } from '../actions';
import { translate } from 'react-i18next';
const styles = theme => ({
    toolbar: {
        height: '48px',
        minHeight: '48px',
        backgroundColor: theme.palette.primary.light
    },

    flex: {
        flex: 1,
        fontSize: '16px',
        paddingLeft: 5
    },

    icon: {
        fill: theme.status.danger
    },
});
const mapStateToProps = (state) => {
    return {
        tabs: state.tabs,
        language: state.language
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setVisible: (tab) => {
            dispatch(setVisible(tab));
        }
    };
};

const Tabs = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ tabs, t, theme, setVisible }) => {
    const tabsStyle = {
        'display': 'flex',
        'color': '#FAFAFA',
        'fontWeight': 'bold',
        'justifyContent': 'center',
        'backgroundColor': 'darkcyan',
        'backgroundColor': theme.palette.primary.light,
        'height': '48px',
    };
    const tabStyle = {
        'width': '33.3%',
        'height': '48px',
        'display': 'flex',
        'cursor': 'pointer',
        'alignItems': 'center',
        'justifyContent': 'center',
    };
    const active = {
        'backgroundColor': '#3ACADA'
    };
    return (
        <div style={tabsStyle}>
            <span
                style={tabs.blocks ? Object.assign({}, tabStyle, active) : tabStyle}
                onClick={() => setVisible('blocks')}
            >{t("BLOCKS")}</span>
            <span
                style={tabs.common ? Object.assign({}, tabStyle, active) : tabStyle}
                onClick={() => setVisible('common')}
            >{t("COMMON")}</span>
            <span
                style={tabs.options ? Object.assign({}, tabStyle, active) : tabStyle}
                onClick={() => setVisible('options')}
            >{t("OPTIONS")}</span>
        </div>
    );
});

export default withStyles(styles, { withTheme: true })(translate('translations')(Tabs));