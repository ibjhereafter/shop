import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";

import { startAdminMarkOrderAsDelivered } from "../../store/actions";
import Styles from "../utilities/styles";
import styles from "../utilities/styles";
import { Link } from "react-router-dom";

const OrderDeliver = (props) => {
    const { startAdminMarkOrderAsDelivered, paidOrder } = props;
    const { data } = props.location;


    let sum = 0;

    useEffect(() => {

        if (data === props.match.params.id) {
            startAdminMarkOrderAsDelivered(data);
        }

    }, [data, startAdminMarkOrderAsDelivered, props.match.params.id]);



    return (
        <Fragment>
            {
                paidOrder.isDelivered && (paidOrder.orderItems.forEach((item) => {
                    sum = sum + (Number(item.quantity) * Number(item.price));
                }))
            }
            {
                paidOrder.isDelivered && (<div className="ui stackable grid container">
                        <div className="twelve wide column">
                            <div className="column">
                                <h1><strong>ORDER {paidOrder._id}</strong></h1>
                                <h2 className="ui header">SHIPPING</h2>
                                <div style={Styles.marginBottom}>
                                    <p><strong>Name: </strong>{paidOrder.user.name}</p>
                                    <p><strong>Email: </strong>{paidOrder.user.email}</p>

                                    <p>
                                        <strong>Shipping:</strong> <span style={Styles.marginRight}> {paidOrder.shippingAddress.address},</span>
                                        <span style={Styles.marginRight}>{paidOrder.shippingAddress.city},</span>
                                        <span style={Styles.marginRight}>{paidOrder.shippingAddress.postalCode},</span>
                                        <span>{paidOrder.shippingAddress.country}.</span>
                                    </p>
                                    {
                                        paidOrder.isDelivered ? <div className="ui green visible message header">Delivered</div> : <div className="ui red visible message header">Not Delivered</div>
                                    }

                                </div>
                            </div>
                            <hr />
                            <div className="column">
                                <h1 style={Styles.marginTop} className="ui header">PAYMENT METHOD</h1>
                                <div style={Styles.marginBottom}>
                                    <p>
                                        <strong>Method:</strong> <span>{paidOrder.paymentMethod}</span>
                                    </p>
                                    {
                                        paidOrder.isPaid ?
                                            <div className="ui green visible message header">Paid</div> :
                                            <div className="ui red visible message header">Not Paid</div>
                                    }
                                </div>
                            </div>

                            <hr />
                            <h1 style={Styles.marginTop} className="ui header">ORDER ITEMS</h1>
                            {
                                paidOrder.orderItems.map((item) => {
                                    return (
                                        <Fragment key={item._id}>
                                            <div className="ui stackable grid container">
                                                <div className="ui three wide column">
                                                    <div className="column">
                                                        <div style={styles.marginBottom} className="image">
                                                            <img
                                                                src={item.image}
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
                                        <td data-label="ShippingPrice">$ {paidOrder.shippingPrice.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="Tax">Tax</td>
                                        <td data-label="TaxPrice">$ {paidOrder.taxPrice.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="ui header" data-label="Total">Total</td>
                                        <td className="ui header" data-label="TotalAmount">$ {paidOrder.totalPrice.toFixed(2)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                              
                            </div>

                        </div>
                    </div>
                )
            }
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        paidOrder: state.admin.delivered
    }
}

export default connect(mapStateToProps, { startAdminMarkOrderAsDelivered })(OrderDeliver);