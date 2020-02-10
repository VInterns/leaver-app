import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import { SignupForm } from "../components/signup-form";
import { signup, sendCode } from "../state";

class registrationContainer extends Component {
    static mapStateToProps(state){
        return {
            signupError: state.errorMessage,
            loading: state.loading,
            isRegistered: state.isRegistered,
            codeRequested: state.codeRequested
        }
    }

    static mapDispatchToProps(dispatch){
        return bindActionCreators({signup, sendCode}, dispatch);
    }


    props: {
        signupError: string,
        loading: boolean,
        isRegistered: boolean,
        sendCode: () => void;
        signup: () => void;
        logo: string,
        signupWelcomeImg: string,
        getCodeText: string,
        headerText: string,
        subheaderText: string,
        usernamePlaceholder: string,
        userCodePlaceholder: string,
        passwordPlaceholder: string,
        loginText: string,
        verifyText: string,
        signupText: string,
        verifyHeader: string,
        signupHeader: string,
        signupSubheader: string,
        verifyButtonText: string,
        loginHref: string,
        codeRequested: boolean,
        codeVerified: boolean
    }

    render(){
        return(
            <div>
                <SignupForm
                    history = {this.props.history}
                    sendCode = {this.props.sendCode}
                    trySignup = {this.props.signup}
                    error = {this.props.signupError}
                    loading = {this.props.loading}
                    isRegistered = {this.props.isRegistered}
                    headerText = {this.props.headerText}
                    subheaderText = {this.props.subheaderText}
                    signupText = {this.props.signupText}
                    loginText = {this.props.loginText}
                    usernamePlaceholder = {this.props.usernamePlaceholder}
                    userCodePlaceholder = {this.props.userCodePlaceholder}
                    passwordPlaceholder = {this.props.passwordPlaceholder}
                    loginHref = {this.props.loginHref}
                    signupHeader = {this.props.signupHeader}
                    signupSubheader = {this.props.signupSubheader}
                    getCodeText = {this.props.getCodeText}
                    verifyText = {this.props.verifyText}
                    verifyHeader = {this.props.verifyHeader}
                    verifyButtonText = {this.props.verifyButtonText}
                    codeRequested = {this.props.codeRequested}
                    codeVerified = {this.props.codeVerified}
                    logo = {this.props.logo}
                    signupWelcomeImg = {this.props.signupWelcomeImg}/>
                    
            </div>
        )
    }
}

export const RegistrationScreen = connect (
    registrationContainer.mapStateToProps,
    registrationContainer.mapDispatchToProps,
)(registrationContainer);