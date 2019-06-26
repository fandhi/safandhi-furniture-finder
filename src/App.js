import './App.css';

import axios from 'axios';
import React, { Component } from 'react';
import { Card, Col, Container, Dropdown, Row, Spinner, Form } from 'react-bootstrap';

// const API = "https://hn.algolia.com/api/v1/search?query="
const API = "http://www.mocky.io/v2/5c9105cb330000112b649af8"
const DEFAULT_QUERY = 'redux';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataFurniture: [],
      hits: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(API)
      .then(result => this.setState({
        hits: result.data.products,
        isLoading: false,
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    const { hits, isLoading } = this.state;
    if (isLoading) {
      return <div className="align">
        <Spinner animation="border" variant="info" className="align-center" />
      </div>;
    }
    return (
      <div className="App">
        <Container className="content">
          <header className="bg-info p-3">

            <Row>
              <Col><h3 className="text-light">Searh Furniture</h3></Col>
            </Row>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="email" placeholder="name@example.com" />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </header>
          <Row className="row p-2">
            {hits.map((item, index) =>
              <Col md={6} sm={6} className="mb-4">
                <Card key={index} className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="card-price text-warning position-absolute ">Rp {item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Card.Text>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text className="text-primary">{(item.index ? ' , ' : '') + item.furniture_style}</Card.Text>
                    <Card.Link href="#" className="card-delivery">{item.delivery_time} Days</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>

      </div>
    )
  }
}

export default App;
