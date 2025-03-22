import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../slices/cartSlice';

export default function Cart() {
    const cart = useSelector(state => state.cart.products);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const removeIcon = '/assets/images/icon-remove-item.svg';
    const carbonNeutralIcon = '/assets/images/icon-carbon-neutral.svg';
    const emptyCartImage = '/assets/images/illustration-empty-cart.svg';

    useEffect(() => {
        let total = 0;
        cart.forEach(product => {
            total += product.price * product.quantity;
        });
        setTotal(total);
    }, [cart]);

    return (
        <>
            <p>Your Cart ({cart.length})</p>
            {cart.length > 0 ? (
                <div id="itemCart">
                    {cart.map(product => (
                        <div className="item" key={product.id}>
                            <p className="name">{product.name}</p>
                            <div>
                                <p className="quantity">{product.quantity}x</p>
                                <div>
                                    <p className="unit">@${product.price}</p>
                                    <p className="price">${product.price * product.quantity}</p>
                                </div>
                            </div>
                            <img src={removeIcon} alt="remove button" className="removeButton" onClick={() => dispatch(removeProduct(product))} />
                        </div>
                    ))}
                    <div className="bottom">
                        <div className="d-flex justify-content-between my-4">
                            <p>Order Total</p>
                            <p className="total">${total}</p>
                        </div>
                        <div className="carbonNeutral">
                            <img src={carbonNeutralIcon} alt="Carbon neutral icon" /><p>This is a <span>carbon-neutral</span> delivery</p>
                        </div>
                        <button className="btn confirm-button">Confirm Order</button>
                    </div>
                </div>
            ) : (
                <div className="emptyCart">
                    <img src={emptyCartImage} alt="empty cart" />
                    <p>Your added items will appear here</p>
                </div>
            )}
        </>
    );
}
