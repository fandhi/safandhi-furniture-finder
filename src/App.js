import './App.css';

import axios from 'axios';
import React, { Component } from 'react';
import { Card, Col, Container, Dropdown, Row, Spinner, Form } from 'react-bootstrap';

const API = "http://www.mocky.io/v2/5c9105cb330000112b649af8"
const DEFAULT_QUERY = 'redux';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataFurniture: [],
      furnitureStyles: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios.get(API)
      // .then(function (response) {
      //   // handle success
      //   console.log(response);
      // })
      .then(result => this.setState({
        furnitureStyles: result.data.furniture_styles,
        isLoading: false,
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
    axios.get(API)
    .then(result => this.setState({
      dataFurniture: result.data.products,
      isLoading: false,
    }))
              .then(function (response) {
                // handle success
                console.log(response.data);
              })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
    // console.log(hits)
  }

  render() {
    const { dataFurniture, furnitureStyles, isLoading } = this.state;
    if (isLoading) {
      return <div className="align">
        <Spinner animation="border" variant="info" className="align-center" />
      </div>;
    }
    return (
      <div className="App">
        <Container className="content">
          <header className="bg-info p-3">
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Searh Furniture" />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="email" placeholder="name@example.com" />
                  </Form.Group>
                  {furnitureStyles.map((item, index) =>
                    <Form.Check inline label={item} type="checkbox" id={item} />
                  )}
                </Col>

                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select">
                      {dataFurniture.map((item, index) =>
                        <option>{item.delivery_time}</option>
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </header>
          <Row className="row p-2">
            {dataFurniture.map((item, index) =>
              <Col md={6} sm={6} className="mb-4" key={index}>
                <Card className="shadow-sm">
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
