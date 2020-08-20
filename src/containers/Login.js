import React from "react";
import { Row, Col, Container, Form, Button, Spinner } from "react-bootstrap";
import './styles/Login.css';
import { Auth } from 'aws-amplify';
import AppContext from "../libs/contextLib";
import { withRouter } from 'react-router-dom';
import { onError } from '../libs/errorLib';

class Login extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    };

    this.validateForm = this.validateForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  async onSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      console.log('User successfully signed in.');
      this.context.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      onError(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className='first text-center'>
            <h2>Sign In</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className='search-bar'
                  type="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })} />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className='search-bar'
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })} />
              </Form.Group>
              <Button className='submit-button' disabled={!this.validateForm()} variant="outline-light" type="submit">
                { this.state.isLoading ? <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> : 
                  <p className='login-text'>Login</p>
                }
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className='text-center create-account-link'>
            <h5><a href='/signup'>Create New Account</a></h5>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
