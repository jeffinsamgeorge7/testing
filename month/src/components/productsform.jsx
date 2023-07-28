import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import AXIOS from 'axios';

import CategoryForm from './category';

export default function ProductsForm(){
    const [image, setImage] = useState({ preview: "", data: "" });
    const [pn,setpn]=useState("");
    const [disc,setdisc]=useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [price, setProductPrice] = useState('');
    const [stock, setProductStock] = useState('');
    const formdata = new FormData();

    useEffect(() => {
        // Fetch categories from the backend when the component mounts
        fetchCategories();
      }, []);
    
      const fetchCategories = () => {
        AXIOS.get('http://localhost:9000/catgetdata')
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const handleFile = (e) => {
      e.preventDefault()
      
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  const handleData = (event) => {
    event.preventDefault()
    formdata.append("pname",pn);
    formdata.append("disc",disc);
    formdata.append("prodcategory", selectedCategory);
    formdata.append("prodprice",price);
    formdata.append("stock",stock);
    formdata.append('file', image.data);
    AXIOS.post('http://localhost:9000/addproduct', formdata, { 'Content-Type': 'multipart/form-data' } )
    .then((res) => {
      alert(res.data.msg);
    })
    .catch((error) => {
      console.error(error);
    })
  };
    return(
        <>
      <Container>
        <h1>Product  Form</h1>
        <Row>
          <Col>
            <Form   onSubmit={handleData} encType='multipart/form-data'>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                 name="pn"  
                 onChange={(e)=>{
                            setpn(e.target.value)}}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Discription</Form.Label>
                <Form.Control type="text" name="disc"   onChange={(e)=>{
                            setdisc(e.target.value)
                    }}/>
              </Form.Group>
              <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}>
                            <option value="" className="prodcategory">Select a category</option>
                            {categories.map((category) => (
                            <option key={category._id} value={category.category}>
                              {category.category} 
                            </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name="prodprice"  onChange={(e)=>{
                            setProductPrice(e.target.value)
                    }}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control type="text" name="stock"  onChange={(e)=>{
                            setProductStock(e.target.value)
                    }}/>
              </Form.Group>
              

              <Form.Group>
                <Form.Label>Upload photo</Form.Label>
                <Form.Control type="file" name="file"  required onChange={handleFile}/>
              </Form.Group>
              <Form.Group>
                <Button  type="submit" variant="primary">Submit</Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>
          <CategoryForm/>
          </Col>
        </Row>
      </Container>
    </>
    )
}