import './Payment.css';
import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";

import history from "../../history";
import CheckoutProcess from "./CheckoutProcess";
import Styles from '../utilities/styles';
import { getPaymentMethod } from '../../store/actions/index';

const Payment = (props) => {
    document.title = 'Payment Method | Shop';
    const { loggedInUser, getPaymentMethod, shippingAddress } = props;
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        if (!shippingAddress.country) {
            history.push('/checkout/shipping');
        }

    }, [shippingAddress]);

    useEffect(() => {
        if (!loggedInUser.name) {
            history.push('/users/login');
        }
    }, [loggedInUser]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        getPaymentMethod(paymentMethod);
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
        history.push('/checkout/placeorder');
    };

    return (
        <Fragment>
            <div className="div ui grid container">
                <div className="sixteen wide column">
                    <div className="column">
                        <CheckoutProcess shipping payment />
                        <h1 className="ui header">PAYMENT</h1>
                        <h3>SELECT PAYMENT METHOD</h3>
                        <form className="ui form" onSubmit={onFormSubmit}>
                            <input type="radio"
                                   id="PayPal"
                                   name="paymentMethod"
                                   value="PayPal"
                                   style={Styles.marginRight}
                                   onChange={(event => setPaymentMethod(event.target.value))}
                            />
                            <label htmlFor="PayPal">PayPal or Credit Card</label>
                            <br style={Styles.marginBottom}/>

                            <button style={Styles.marginTop} type="submit" className="ui black button">CONTINUE</button>

                        </form>
                        </div>

                    </div>
                </div>
                </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.authentication.user,
        shippingAddress: state.cart.shippingAddress
    }
};

export default connect(mapStateToProps, { getPaymentMethod })(Payment);