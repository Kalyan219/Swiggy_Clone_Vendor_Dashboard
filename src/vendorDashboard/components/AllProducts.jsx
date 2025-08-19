import React, { useState,useEffect } from 'react';

import { API_URL } from '../data/apiPath';


const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const productsHandler = async () => {
        try {
            const firmId = localStorage.getItem('firmId');
            if (!firmId) {
                console.log('Firm ID not found');
                return;
            }
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const data = await response.json();
            setProducts(data.products);
            console.log('Products fetched successfully:', data);
            
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to fetch products');
        }
    }

    useEffect(() => {
        productsHandler();
    }, []);

    const deleteProductHandler = async (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${API_URL}/product/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProducts(products.filter(product => product._id !== productId));
            }
            
            alert('Product deleted successfully'); 
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    }
    
  return (
    <div>
        { (!products) ? (
            <p>No Products available</p>
        ) : (
            <table className='productsTable'>
               <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {products.map((item) =>{
                    return (
                    <tr key={item._id}>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>{item.image && (<img src={`${API_URL}/uploads/${item.image}`} alt={item.productName}
                                       style={{width:'50px',height: '50px'}} />)}</td>
                        <td><button onClick={() => deleteProductHandler(item._id)}>Delete</button></td>
                    </tr>
                )})}
               </tbody>
            </table>
        )}
    </div>
  )
}

export default AllProducts