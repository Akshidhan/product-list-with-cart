import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, increaseQuantity, decreaseQuantity } from '../slices/cartSlice';

export default function Products() {
    const [products, setProducts] = useState([]);
    const cart = useSelector(state => state.cart.products);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('./data.json')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            });
    }, []);

    return (
        <>
            {products.map(product => (
                <div className="col-md-4" key={product.id}>
                    <div className="productCard">
                        <div className="top">
                            <img src={product.image.desktop} alt={product.name} />
                            {cart.find(item => item.id === product.id) ? (
                                <div className="cartButton selected">
                                    <button onClick={() => dispatch(decreaseQuantity(product))}><img src="icon-decrement-quantity.svg" alt="" /></button>
                                    {cart.find(item => item.id === product.id).quantity}
                                    <button onClick={() => dispatch(increaseQuantity(product))}><img src="icon-increment-quantity.svg" alt="" /></button>
                                </div>
                            ) : (
                                <div className="cartButton" onClick={() => dispatch(addProduct(product))}>
                                    <img src="icon-add-to-cart.svg" alt="Add to cart" />
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
