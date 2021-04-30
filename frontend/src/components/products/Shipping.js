import '../layout/Footer.css'
import React, {Fragment, useEffect, useState} from "react";
import Styles from '../utilities/styles';
import { connect } from "react-redux";
import { getShippingAddress } from '../../store/actions/index';
import history from "../../history";
import CheckoutProcess from "./CheckoutProcess";


const Shipping = (props) => {
    const { getShippingAddress, loggedInUser, shippingAddress } = props;
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const [formError, setFormError] = useState('');
    const [showFormError, setShowFormError] = useState('hidden');

    useEffect(() => {
        if (!loggedInUser.name) {
            history.push('/users/login');
        } else {
            if (shippingAddress.country) {
                setAddress(shippingAddress.address);
                setCity(shippingAddress.city);
                setPostalCode(shippingAddress.postalCode);
                setCountry(shippingAddress.country);
            }
        }
    }, [loggedInUser, shippingAddress]);



    const onFormSubmit = (event) => {
        event.preventDefault();
        const shippingAddress = {
            address,
            city,
            postalCode,
            country
        };

        if (address && city && country) {

            getShippingAddress(shippingAddress);
            localStorage.setItem('shipping', JSON.stringify(shippingAddress));
            history.push('/checkout/payment');

        } else {
            setFormError('Please, check to ensure that all the fields are completed correctly.');
            setShowFormError('visible');
        }
    }
    return (
        <Fragment>
            <div className="ui grid container">
                <div className="sixteen wide column">
                    <div className="column">
                        <CheckoutProcess shipping />
                        <h1 className="ui header">SHIPPING</h1>
                        <form className="ui form" onSubmit={onFormSubmit}>
                            <div className="field">
                                <label className="label">Address</label>
                                <input type="text"
                                       value={address}
                                       onChange={(event => setAddress(event.target.value))}
                                       style={Styles.marginBottom}
                                       autoFocus
                                       placeholder="Please, enter your address here"
                                />
                                <label className="label">City</label>
                                <input type="text"
                                       value={city}
                                       onChange={(event => setCity(event.target.value))}
                                       style={Styles.marginBottom}
                                       placeholder="Please, enter your city here"
                                />
                                <label className="label">Postal Code</label>
                                <input type="text"
                                       value={postalCode}
                                       onChange={(event => setPostalCode(event.target.value))}
                                       style={Styles.marginBottom}
                                       placeholder="Please, enter your postal code here"
                                />
                                <label className="label">Country</label>
                                <input type="text"
                                       value={country}
                                       onChange={(event => setCountry(event.target.value))}
                                       style={Styles.marginBottom}
                                       placeholder="Please, enter your country here"
                                />

                                <div className="centerElement" style={{width: '250px'}}>
                                    <button type="submit" className="fluid ui black button">CONTINUE</button>
                                </div>
                            </div>
                        </form>
                        <p className={`ui red ${showFormError} message header`}>{formError}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        shippingAddress: state.cart.shippingAddress,
        loggedInUser: state.authentication.user
    }
};



export default connect(mapStateToProps, { getShippingAddress })(Shipping);