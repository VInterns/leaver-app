import React, { Component } from 'react';

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Loader,
  Dimmer
} from 'semantic-ui-react';

import vodafoneLogo from '../assets/images/logo.svg';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.isAuthenticated) {
      nextProps.history.push('/upload_employees');
    }
    return null;
  }

  props: {
    logo: string,
    loginWelcomeImg: string,
    headerText: string,
    subheaderText: string,
    usernamePlaceholder: string,
    passwordPlaceholder: string,
    loginText: string,
    signupText: string,
    signupHeader: string,
    signupSubheader: string,
    signupHref: string,
    tryLogin: () => {},
    loading: boolean,
    isAuthenticated: boolean,
    error: string,
    history: Object
  };

  updateFields = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const value = (
      <div>
        <Dimmer active>
          <Loader size='large' indeterminate>
            Loading.....
          </Loader>
        </Dimmer>
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      </div>
    );
    const loading = this.props.loading ? (
      value
    ) : (
      <h1 style={{ color: 'red' }}>{this.props.error}</h1>
    );

    return (
      <Grid divided style={{ margin: 5, fontFamily: 'Poppins' }}>
        <Grid.Column width={7} only='large screen'>
          <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column floated='left' width={5}>
                <Image
                  src={this.props.logo || vodafoneLogo}
                  style={{ height: '35px', width: '35px' }}
                />
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  basic
                  color='black'
                  onClick={() => {
                    this.props.history.push(this.props.signupHref);
                  }}
                >
                  {this.props.signupText}
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Header as='h2' color='black' textAlign='center'>
                {this.props.signupHeader}
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header as='h4' color='black' textAlign='center'>
                {this.props.signupSubheader}
              </Header>
            </Grid.Row>
            <Grid.Row verticalAlign='bottom'>
              <Image src={this.props.loginWelcomeImg} />
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column
          largeScreen={9}
          widescreen={9}
          tablet={16}
          style={{ backgroundColor: '#f4f4f4' }}
        >
          <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='black' textAlign='center'>
                {this.props.headerText}
              </Header>
              <Header as='h4' color='black' textAlign='center'>
                {this.props.subheaderText}
              </Header>
              <Form size='large'>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  onChange={event => {
                    this.updateFields(event.target.value, 'username');
                  }}
                  placeholder={this.props.usernamePlaceholder}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  onChange={event => {
                    this.updateFields(event.target.value, 'password');
                  }}
                  placeholder={this.props.passwordPlaceholder}
                  type='password'
                />

                <Button
                  color='red'
                  fluid
                  size='large'
                  onClick={() => {
                    this.props.tryLogin(this.state);
                  }}
                >
                  {this.props.loginText}
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        {loading}
      </Grid>
    );
  }
}
