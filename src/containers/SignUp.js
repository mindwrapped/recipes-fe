import React from 'react';
import { Row, Col, Container, Form, Button, Spinner } from 'react-bootstrap';
import './styles/SignUp.css';
import { onError } from '../libs/errorLib';
import { Auth } from 'aws-amplify';
import AppContext from '../libs/contextLib';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayName: '',
      password: '',
      confirmedPassword: '',
      bio: '',
      confirmationCode: '',
      newUser: null
    };

    this.validateForm = this.validateForm.bind(this);
    this.validateConfirmationCode = this.validateConfirmationCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmationSubmit = this.handleConfirmationSubmit.bind(this);
    this.renderSignUpForm = this.renderSignUpForm.bind(this);
    this.renderConfirmationForm = this.renderConfirmationForm.bind(this);
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmedPassword
    );
  }

  validateConfirmationCode() {
    return this.state.confirmationCode.length > 6;
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });

      this.setState({
        isLoading: false,
        newUser: newUser
      });
      
    } catch (e) {
      onError(e);
      this.setState({isLoading: false});
    }
  }

  async handleConfirmationSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.context.userHasAuthenticated(true);
      this.props.history.push('/');
    } catch (e) {
      onError(e);
      this.setState({isLoading: false});
    }
  }

  renderSignUpForm() {
    return (
      <Container>
        <Row>
          <Col className='first text-center'>
            <h2>Create Account</h2>
          </Col>
        </Row>
        <Row className='create-form'>
          <Col>
            <Form noValidate onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    className='text-entries'
                    type="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group as={Col} md controlId="formGridDisplayName">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    required
                    className='text-entries'
                    placeholder="Robot3922"
                    value={this.state.displayName}
                    onChange={e => this.setState({ displayName: e.target.value })}
                  />
                </Form.Group>

              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    className='text-entries'
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </Form.Group>
                <Form.Group as={Col} md controlId="formGridConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    className='text-entries'
                    type="password"
                    placeholder="Password"
                    value={this.state.confirmedPassword}
                    onChange={e => this.setState({ confirmedPassword: e.target.value })}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control className='text-entries' placeholder="..." value={this.state.bio} onChange={e => this.setState({ bio: e.target.value })} />
              </Form.Group>

              <Button className='submit-button' variant="outline-light" type="submit">
                {this.state.isLoading ? <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> :
                  <p className='login-text'>Create Account</p>
                }

              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  renderConfirmationForm() {
    return (
      <Container>
        <Row>
          <Col className='first text-center'>
            <h2>Confirmation Code</h2>
          </Col>
        </Row>
        <Row>
          <Col className='text-center center'>
            <Form onSubmit={this.handleConfirmationSubmit}>
              <Form.Group as={Col} controlId="formConfirmationCode" class=''>
                <Form.Control className='text-entries confirmation-entry' type='tel' placeholder="..." value={this.state.confirmationCode} onChange={e => this.setState({ confirmationCode: e.target.value })} />
              </Form.Group>
              <Button className='submit-button' variant="outline-light" type="submit">
                {this.state.isLoading ? <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> :
                  <p className='login-text'>Confirm Code</p>
                }
              </Button>
            </Form>

          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <>
        {this.state.newUser === null ? this.renderSignUpForm() : this.renderConfirmationForm()}
      </>
    );
  }
}

export default withRouter(SignUp);