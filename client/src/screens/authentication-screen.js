import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LoginForm } from '../components/login-form';
import { login, logout , initializeApp} from '../state';

class authenticationContainer extends Component {
  static mapStateToProps(state) {
    return {
      loginError: state.auth.errorMessage,
      loading: state.auth.loading,
      isAuthenticated: state.auth.isAuthenticated,
    };
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({ login, logout ,initializeApp}, dispatch);
  }


  props: {
    loginError: string,
    loading: boolean,
    isAuthenticated: boolean,
    login: (userModel: UserLoginModel) => void,
    headerText: string,
    subheaderText: string,
    loginText: string,
    logo: string,
    loginWelcomeImg: string,
    passwordPlaceholder: string,
    signupHref: string,
    signupText: string,
    signupHeader: string,
    signupSubheader: string,
    usernamePlaceholder: string,
    initializeApp:()=>void,
  };

/// IF You want to reset the State Please un-comment this function
componentDidMount(){
  this.props.initializeApp();
}
  render() {

    return (
      <div>
        <LoginForm
          history={this.props.history}
          tryLogin={this.props.login}
          error={this.props.loginError}
          loading={this.props.loading}
          isAuthenticated={this.props.isAuthenticated}
          headerText={this.props.headerText}
          subheaderText={this.props.subheaderText}
          loginText={this.props.loginText}
          logo={this.props.logo}
          passwordPlaceholder={this.props.passwordPlaceholder}
          signupHref={this.props.signupHref}
          signupText={this.props.signupText}
          signupHeader={this.props.signupHeader}
          signupSubheader={this.props.signupSubheader}
          usernamePlaceholder={this.props.usernamePlaceholder}
          loginWelcomeImg={this.props.loginWelcomeImg}
        />
      </div>
    );
  }
}

export const AuthenticationScreen = connect(
  authenticationContainer.mapStateToProps,
  authenticationContainer.mapDispatchToProps,
)(authenticationContainer);
