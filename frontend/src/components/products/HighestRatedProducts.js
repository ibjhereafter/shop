import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

import { startGetHighestRatedProducts } from '../../store/actions/index';
import styles from "../utilities/styles";
import Rating from "../utilities/Rating";


const HighestRatedProducts = (props) => {
    const { highestRatedProduct, startGetHighestRatedProducts } = props;

    useEffect(() => {
            startGetHighestRatedProducts();
    }, [startGetHighestRatedProducts]);

    const list = highestRatedProduct.map((product) => {
        return (
            <Fragment key={product._id}>
                        <div className="card">
                            <div style={styles.marginBottom} className="image">
                                <img src={`${product.image}`} alt={product.description}/>
                            </div>

                            <div style={styles.marginLeft}>
                                <Link to={`/products/${product._id}`}>
                                    <div className="ui header" style={styles.marginBottom}>{product.name}</div>
                                </Link>

                                <div style={styles.marginBottom}>
                                    <Rating averageRating={product.averageRating}/>
                                </div>

                                <div style={styles.marginBottom} className="ui header">
                                    $ <span style={styles.bold}> {product.price}</span>
                                </div>
                            </div>

                        </div>
            </Fragment>
        )
    });

    return (<div className="ui container eight stackable cards">{list}</div>)
};

const mapStateToProps = (state) => {
    return {
        highestRatedProduct: state.highestRatedProduct.highestRatedProducts,
        loading: state.highestRatedProduct.loading,
        error: state.highestRatedProduct.error
    }
}

export default connect(mapStateToProps, { startGetHighestRatedProducts })(HighestRatedProducts);