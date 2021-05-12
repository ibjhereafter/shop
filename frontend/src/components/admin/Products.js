import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import history from "../../history";

import AdminHomePageHeader from "../layout/AdminHomePageHeader";
import Loader from "../utilities/Loader";
import Error from "../utilities/Error";
import { startAdminGetAllProducts } from '../../store/actions/index';

const Products = (props) => {
    document.title = 'Admin | Product | Shop';
    const { products, loading, error, startAdminGetAllProducts } = props;
    useEffect(() => {
        startAdminGetAllProducts();

    }, [startAdminGetAllProducts]);

    const onDeleteIconClick = (productId) => {
        if (productId) {
            history.push(`/admin/products/${productId}/delete`);
        }
    };

    const onEditIconClick = (productId) => {
        if (productId) {
            history.push(`/admin/products/${productId}/edit`);
        }
    };

    const onCreateButtonClick = () => {
        history.push('/create/product');
    }

    return (
        <Fragment>
            <AdminHomePageHeader />
            <div className="ui stackable grid container">
                <div className="twelve wide column">
                    <div className="column">
                        <div style={{marginTop: '20px', marginBottom: '20px'}} className="ui container">
                            <h2 style={{marginTop: '0px'}}>PRODUCTS</h2>
                        </div>
                    </div>
                </div>
                <div className="four wide column">
                        <div className="column">
                            <button onClick={onCreateButtonClick} className="ui black button">+ CREATE PRODUCT</button>
                        </div>
                </div>
            </div>
                <div className="ui stackable grid container">
                    <div className="twelve wide column">
                        <div className="column">
                            {
                                loading && <Loader />
                            }
                            {
                                error ? <Error /> : (
                                    <Fragment>
                                        <table className="ui celled table">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>PRICE</th>
                                                <th>CATEGORY</th>
                                                <th>BRAND</th>
                                                <th>{}</th>
                                                <th>{}</th>
                                            </tr>
                                            </thead>
                                            {
                                                products.map((product) => {
                                                    return(
                                                        <Fragment key={product._id}>
                                                            <tbody>
                                                            <tr>
                                                                <td>{product._id}</td>
                                                                <td>{product.name}</td>
                                                                <td>{product.price.toFixed(2)}</td>
                                                                <td>{product.category}</td>
                                                                <td>{product.brand}</td>
                                                                <td>
                                                                    <button onClick={() => onEditIconClick(product._id)}>
                                                                        <i className="edit icon">{}</i>
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <button type="button" onClick={() => onDeleteIconClick(product._id)}>
                                                                        <i style={{color: 'red'}} className="trash icon">{}</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </table>
                                    </Fragment>
                                )
                            }

                        </div>
                    </div>
                </div>

        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        loading: state.admin.products.loading,
        error: state.admin.products.error,
        errorMessage: state.admin.products.errorMessage,
        products: state.admin.products.products
    }
}

export default connect(mapStateToProps, { startAdminGetAllProducts })(Products);