import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import AXIOS from 'axios';

export default function CategoryForm() {
  const [catg, setCatg] = useState("");

  const handleData = (event) => {
    event.preventDefault();
    AXIOS.post('http://localhost:9000/category', { category: catg })
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Container>
        <h1>Category Form</h1>
        <Row>
          <Col>
            <Form onSubmit={handleData}>
              <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  onChange={(e) => {
                    setCatg(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Button className="mt-3"type="submit" variant="primary">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
