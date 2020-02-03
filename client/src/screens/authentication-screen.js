import React, { Component } from 'react';
import { Loader, Dimmer, Image } from 'semantic-ui-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LoginForm } from '../components/login-form';
import { login } from '../state/action-creators';

class authenticationContainer extends Component {
  static mapStateToProps(state) {
    return {
      loginError: state.errorMessage,
      loading: state.loading,
      isLoggedin: state.isLoggedIn,
    };
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
  }


  props: {
    loginError: string,
    loading: boolean,
    isLoggedin: boolean,
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
  };

  render() {
    const value = (
      <div>
        <Dimmer active>
          <Loader size="large" indeterminate>
            Loading.....
          </Loader>
        </Dimmer>

        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </div>
    );


    return (
      <div>
        <LoginForm
          history={this.props.history}
          tryLogin={this.props.login}
          error={this.props.loginError}
          loading={this.props.loading}
          isLoggedin={this.props.isLoggedin}
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
