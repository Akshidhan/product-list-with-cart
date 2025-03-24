import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, clearCart } from '../slices/cartSlice';

export default function Cart() {
    const cart = useSelector(state => state.cart.products);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const removeIcon = '/assets/images/icon-remove-item.svg';
    const carbonNeutralIcon = '/assets/images/icon-carbon-neutral.svg';
    const emptyCartImage = '/assets/images/illustration-empty-cart.svg';
    const confirmedIcon = '/assets/images/icon-order-confirmed.svg';

    useEffect(() => {
        console.log('Calculating total...');
        let total = 0;
        cart.forEach(product => {
            total += product.price * product.quantity;
        });
        setTotal(total);
    }, [cart]);

    const checkoutPanel = () => {
        dispatch(clearCart());
    }

    return (
        <>
            <div className="modal fade" id="checkoutModal" tabIndex="-1" aria-labelledby="checkoutModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0">
                        <div className="modal-body p-4 rounded-5">
                            <img src={confirmedIcon} alt="Order confirmed" className="py-2" />
                            <p id="orderHeading">Order Confirmed</p>
                            <p id="orderSub" className="pb-4">We hope you enjoy your food</p>
                            <div>
                                <div id="mainComponent">
                                    <div id="selectedItems">
                                        {cart.map(product => (
                                        <div className="selectedItem p-3 d-flex justify-content-between flex-row align-items-center" key={product.id}>
                                            <div className="d-flex gap-4 align-items-center">
                                                <img src={product.image.thumbnail} alt="thumbnail" className="rounded-2 thumbnail" />
                                                <div className="d-flex flex-column align-items-start">
                                                    <p className="name">{product.name}</p>
                                                    <div className="d-flex gap-4">
                                                        <p className="quantity">{product.quantity}x</p>
                                                        <p className="unit">@${product.price}</p>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div>
                                                <p className="price">${product.price * product.quantity}</p>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
        
                                    <div className="d-flex justify-content-between my-4 align-items-center">
                                        <p>Order Total</p>
                                        <p className="total">${total}</p>
                                    </div>
                                </div>

                                <button className="btn confirm-button" onClick={checkoutPanel} data-bs-dismiss="modal">Start New Order</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
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
                        <button className="btn confirm-button" type="button" data-bs-toggle="modal" data-bs-target="#checkoutModal">Confirm Order</button>
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
