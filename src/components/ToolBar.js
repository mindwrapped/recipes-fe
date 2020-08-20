import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import './styles/ToolBar.css';
import AppContext, { AppConsumer } from "../libs/contextLib";
import { Auth } from 'aws-amplify';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class ToolBar extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout() {
    await Auth.signOut();

    this.context.userHasAuthenticated(false);
    this.props.history.push('/login');
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="md">
          <Navbar.Brand href='/' className='header'>
            <img
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top image"
              alt="Recipes Builder logo"
            />
            Recipes Builder
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <AppConsumer>
                {(props) => {
                  return props.state.isAuthenticated ?
                  <Nav.Link href="/create">Create</Nav.Link>
                   :
                  <>
                  </>
                }}
              </AppConsumer>
              
              <Nav.Link href="/explore">Explore</Nav.Link>
              <Nav.Link href="/faq">FAQ</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>

            <AppConsumer>
              {(props) => {
                return props.state.isAuthenticated ?
                  <>
                    {/* <Button className='create-button' variant="outline-success" onClick={this.handleLogout}><FontAwesomeIcon icon={faPlus} /></Button> */}
                    <Button variant="outline-light" onClick={this.handleLogout}>Logout</Button>
                  </>
                  : <Button href='/login' variant="outline-light">Sign In</Button>;
              }}
            </AppConsumer>

          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default withRouter(ToolBar);
