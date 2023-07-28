import { useEffect, useState } from 'react';
import AXIOS from 'axios';

export default function ProductList() {
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
  
    return (
      <div>
        <h1>Product Table</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
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
                  {product.fileurl ? (
                    <img
                      src={`http://localhost:9000/uploads/products/${product.fileurl}`}
                      alt={product.pname}
                      style={{ width: '100px', height: 'auto' }}
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = '/placeholder-image.jpg'; // Display a placeholder image on error
                      }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ); 


}
