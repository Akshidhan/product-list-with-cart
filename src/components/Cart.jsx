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

    useEffect(() => {
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
            <div class="modal fade" id="checkoutModal" tabindex="-1" aria-labelledby="checkoutModal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0">
                        <div class="modal-body p-4 rounded-5">
                            <img src="icon-order-confirmed.svg" alt="Order confirmed" class="py-2" />
                            <p id="orderHeading">Order Confirmed</p>
                            <p id="orderSub" class="pb-4">We hope you enjoy your food</p>
                            <div>
                                <div id="mainComponent">
                                    <div id="selectedItems">
                                        {cart.map(product => (
                                        <div class="selectedItem p-3 d-flex justify-content-between flex-row align-items-center">
                                            <div class="d-flex gap-4 align-items-center">
                                                <img src="image-tiramisu-thumbnail.jpg" alt="thumbnail" class="rounded-2 thumbnail" />
                                                <div class="d-flex flex-column align-items-start">
                                                    <p class="name">{product.name}</p>
                                                    <div class="d-flex gap-4">
                                                        <p class="quantity">{product.quantity}x</p>
                                                        <p class="unit">@${product.price}</p>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div>
                                                <p class="price">${product.price * product.quantity}</p>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
        
                                    <div class="d-flex justify-content-between my-4 align-items-center">
                                        <p>Order Total</p>
                                        <p class="total">${total}</p>
                                    </div>
                                </div>

                                <button class="btn confirm-button" onClick={checkoutPanel()} data-bs-dismiss="modal">Start New Order</button>
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
                        <button className="btn confirm-button" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#checkoutModal">Confirm Order</button>
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
