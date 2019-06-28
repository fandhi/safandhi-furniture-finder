import './App.css';

import axios from 'axios';
import React, { Component } from 'react';
import { Card, Col, Container, DropdownButton, Form, Row, Spinner } from 'react-bootstrap';

const API = "http://www.mocky.io/v2/5c9105cb330000112b649af8"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataFurniture: [],
      furnitureStyles: [],
      deliveryTime: ["1 week", "2 week", "1 Month", "more"],
      isLoading: false,
      filter: "",
      search: ""
    }
  }

  componentDidMount() {
    this.fetchData();
  };

  fetchData() {
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
    return (
      <Col md={6} sm={6} className="mb-4" key={furniture.name}>
        <Card>
          <Card.Body>
            <Card.Title title={furniture.name}>{furniture.name}</Card.Title>
            <Card.Text className="card-price text-warning position-absolute ">Rp {furniture.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Card.Text>
            <Card.Text>{furniture.description}</Card.Text>
            <Card.Text className="text-primary">{(furniture.furniture_style.index ? ', ' : '') + furniture.furniture_style}</Card.Text>
            <Card.Link href="#" className="card-delivery">{furniture.delivery_time} Days</Card.Link>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  render() {
    const { dataFurniture, furnitureStyles, deliveryTime, search, isLoading } = this.state;
    const filterData = dataFurniture.filter(item => {
      return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
    // console.log('dataFurniture ', dataFurniture)
    // console.log('filterData ', filterData)

    if (isLoading) {
      return <div className="align">
        <Spinner animation="border" variant="info" className="align-center" />
      </div>;
    }
    return (
      <div className="App">
        <Container className="content">
          <header className="app-header p-3">
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      onChange={this.handleChange}
                      className="custom-input"
                      placeholder="Search Furniture" />
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <DropdownButton id="dropdown-basic-button1" title="Furniture Styles" role="menuitemcheckbox" block>
                      {furnitureStyles.map((styles, index) =>
                        <Form.Check
                          key={index}
                          className="m-2 position-relative"
                          label={styles}
                          type="checkbox"
                          id={styles} />
                      )}
                    </DropdownButton>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <DropdownButton id="dropdown-basic-button2" title="Delivery Time" role="menuitemcheckbox" block>
                      {deliveryTime.map((item, index) =>
                        <Form.Check
                          className="m-2 position-relative"
                          key={index}
                          type="checkbox"
                          id={index}
                          label={item} />
                      )}
                    </DropdownButton>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </header>
          <Row className="pt-2">
            {filterData.map(furniture => {
              return this.renderFurniture(furniture);
            })}
          </Row>
        </Container>

      </div>
    )
  }
}

export default App;
