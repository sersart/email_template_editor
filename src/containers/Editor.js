import React from 'react';
import Tabs from '../containers/Tabs';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { translate } from 'react-i18next';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PublicIcon from 'material-ui-icons/Public';
import DesktopIcon from 'material-ui-icons/DesktopMac';
import PhoneIcon from 'material-ui-icons/PhoneIphone';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Divider from 'material-ui/Divider';

import { saveTemplate, sendTestEmail, deselectBlocks, rmBlock, undoChanges, redoChanges } from '../actions';

import Blocks from '../containers/Blocks';
import Common from '../containers/Common';
import Options from '../containers/Options';
import BlockList from '../components/BlockList';
import StatePanel from '../containers/StatePanel';
import ActionsPanel from '../containers/ActionsPanel';

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
        id: state.templateId,
        template: state.template,
        templateName: state.common.templateName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deselectBlocks: () => {
            dispatch(deselectBlocks());
        },
        sendTestEmail: (email, html) => {
            deselectBlocks();
            dispatch(sendTestEmail(email, html));
        },
        saveTemplate: (id, html, name, template) => {
            deselectBlocks();
            dispatch(saveTemplate(id, html, name, template));
        },
		rmBlock: () => {
			dispatch(rmBlock());
		},undoChanges: () => {
			dispatch(undoChanges());
		},
		redoChanges: () => {
			dispatch(redoChanges());
		}
    };
};

const Editor = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ classes, t, theme, id, template, deselectBlocks, templateName, saveTemplate, sendTestEmail, rmBlock, undoChanges, redoChanges }) => {
    const selectedBlock = template.filter((el) => el.selected);

    return (
    <div
        style={{
            'height': 'calc(100vh - 96px)',
            'width': '100%',
            'display': 'flex',
            'flexDirection': 'row',
        }}
    >
        <div
            style={{
                'zIndex': 1,
                'width': '33%',
                'height': 'calc(100vh - 96px)',
                // 'position': 'fixed',
                'backgroundColor': '#FAFAFA',
                'fontFamily': "'Play', sans-serif",
                //     'boxShadow': 'rgb(102, 102, 102) 3px 3px 10px 1px'
                'borderRight': '1px solid ' + theme.palette.primary.dark

            }}
        >
            <Tabs />
            <Blocks />
            <Common />
            <Options />
        </div>
        <div
            style={{
                'width': '100%',
                'height': 'calc(100vh - 96px)',
                'overflowY': 'hidden',
                'backgroundColor': '#F0F0F0'
            }}
            onClick={() => deselectBlocks()}
        >


            <Toolbar className={classes.toolbar} >
                <IconButton color="inherit" onClick={() => this.handleClick()}>
                    <DesktopIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => this.handleClick()}>
                    <PhoneIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                </Typography>
                {selectedBlock.length? <Button variant="raised" color="primary" onClick={() => rmBlock()}  style={{ transform: 'skew(-20deg)', marginRight: 5 }}>
                    Delete
                </Button> : null}
                <Button variant="raised" color="primary" style={{ transform: 'skew(-20deg)', marginRight: 5 }}
                    onClick={() => {
                        let emailSource = document.querySelector('#rootTable').innerHTML;
                        let email = prompt(t("Enter email"));
                        emailSource = emailSource.replace(/&nbsp;/ig, " ").replace(/&quot;/ig, "\"").replace(/<table id="rootTemplate"/, '<table align="center" id="rootTemplate"');
                        sendTestEmail(email, emailSource);
                    }}
                >
                    Test
                </Button>
                <Button variant="raised" color="primary" style={{ transform: 'skew(-20deg)' }}
                    onClick={() => {
                        let emailSource = document.querySelector('#rootTable').innerHTML;
                        if (!templateName) {
                            return alert('Имя шаблона не задано! Перейдите на вкладку "Общие"');
                        }
                        emailSource = emailSource.replace(/&nbsp;/ig, " ").replace(/&quot;/ig, "\"").replace(/<table id="rootTemplate"/, '<table align="center" id="rootTemplate"');
                        template = JSON.parse(JSON.stringify(template).replace(/&nbsp;/ig, " ").replace(/&quot;/ig, "\""));
                        saveTemplate(id || 0, emailSource, templateName, template);
                    }}
                >
                    Save
                </Button>
            </Toolbar>


           {/*  <StatePanel /> */}
            <BlockList />
          {/* <ActionsPanel /> */}
        </div>
    </div>
)});

export default translate('translations')(withStyles(styles, { withTheme: true })(Editor));
