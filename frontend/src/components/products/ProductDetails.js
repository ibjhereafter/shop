import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { startGetProductDetails } from '../../store/actions/index';

import Styles from '../utilities/styles';
import Error from "../utilities/Error";
import Loader from "../utilities/Loader";
import Rating from '../utilities/Rating';


const ProductDetails = (props) => {
    const { loading, error, product, startGetProductDetails, history, reviews, match }  = props;
    const [ quantity, setQuantity ] = useState(1);
    document.title = `${product.name} | Shop`;

    const addQuantity = () => {
        setQuantity(quantity + 1)

        if (quantity === product.stock) {
            setQuantity(product.stock)

        }
    };

    const subtractQuantity = (event) => {
        setQuantity(quantity - 1);

        if (quantity <= 0) {
            setQuantity(0);
        }
    };

    const goToCart = (product, quantity) => {
        if (product) {
            product.quantity = quantity;
            history.push('/cart', product);
        }
    };

    useEffect(() => {
        if (match.params.id) {
            startGetProductDetails(match.params.id);
        }

    }, [startGetProductDetails, match]);

    const stock = (stock) => {
        if (stock >= 1) {
            return (
                <div style={{color: 'green'}} className="inStock">In Stock ({stock})</div>
            )
        } else {
            return (
                <div style={{color: 'red'}} className="outOfStock">Out of Stock</div>
            )
        }
    };

    const reviewList = reviews.map((review) => {
        return (
            <Fragment key={review._id}>
                <div className="item">
                    <div className="content">
                        <div className="header">
                            <div>{review.name}</div>
                        </div>
                        <br/>
                        <Rating averageRating={review.rating}/>
                        <br/>
                        <div>{review.comment}</div>
                        <br/>
                        <div>{review.createdAt.substring(0, 10)}</div>
                    </div>
                </div>
            </Fragment>
        )
    });

    return (
        <Fragment>
            <div className="ui stackable grid container">
                <Link to="/">
                    <button style={Styles.marginTop} className="ui black button">Go Back</button>
                </Link>
            </div>

            {
                error && <Error />
            }

            {
                loading ? <Loader /> : (
                    <div className="ui stackable grid container">
                        <div className="eight wide column row">
                            <div className="column">
                                <img src={`${product.image}`}
                                     alt={product.description}
                                     width="500"
                                     height="400"
                                />

                                <div style={Styles.marginTop} className="ui container">
                                    <h1>REVIEWS</h1>
                                    {
                                        reviews.length === 0 ? <div style={Styles.marginBottom} className="ui yellow visible message header">There are no reviews for this product right now.</div> : <div className="ui celled list">{reviewList}</div>
                                    }
                                </div>
                                <div style={Styles.marginTop} className="ui container">
                                    <Link to={`/products/${product._id}/review`}>
                                        <button className="ui black button">WRITE A REVIEW</button>
                                    </Link>
                                </div>

                            </div>

                        </div>
                        <div className="four wide column row stackable">
                            <div className="column">
                                <div style={Styles.marginBottom} className="ui header">{product.name}</div>
                                <hr/>

                                <div style={Styles.marginBottom}>
                                    <Rating averageRating={product.averageRating}/>{product.numberOfReviews} reviews
                                </div>
                                <hr/>

                                <div style={Styles.marginBottom} className="ui header">$ {product.price}</div>
                                <hr/>

                                <div className="ui header">{product.description}</div>
                            </div>

                        </div>

                        <div className="four wide column row">
                            <div className="column">
                                <table className="ui basic table">
                                    <tbody className="ui header">
                                    <tr>
                                        <td>Price</td>
                                        <td>$ {product.price}</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>{stock(product.stock)}</td>
                                    </tr>

                                    </tbody>
                                </table>
                                <div style={Styles.marginBottom}>
                                    <button onClick={addQuantity} className="ui green button">+</button>
                                    <button className="ui basic button" style={Styles.marginRightLeft}>{quantity}</button>
                                    <button onClick={subtractQuantity} className="ui grey button">-</button>
                                </div>
                                <button type="button"
                                        onClick={() => goToCart(product, quantity)}
                                        disabled={product.stock === 0}
                                        className="fluid ui black button"
                                >Add to Cart</button>

                            </div>
                        </div>

                    </div>)
            }

        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        loading: state.productDetails.loading,
        error: state.productDetails.error,
        product: state.productDetails.product,
        reviews: state.reviews.reviews
    }
}

export default connect(mapStateToProps, { startGetProductDetails })(ProductDetails);