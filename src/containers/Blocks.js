import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { selectComponent } from '../actions';

const mapStateToProps = (state) => {
    return {
        tabs: state.tabs,
        components: state.components
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectComponent: (index) => {
            dispatch(selectComponent(index));
        }
    };
};

const Blocks = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ tabs, components, selectComponent }) => {
    if (tabs && tabs.blocks) {
        const imgLocation = '/';
        return (
            <div
                style={{
                    'height': 'calc(100vh - 144px)',
                    'overflowY': 'auto'
                }}
            >
                {components.map((el, index) =>
                    <div
                        key={index}
                        style={{
                            'width': '340px',
                            'height': '140px',
                            'margin': '1% auto',
                            'backgroundSize': 'cover',
                            'border': '1px solid #DDDDDD',
                            'backgroundImage': `url('${imgLocation}${el.preview}')`
                        }}
                        draggable="true"
                        onClick={() => selectComponent(index)}
                        onDragStart={() => selectComponent(index)}
                    >
                    </div>
                )}
            </div>
        );
    }
    return null;
});

export default translate('translations')(Blocks);