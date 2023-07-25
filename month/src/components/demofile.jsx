import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function DemoUpload() {
  const [image, setImage] = useState({ preview: "", data: "" });

  const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Upload photo</Form.Label>
                <Form.Control type="file" name="file" required onChange={handleFile} />
              </Form.Group>
              <Form.Group>
                <Button variant="primary">Submit</Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            {image.preview && <img src={image.preview} style={{ width: '250px', height: '250px' }}  alt="hello" />}
          </Col>
        </Row>
      </Container>
    </>
  );
}
