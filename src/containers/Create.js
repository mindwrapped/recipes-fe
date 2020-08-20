import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import './styles/Create.css';
import AutoResponsive from 'autoresponsive-react';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      ingredient: ''
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }


  handleIngredientSubmit(e) {
    e.preventDefault();
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.setState({ ingredients: this.state.ingredients.concat([this.state.ingredient]) });
      console.log(this.state.ingredients);
      this.setState({ ingredient: '' });
    }
  }

  render() {
    return (
      <Container className='first'>
        <Row>
          <Col>
            <h2 className='text-center'>Create</h2>
            <Form onSubmit={this.handleIngredientSubmit}>
              <Form.Group controlId='formCreateIngredients'>
                <Form.Label>Add Ingredients</Form.Label>
                <Form.Control
                  className='search-bar'
                  type='text'
                  placeholder='Enter your ingredients here...'
                  value={this.state.ingredient}
                  onChange={e => this.setState({ ingredient: e.target.value })}
                  onKeyDown={this.handleKeyDown}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Create;