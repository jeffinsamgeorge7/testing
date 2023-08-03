import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AXIOS from 'axios';

export default function Updproduct() {
  const [image, setImage] = useState({ preview: '', data: '' });
  const [pname, setPn] = useState('');
  const [cat, setCat] = useState([]); // Initialize as an empty array
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');
  const { id = 'DefaultID' } = useParams();
  const [loading, setLoading] = useState(true);

  const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const fetchProduct = () => {
    AXIOS.get(`http://localhost:9000/productbyid/${id}`)
      .then((response) => {
        const productData = response.data;
        setPn(productData.pname);
        setImage(productData.fileurl);
        setSelectedCategory(productData.cat);
        setPrice(productData.prodprice);
        
        // Check if 'cat' is an array, if not, convert it to an array
        if (Array.isArray(productData.
            prodcategory)) {
          setCat(productData.
            prodcategory);
        } else {
          setCat([productData.
            prodcategory]); // Wrap the object in an array
        }

        // Assuming 'productData.image' contains the image data
        // You can update 'image.data' and 'image.preview' here if required

        setLoading(false); // Set loading to false when data fetching is complete
      })
      .catch((error) => {
        console.error(error);
        alert(error);
        setLoading(false); // Set loading to false on error as well
      });
  };

  useEffect(() => {
    // Fetch product details from the backend when the component mounts
    fetchProduct();
  }, [id]); // Add 'id' as a dependency to useEffect so it fetches details when the id changes

  const fetchCategories = () => {
    AXIOS.get('http://localhost:9000/catgetdata')
      .then((response) => {
        setCat(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append('file', image.data);
    formData.append("pname", pname);
    formData.append('cat', selectedCategory);
    formData.append('price', price);

    AXIOS.post(`http://localhost:9000/updateprd/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        alert(res.data.msg);
        window.location.href='/productlist';
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {id}
      <Container style={{ marginTop: "100px", backgroundColor: 'gray' }}>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="pname"
                  value={pname}
                  onChange={(e) => setPn(e.target.value)}
                  placeholder="Enter product name"
                />
              </Form.Group>
              {loading ? (
                <div>Loading...</div> // Show loading indicator while fetching data
              ) : (
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="" className="cat">
                      Select a category
                    </option>
                    {cat.map((category) => (
                      <option key={category._id} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Price"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  required
                  placeholder='Upload your photo'
                  onChange={handleFile}
                />
              </Form.Group>
              <Form.Group style={{ marginTop: '30px', marginBottom: '50px' }}>
                <Button
                  required
                  onClick={handleSubmit}
                  variant="primary"
                >
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            {image.preview && <img src={image.preview} style={{ width: '250px', height: '250px' }} alt="hello" />}
          </Col>
        </Row>
      </Container>
    </>
  );
}
