import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";

import Loader from "../utilities/Loader";
import Error from "../utilities/Error";
import styles from "../utilities/styles";
import Rating from "../utilities/Rating";
import { startGetAllProducts } from '../../store/actions/index';
import { Link } from "react-router-dom";

const ProductList = (props) => {
    const { loading, error, products, startGetAllProducts } = props;

    useEffect(() => {

        startGetAllProducts();

    }, [startGetAllProducts]);

    const list = products.map((product) => {
        return (
            <Fragment key={product._id}>
                    <div className="card">
                        <div style={styles.marginBottom} className="image">
                            <img src={`https://jalloh-proshop.s3.eu-central-1.amazonaws.com/${product.image}`} alt={product.description}
                                 height="250px"
                            />
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
            </Fragment>)
    });
    return (
        <Fragment>
            <div className="ui grid">
                <div className="ui sixteen column">
                    {
                        error ? <Error /> : <h1 className="ui header container">Latest Products</h1>
                    }
                    {
                        loading ? (<Loader />)
                            : (<Fragment><div className="ui container four stackable cards">{list}</div></Fragment>)
                    }
                </div>
            </div>

        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.products.loading,
        error: state.products.error,
        products: state.products.products
    }
}

export default connect(mapStateToProps, { startGetAllProducts })(ProductList);