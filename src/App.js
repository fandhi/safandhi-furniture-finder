import './App.css';

import axios from 'axios';
import React, { Component } from 'react';
import { Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

const API = "http://www.mocky.io/v2/5c9105cb330000112b649af8"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataFurniture: [],
      furnitureStyles: [],
      isLoading: false,
      filter: "",
      fltr: "",
      search: ""
    }
  }

  componentDidMount() {
    this.sdfsdf();
  };

  sdfsdf() {
    this.setState({ isLoading: true });

    axios.get(API)
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
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  handleChange = event => {
    this.setState({ search: event.target.value })
  }

  renderFurniture = furniture => {
    const { search } = this.state;

    return (
      <Col md={6} sm={6} className="mb-4" key={furniture.name}>
        <Card>
          <Card.Body>
            <Card.Title title={furniture.name}>
              {furniture.name.substring(0, 15)}
              {furniture.name.length > 15 && "..."}
            </Card.Title>
            <Card.Text className="card-price text-warning position-absolute ">Rp {furniture.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Card.Text>
            <Card.Text>{furniture.description}</Card.Text>
            <Card.Text>{furniture.furniture_style ? "Classic" : "true"}</Card.Text>
            <Card.Text className="text-primary">{(furniture.index ? ' , ' : '') + furniture.furniture_style}</Card.Text>
            <Card.Link href="#" className="card-delivery">{furniture.delivery_time} Days</Card.Link>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  render() {
    const { dataFurniture, furnitureStyles, fltr, search, isLoading } = this.state;
    const fltrData = dataFurniture.filter(item => {
      return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
    // console.log('dataFurniture ', dataFurniture)
    // console.log('fltrData ', fltrData)

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
                <Form.Control type="text" onChange={this.handleChange} placeholder="Search Furniture" />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="email" placeholder="..." />
                  </Form.Group>
                  {/* {furnitureStyles.map((styles, index) =>
                    <Form.Check inline label={styles} type="checkbox" id={styles} />
                  )} */}
                  {/* <Form.Check inline label="Classic" type="checkbox" id="Classic" onClick={(() => dddd("Classic"))} /> */}
                </Col>

                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select">
                      {dataFurniture.map((item, index) =>
                        <option key={index}>{item.delivery_time}</option>
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </header>
          <Row className="row p-2">
            {/* {fltrData.map((item, index) =>
              <Col md={6} sm={6} className="mb-4" key={item.name}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="card-price text-warning position-absolute ">Rp {item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Card.Text>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>{item.furniture_style ? "Classic" : "true"}</Card.Text>
                    <Card.Text className="text-primary">{(item.index ? ' , ' : '') + item.furniture_style}</Card.Text>
                    <Card.Link href="#" className="card-delivery">{item.delivery_time} Days</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            )} */}

            {fltrData.map(furniture => {
              return this.renderFurniture(furniture);
            })}
          </Row>
        </Container>

      </div>
    )
  }
}

export default App;
