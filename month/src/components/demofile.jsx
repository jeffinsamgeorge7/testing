import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import AXIOS from 'axios';

export default function DemoUpload() {
  const [image, setImage] = useState({ preview: "", data: "" });

  const handleFile = (e) => {
    
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append('file', image.data);
    AXIOS.post('http://localhost:9000/uploadimg', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => {
      alert(res.data.msg);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form >
              <Form.Group>
                <Form.Label>Upload photo</Form.Label>
                <Form.Control type="file" name="file" required onChange={handleFile} />
              </Form.Group>
              <Form.Group>
                <Button required onClick={handleSubmit}variant="primary" >Submit</Button>
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
