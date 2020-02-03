import React from "react";
import { Redirect, Route } from "react-router-dom";



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
                    if (account && allowed.indexOf(account.role) === -1) {
                        return <Redirect to="/forbidden" />;
                    }
                    return <Component {...props} />;
                }}
            />
        );
    };

}
