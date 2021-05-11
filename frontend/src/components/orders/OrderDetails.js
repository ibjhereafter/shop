import React, { useEffect, useState, Fragment } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";

import { startGetOrderDetails } from '../../store/actions/index';
import { startGetOrderPayment, resetOrderPayment } from '../../store/actions/index';
import Loader from "../utilities/Loader";
import Error from "../utilities/Error";
import Styles from "../utilities/styles";
import styles from "../utilities/styles";
import { Link } from "react-router-dom";


const axiosOption = {
    mode: 'cors',
    withCredentials: true
};


const OrderDetails = (props) => {
    document.title = 'Order Details | Shop';
    const {
        loading, error, orderDetails, startGetOrderDetails, resetOrderPayment,
        startGetOrderPayment, paymentLoading, loggedInUser, match } = props;
    const [sdkReady, setSdkReady] = useState(false);
    let sum = 0;


    useEffect(() => {
        const getPayPalClientId = async () => {
            const url = '/config/paypal';
            const { data } = await axios.get(url, axiosOption);
            const script = document.createElement('script');
            script.type = 'text/javascript';
            if (!script.src) {
                script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
                script.async = true;
                script.onload = () => {
                    setSdkReady(true);
                };
                document.body.appendChild(script);
            }
        }

        if (!orderDetails || orderDetails._id !== match.params.id) {
            resetOrderPayment();
            startGetOrderDetails(match.params.id);
        } else if (!orderDetails.isPaid) {
            if (!window.paypal) {
                getPayPalClientId();
            } else {
                setSdkReady(true);
            }
        }

    }, [match, startGetOrderDetails, orderDetails, resetOrderPayment]);



    const onPaymentClick = (paymentResult) => {
        startGetOrderPayment(orderDetails._id, paymentResult);
    }

    if (loading) {
        return (
            <Loader />
        )
    } else if (error) {
        return (
            <Error />
        )
    } else {
        orderDetails.orderItems.forEach((item) => {
            sum = sum + (Number(item.quantity) * Number(item.price));
        });
    }

    return (
        <Fragment>
            {
                error && <Error />
            }
            {
                loading ? <Loader /> : (<div className="ui stackable grid container">
                        <div className="twelve wide column">
                            <div className="column">
                                <h1><strong>ORDER {orderDetails._id}</strong></h1>
                                <h2 className="ui header">SHIPPING</h2>
                                <div style={Styles.marginBottom}>
                                    <p><strong>Name: </strong>{orderDetails.user.name}</p>
                                    <p><strong>Email: </strong>{orderDetails.user.email}</p>

                                    <p>
                                        <strong>Shipping:</strong> <span style={Styles.marginRight}> {orderDetails.shippingAddress.address},</span>
                                        <span style={Styles.marginRight}>{orderDetails.shippingAddress.city},</span>
                                        <span style={Styles.marginRight}>{orderDetails.shippingAddress.postalCode},</span>
                                        <span>{orderDetails.shippingAddress.country}.</span>
                                    </p>
                                    {
                                        orderDetails.isDelivered ? <div className="ui green visible message header">Delivered</div> : <div className="ui red visible message header">Not Delivered</div>
                                    }

                                </div>
                            </div>
                            <hr />
                            <div className="column">
                                <h1 style={Styles.marginTop} className="ui header">PAYMENT METHOD</h1>
                                <div style={Styles.marginBottom}>
                                    <p>
                                        <strong>Method:</strong> <span>{orderDetails.paymentMethod}</span>
                                    </p>
                                    {
                                        orderDetails.isPaid ?
                                            <div className="ui green visible message header">Paid</div> :
                                            <div className="ui red visible message header">Not Paid</div>
                                    }
                                </div>
                            </div>

                            <hr />
                            <h1 style={Styles.marginTop} className="ui header">ORDER ITEMS</h1>
                            {
                                orderDetails.orderItems.map((item) => {
                                    return (
                                        <Fragment key={item._id}>
                                            <div className="ui stackable grid container">
                                                <div className="ui three wide column">
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
                                                            <Link to={`/products/${item._id}`}>
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
                        </div>

                        <div className="four wide column">
                            <div className="column">
                                <h2 className="ui header">ORDER SUMMARY</h2>
                                <table className="ui celled table">
                                    <tbody>
                                    <tr>
                                        <td data-label="Items">Items</td>
                                        <td data-label="ItemsPrice">${sum.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="Shipping">Shipping</td>
                                        <td data-label="ShippingPrice">$ {orderDetails.shippingPrice.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="Tax">Tax</td>
                                        <td data-label="TaxPrice">$ {orderDetails.taxPrice.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="ui header" data-label="Total">Total</td>
                                        <td className="ui header" data-label="TotalAmount">$ {orderDetails.totalPrice.toFixed(2)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                {
                                    !orderDetails.isPaid && (
                                        <Fragment>
                                            {
                                                paymentLoading && <Loader />
                                            }
                                            {
                                                !sdkReady ? <Loader /> : (
                                                    <PayPalButton amount={orderDetails.totalPrice.toFixed(2)} onSuccess={onPaymentClick} />
                                                )
                                            }
                                        </Fragment>
                                    )
                                }
                                {
                                    loggedInUser
                                    && loggedInUser.isAdmin
                                    && orderDetails.isPaid
                                    && !orderDetails.isDelivered && (
                                        <Link to={{pathname:`/admin/orders/${orderDetails._id}/deliver`, data: orderDetails._id}}>
                                            <button className="ui black button">MARK AS DELIVERED</button>
                                        </Link>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                )
            }
        </Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        loading: state.orderDetails.loading,
        error: state.orderDetails.error,
        errorMessage: state.orderDetails.errorMessage,
        orderDetails: state.orderDetails.orderDetails,
        paymentLoading: state.paidOrder.loading,
        paymentError: state.paidOrder.error,
        loggedInUser: state.authentication.user,
    }
};

export default connect(mapStateToProps, { startGetOrderDetails, resetOrderPayment, startGetOrderPayment })(OrderDetails);