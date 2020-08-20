import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/NotFound.css";

export default function NotFound() {
  return (
    <Container className='not-found'>
      <Row>
        <Col className='text-center'>
          <h2>Page not found</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Uh oh, we can't seem to find the page you are looking for. Try going back to the previous page or using a different link.</h5>
        </Col>
      </Row>
    </Container>
  );
}