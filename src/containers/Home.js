import React from "react";
import { Jumbotron, Container, Row, Col, Button, Card, Form, FormControl } from "react-bootstrap";
import "./styles/Home.css";
import AppContext from "../libs/contextLib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default class Home extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className='first text-center'>
            <h2>Build your recipes.</h2>
            <h5>Explore <a href='/explore/ingredients'>ingredients</a>, <a href='/explore/directions'>directions</a>, and <a href='/explore/recipes'>recipes</a> to jumpstart your own creations.</h5>
            <img
              src="/fruit-red.png"
              width="128"
              height="128"
              className="d-inline-block align-top home-image"
              alt="Recipes Builder logo"
            />
          </Col>
        </Row>
        {/* <Row className='second-row'>
          <Col sm className='first text-center col-card'>
            <h4>Build your recipes.</h4>
            <h6>Explore ingredients, directions, and prebuilt recipes to jumpstart your own creations.</h6>
          </Col>
          <Col sm className='first text-center col-card'>
            <h3>Build your recipes.</h3>
            <h6>Explore ingredients, directions, and prebuilt recipes to jumpstart your own creations.</h6>
          </Col>
          <Col sm className='first text-center col-card'>
            <h3>Build your recipes.</h3>
            <h6>Explore ingredients, directions, and prebuilt recipes to jumpstart your own creations.</h6>
          </Col>
        </Row> */}
        <Row className='second-row'>
          <Col>
            <Form inline className='justify-content-center'>
              <FormControl type="text" placeholder="Search for recipes" className="search-bar" />
              {/* <Button variant="outline-light">Search</Button> */}
            </Form>
          </Col>
        </Row>
        {this.context.state.isAuthenticated ?
          <Row className='third-row'>
            <Col>
              <h5>Or else start from <a href='/create'>scratch</a>.</h5>
            </Col>
          </Row> :
          <>
          </>
        }

      </Container>
    );
  }
}
