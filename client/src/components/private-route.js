import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    };
};

export class PrivateRoute extends React.Component {

    Props: {
        path: string,
        isAuthenticated?: boolean,
        account?: Account,
        component: any,
        allowed: []
    };

    render() {
        const {
            path,
            isAuthenticated,
            account,
            component: Component,
            allowed
        } = this.props;
        return (
            <Route
                path={path}
                render={props => {
                    if (!isAuthenticated) {
                        return <Redirect to="/" />;
                    }
                    if (account && !allowed.some(r => account.roles.indexOf(r))) {
                        return <Redirect to="/forbidden" />;
                    }
                    return <Component {...props} />;
                }}
            />
        );
    };

}


export const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute)