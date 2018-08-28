import React, { Component } from "react";
export default function asyncComponent(getComponent) {
    class AsyncComponent extends Component {
        state = { Component: null };

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(Component => {
                    this.setState({ Component })
                })
                .catch(err => {
                    console.log(err, this.props);
                   // onError(err, this.props)
                })
            }
        }
        render() {
            const { Component } = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
    return AsyncComponent;
}