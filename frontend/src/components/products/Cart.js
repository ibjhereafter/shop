import '../layout/Footer.css'
import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Styles from '../utilities/styles';
import history from "../../history";

import { startGetCartProduct, startRemoveCartItem } from '../../store/actions/index';

const Cart = (props) => {
    const { startGetCartProduct, startRemoveCartItem, cartItems   } = props;
    const { state } = props.location;

    useEffect(() => {
        if (state) {

            startGetCartProduct(state._id, state.quantity);
        }

    }, [state, startGetCartProduct]);


    const length = () => {
        if (cartItems.length === 0) {
            return (
                <Fragment>
                    <h1 style={Styles.marginTop} className="ui visible yellow message header">Your cart is empty!</h1>
                    <Link to="/">
                        <button className="ui black button massive container">Shop Around</button>
                    </Link>
                </Fragment>

            )
        } else {
            return (
                <h1 style={{marginBottom: '20px', marginTop: '10px'}} className="ui header container">SHOPPING CART</h1>
            )
        }
    };

    const totalPrice = () => {
        let totalPrice = 0;

        cartItems.forEach((item) => {
            return totalPrice = totalPrice + (Number(item.quantity) * Number(item.price));
        });

        return totalPrice.toFixed(2);
    };


    const subTotals = () => {
        let sum = 0;
        cartItems.forEach((item) => {
            return sum = sum + item.quantity;
        });

        return (
            <Fragment>
                <table className="ui basic table">
                    <thead>
                    <tr>
                        <th >SUBTOTALS ({sum}) ITEMS</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="ui header">$ {totalPrice()}</td>
                    </tr>
                    </tbody>
                </table>
            </Fragment>
        )
    };
    const removeCartItem = (itemId) => {
        startRemoveCartItem(itemId);
    };

    const cartList = cartItems.map((item) => {
        return (
            <Fragment key={item._id}>
                <div className="item container">

                    <div className="ui stackable grid container">
                        <div className="four wide column">
                            <div className="column">
                                <img src={`https://jalloh-proshop.s3.eu-central-1.amazonaws.com/${item.image}`}
                                     alt={item.description}
                                     width="150"
                                     height="100"
                                />
                            </div>
                        </div>

                        <div className="three wide column">
                            <div className="column">
                                <div className="ui header">{item.name}</div>
                            </div>
                        </div>

                        <div className="two wide column">
                            <div className="column">
                                <div className="ui header">$ {item.price}</div>
                            </div>
                        </div>

                        <div className="two wide column">
                            <div className="column">
                                <button className="ui black button">{item.quantity}</button>
                            </div>
                        </div>

                        <div className="one wide column">
                            <div className="column">
                                <button className="" onClick={() => removeCartItem(item._id)} type="button">
                                    <i className="ui red trash icon"/>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    });

    const goToCheckOut = () => {
        history.push('/checkout/shipping');
    };

    return (
        <Fragment>
            <div>{length()}</div>
            <div className="ui relaxed divided list container">
                {cartList}
                {subTotals()}
            </div>
            <div className="ui container">
                <button disabled={cartItems.length === 0} onClick={goToCheckOut} className="ui black button centerElement" type="button">PROCEED TO CHECKOUT
                </button>
                <div style={Styles.marginTop}>
                    <Link to="/">
                        {
                            cartItems.length > 0 && (<button className="ui blue button centerElement">Keep Shopping</button>)
                        }
                    </Link>
                </div>

            </div>

        </Fragment>

    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems
    }
};

export default connect(mapStateToProps, { startGetCartProduct, startRemoveCartItem })(Cart);