import { useEffect, useState } from 'react';
import AXIOS from 'axios';
import { Container,Form,Button,Row,Col} from 'react-bootstrap';
import Navbr from './navbr';
import { useParams } from 'react-router-dom';

export default function EditProduct(props) {
  const { id } = useParams();
  
  const [productName, setProductName] = useState('');
  
  
 
  useEffect(() => {
    // Define the fetchProduct function inside the useEffect callback
    const fetchProduct = () => {
      AXIOS.get(`http://localhost:9000/getproduct${id}`)
        .then((response) => {
          const { pname } = response.data;
          setProductName(pname);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    // Fetch product from the backend when the component mounts
    fetchProduct();
  }, [id]);
  
  
  const onChangeProductName = e => {
    setProductName(e.target.value);
  };


  const onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pname', productName);
    AXIOS
      .put('http://localhost:9000/updateproduct/' + id, formData) // Corrected the URL
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    //props.history.push('/index');
  };



  return (
    <>
    <Navbr/>
    
  <Container>
    <h1>Product  Form</h1>
    <Row>
      <Col>
        <Form   onSubmit={onSubmit} encType='multipart/form-data'>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"
             name="pn"  
             value={productName} 
             onChange={onChangeProductName}/>
          </Form.Group>
           <Form.Group>
                <Button  type="submit" variant="primary">Submit</Button>
              </Form.Group>

        </Form>
      </Col>
    </Row>
  </Container>
</>
  );
}
