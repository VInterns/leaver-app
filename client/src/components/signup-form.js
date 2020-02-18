import React, { Component } from "react";

import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Loader,
    Dimmer
} from 'semantic-ui-react';

import vodafoneLogo from "../assets/images/logo.svg";

export class SignupForm extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            code: "",
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.isRegistered) {
            nextProps.history.push('/');
        }
        return null;
    }


    props: {
        logo: string,
        signupWelcomeImg: string,
        headerText: string,
        subheaderText: string,
        createPasswordHeader: string,
        createPasswordText: string,
        verifyButtonText: string,
        usernamePlaceholder: string,
        userCodePlaceholder: string,
        passwordPlaceholder: string,
        loginText: string,
        signupText: string,
        signupHeader: string,
        signupSubheader: string,
        loginHref: string,
        getCodeText: string,
        verifyHeader: string,
        sendCode: () => {},
        trySignup: () => {},
        verifyCode: () => {},
        loading: boolean,
        codeRequested: boolean,
        codeVerified: boolean,
        isRegistered: boolean,
        error: string,
        history: Object
    }

    updateFields = (value, key) => {
        this.setState({
            [key]: value
        });
    }

    renderCodeSentView = () => {
        return (
            <div>
                <Grid
                    style={{ height: "100vh" }}
                    textAlign="center"
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form size="large">
                            {(this.props.codeVerified === true) ? (
                                <div>
                                    <Header as="h2" color="black" textAlign="center">
                                        {this.props.createPasswordHeader}
                                    </Header>
                                    <Header as="h4" color="black" textAlign="center">
                                        {this.props.createPasswordText}
                                    </Header>
                                    <Form.Input
                                        fluid
                                        type="password"
                                        icon="key"
                                        iconPosition="left"
                                        onChange={event => {
                                            this.updateFields(event.target.value, 'password')
                                        }}
                                        placeholder={this.props.passwordPlaceholder}
                                    />
                                    <Button
                                        fluid
                                        size="large"
                                        color="red"
                                        onClick={() => {
                                            this.props.trySignup(this.state);
                                        }}
                                    >
                                        {this.props.signupText}
                                    </Button>
                                </div>
                            ) : (
                                    <div>
                                        <Header as="h2" color="black" textAlign="center">
                                            {this.props.verifyHeader}
                                        </Header>
                                        <Header as="h4" color="black" textAlign="center">
                                            {this.props.verifyText}
                                        </Header>
                                        <Form.Input
                                            fluid
                                            type="number"
                                            icon="user secret"
                                            iconPosition="left"
                                            onChange={event => {
                                                this.updateFields(event.target.value, 'code')
                                            }}
                                            placeholder={this.props.userCodePlaceholder}
                                        />
                                        <Button
                                            fluid
                                            size="large"
                                            color="red"
                                            onClick={() => {
                                                this.props.verifyCode(this.state);
                                            }}
                                        >
                                            {this.props.verifyButtonText}
                                        </Button>
                                    </div>
                                )}
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    renderGetCode = () => {

        return (
            <div>
                <Grid
                    style={{ height: "100vh" }}
                    textAlign="center"
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="black" textAlign="center">
                            {this.props.headerText}
                        </Header>
                        <Header as="h4" color="black" textAlign="center">
                            {this.props.subheaderText}
                        </Header>
                        <Form size="large">
                            <Form.Input
                                fluid
                                type="email"
                                icon="mail"
                                iconPosition="left"
                                onChange={event => {
                                    this.updateFields(event.target.value, 'username')
                                }}
                                placeholder={this.props.usernamePlaceholder}
                            />
                            <Button
                                fluid
                                color="red"
                                onClick={() => {
                                    this.props.sendCode(this.state.username);
                                }}>
                                {this.props.getCodeText}
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    render() {
        console.log(this.state);
        const value = (
            <div>
                <Dimmer active>
                    <Loader size="large" indeterminate>
                        Loading.....
                    </Loader>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Dimmer>
            </div>
        );

        const loading = this.props.loading ? (value) : (
            <h1 style={{ color: 'red' }}>{this.props.error}</h1>
        );



        return (
            <Grid divided style={{ margin: 5, fontFamily: 'Poppins' }}>
                <Grid.Column width={7} only="large screen">
                    <Grid textAlign="center" verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column floated="left" width={5}>
                                <Image src={this.props.logo || vodafoneLogo} style={{ height: "35px", width: "35px" }} />
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    basic
                                    color="black"
                                    onClick={() => {
                                        this.props.history.push(this.props.loginHref);
                                    }}
                                >
                                    {this.props.loginText}
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as="h2" color="black" textAlign="center">
                                {this.props.signupHeader}
                            </Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as="h4" color="black" textAlign="center">
                                {this.props.signupSubheader}
                            </Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Image src={this.props.signupWelcomeImg} />
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column
                    largeScreen={9}
                    widescreen={9}
                    tablet={16}
                    style={{ backgroundColor: '#f4f4f4' }}
                >
                    {(this.props.codeRequested === true) ? (this.renderCodeSentView()) : (this.renderGetCode())}
                </Grid.Column>
                {loading}
            </Grid>
        )
    }
}

