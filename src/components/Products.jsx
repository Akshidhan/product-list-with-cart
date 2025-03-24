import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, increaseQuantity, decreaseQuantity } from '../slices/cartSlice';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cart = useSelector(state => state.cart.products);
    const dispatch = useDispatch();
    const addToCartIcon = '/assets/images/icon-add-to-cart.svg';
    const decreamentButton = '/assets/images/icon-decrement-quantity.svg';
    const increamentButton = '/assets/images/icon-increment-quantity.svg';

    useEffect(() => {
        console.log('Fetching data...');
        fetch('/data.json')
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {products.map(product => (
                <div className="col-md-4" key={product.id}>
                    <div className="productCard">
                        <div className="top">
                            <img src={product.image.desktop} alt={product.name} />
                            {cart.find(item => item.id === product.id) ? (
                                <div className="cartButton selected">
                                    <button onClick={() => dispatch(decreaseQuantity(product))}><img src={decreamentButton} alt="" /></button>
                                    {cart.find(item => item.id === product.id).quantity}
                                    <button onClick={() => dispatch(increaseQuantity(product))}><img src={increamentButton} alt="" /></button>
                                </div>
                            ) : (
                                <div className="cartButton" onClick={() => dispatch(addProduct(product))}>
                                    <img src={addToCartIcon} alt="Add to cart" />
                                    Add to cart
                                </div>
                            )}
                        </div>
                        <div className="cardBody">
                            <p className="category">{product.category}</p>
                            <p className="name">{product.name}</p>
                            <p className="price">${product.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
