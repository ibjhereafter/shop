import '../layout/Footer.css'
import React, {Fragment, useEffect, useState} from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../utilities/Loader";
import Error from "../utilities/Error";
import styles from "../utilities/styles";
import Rating from "../utilities/Rating";
import { startGetAllProducts } from '../../store/actions/index';

import PaginationButton from "../utilities/PaginationButton";

const ProductList = (props) => {
    const [numberOfProductsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, products, startGetAllProducts } = props;

    const startIndex = ((currentPage - 1) * numberOfProductsPerPage );
    const currentList = products.slice(startIndex, startIndex + numberOfProductsPerPage);

    useEffect(() => {

        startGetAllProducts();

    }, [startGetAllProducts]);

    const onPageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const list = currentList.map((product) => {
        return (
            <Fragment key={product._id}>
                <div className="card">
                    <div style={styles.marginBottom} className="image">
                        <img src={`https://jalloh-proshop.s3.eu-central-1.amazonaws.com/${product.image}`} alt={product.description}/>
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

    return (
        <Fragment>
            <div className="ui grid container">
                <div className="ui sixteen column">
                    {
                        error ? <Error /> : <h1 className="ui header container">Latest Products</h1>
                    }

                    {
                        loading ? (<Loader />)
                            : (<Fragment>
                                <div style={{marginBottom: '20px'}} className="ui container four stackable cards">{list}</div>
                                {
                                    products.length > 12 ? (<PaginationButton onPageClick={onPageClick} />) : null
                                }

                            </Fragment>)
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