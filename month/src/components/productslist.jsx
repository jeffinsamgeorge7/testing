import { useEffect, useState } from 'react';
import AXIOS from 'axios';
import { Table ,Container,Form,Button } from 'react-bootstrap';
import Navbr from './navbr';
export default function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    AXIOS.get('http://localhost:9000/getproduct')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleDelete = (productId) => {
    AXIOS.delete(`http://localhost:9000/deleteproduct/${productId}`)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    <Navbr/>
    <Container>
      <h1>Product Table</h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.pname}</td>
              <td>{product.disc}</td>
              <td>{product.prodcategory}</td>
              <td>{product.prodprice}</td>
              <td>{product.stock}</td>
              <td>
                {product.fileurl && (
                  <img
                    src={`http://localhost:9000/${product.fileurl}`}
                    alt={product.pname}
                    style={{ width: '150px', height: '150px' }}
                  />
                )}
              </td>
              <td>
              <Form>
              <Form.Group>
                <a href={`/edit/${product._id}`} className="btn btn-primary mt-3">Edit</a>
              </Form.Group>
              <Form.Group>
              <Button
                  type="button"
                  variant="primary"
                  className="btn btn-danger mt-3"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </Form.Group>
              </Form>
              </td>
            </tr>
          ))}
        </tbody>
       

      </Table>
    </Container> 
    </>
  );
}
