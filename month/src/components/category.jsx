import { Container, Form, Row, Col, Button,Toast } from 'react-bootstrap';
import { useState } from 'react';
import AXIOS from 'axios';

export default function CategoryForm() {
  const [catg, setCatg] = useState("");
  const [show, setShow] = useState(false);
  const handleData = (event) => {
    event.preventDefault();
    AXIOS.post('http://localhost:9000/category', { category: catg })
      .then((res) => {
        //alert(res.data.msg);
        setShow(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    <Toast show={show} onClose={() => setShow(false)} delay={3000} autohide bg="success" position="top-center">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">SUCCESS</strong>
          
        </Toast.Header>
        <Toast.Body>New category added</Toast.Body>
      </Toast>
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
