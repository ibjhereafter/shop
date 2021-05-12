import '../layout/Footer.css'
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CheckoutProcess from "./CheckoutProcess";
import Styles from '../utilities/styles';
import styles from '../utilities/styles';
import { startGetCreateOrOrder } from '../../store/actions/index';

const PlaceOrder = (props) => {
    document.title = 'Order Summary | Shop';
    const { cart, startGetCreateOrOrder } = props;
    let itemsSum = 0;
    cart.cartItems.forEach((item) => {
        return itemsSum = itemsSum + (Number(item.quantity) * Number(item.price));
    });

    cart.itemsPrice = itemsSum;

    if (cart.items > 199.99) {
        cart.shippingPrice = 0.00;
    } else {
        cart.shippingPrice = 20.00;
    }

    cart.taxPrice = (0.18 * Number(cart.itemsPrice));
    cart.totalPrice = Number(Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice));


    const cartItemsList = cart.cartItems.length === 0 ? (<div className="ui yellow visible message">Your cart is empty</div>) : (
        <Fragment>
            {
                cart.cartItems.map((item) => {
                    return (
                        <Fragment key={item._id}>
                            <div className="ui stackable grid column">
                                <div className="three wide column">
                                    <div className="column">
                                        <div style={styles.marginBottom} className="image">
                                            <img
                                                src={`${item.image}`}
                                                alt={item.description}
                                                width='100px'
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="two wide column">
                                    <div className="column">
                                        <div style={styles.marginBottom}>
                                            <Link to={`/products/${item._id}/details`}>
                                                <div>{item.name}</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="six wide column">
                                    <div className="column">
                                        <div>
                                            {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </Fragment>
                    );
                })
            }
        </Fragment>
    );

    const onPlaceOrderClick =() => {
        const newOrder = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        };

        startGetCreateOrOrder(newOrder);
    };

    return (
        <Fragment>
            <div style={Styles.marginBottom} className="centerElement">
                <CheckoutProcess login shipping payment placeOrder />
            </div>
            <div className="ui stackable grid container">
                <div className="twelve wide column">
                    <div className="column">
                        <h2 className="ui header">SHIPPING</h2>
                        <div style={Styles.marginBottom}>
                            <p>
                                <strong>Shipping:</strong> <span style={Styles.marginRight}> {cart.shippingAddress.address},</span>
                                <span style={Styles.marginRight}>{cart.shippingAddress.city},</span>
                                <span style={Styles.marginRight}>{cart.shippingAddress.postalCode},</span>
                                <span>{cart.shippingAddress.country}.</span>
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="column">
                        <h1 style={Styles.marginTop} className="ui header">PAYMENT METHOD</h1>
                        <div style={Styles.marginBottom}>
                            <p>
                                <strong>Method:</strong> <span>{cart.paymentMethod}</span>
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="column">
                        <h1 style={Styles.marginTop} className="ui header">ORDER ITEMS</h1>
                        <div className="ui container">
                            {cartItemsList}
                        </div>
                    </div>
                </div>
                <div className="four wide column">
                    <div className="column">
                        <h2 className="ui header">ORDER SUMMARY</h2>
                        <table className="ui celled table">
                            <tbody>
                            <tr>
                                <td data-label="Items">Items</td>
                                <td data-label="ItemsPrice">${cart.itemsPrice.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td data-label="Shipping">Shipping</td>
                                <td data-label="ShippingPrice">${cart.shippingPrice.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td data-label="Tax">Tax</td>
                                <td data-label="TaxPrice">${cart.taxPrice.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="ui header" data-label="Total">Total</td>
                                <td className="ui header" data-label="TotalAmount">${cart.totalPrice.toFixed(2)}</td>
                            </tr>
                            </tbody>
                        </table>
                        <button onClick={onPlaceOrderClick} className="ui fluid black button">PLACE ORDER</button>
                        {}
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { startGetCreateOrOrder })(PlaceOrder);