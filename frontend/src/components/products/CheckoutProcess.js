import '../layout/Footer.css'
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CheckoutProcess = ({ shipping, payment, placeOrder}) => {
    const disable = true;
    return (
        <Fragment>
            <div className="ui grid">
                <div className="sixteen wide column">
                    <div className="column">
                        <div className="ui large breadcrumb centerElement">

                            {
                                shipping ? (
                                    <Fragment>
                                        <Link to="/checkout/shipping">
                                            <div className="section ">Shipping</div>
                                            <i className="right chevron icon divider">{}</i>
                                        </Link>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <button disabled={disable} className="ui basic button">
                                            <Link to="/checkout/shipping">Shipping</Link>
                                        </button>
                                        <i className="right chevron icon divider">{}</i>
                                    </Fragment>
                                )
                            }

                            {
                                payment ? (
                                    <Fragment>
                                        <Link to="/checkout/payment">
                                            <div className="section">Payment</div>
                                            <i className="right chevron icon divider">{}</i>
                                        </Link>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <button disabled={disable} className="ui basic button">
                                            <Link to="/checkout/payment">Payment</Link>
                                        </button>
                                        <i className="right chevron icon divider">{}</i>
                                    </Fragment>
                                )
                            }

                            {
                                placeOrder ? (
                                    <Fragment>
                                        <Link to="/checkout/placeorder">
                                            <div className="section" disabled>Place Order</div>
                                            <i className="right chevron icon divider">{}</i>
                                        </Link>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <button disabled={disable} className="ui basic button">
                                            <Link to="/checkout/placeorder">Place Order</Link>
                                        </button>
                                        <i className="right chevron icon divider">{}</i>
                                    </Fragment>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>


        </Fragment>
    );
};

export default CheckoutProcess;