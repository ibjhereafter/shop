import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import { startAdminGetProductToBeDeleted, startAdminDeleteProduct } from '../../store/actions/index';
import styles from "../utilities/styles";
import history from "../../history";

const DeleteUser = (props) => {
    const { startAdminDeleteProduct, startAdminGetProductToBeDeleted, productToBeDeleted } = props;

    useEffect(() => {
        startAdminGetProductToBeDeleted(props.match.params.id);
    }, [startAdminGetProductToBeDeleted, props.match.params.id]);

    const closeModal = () => {
        history.push(`/admin/products`);
    };

    const deleteProduct = (productId) => {
        startAdminDeleteProduct(productId);
    }

    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active" onClick={closeModal}>
            <div className="ui standard modal visible active" onClick={(event => event.stopPropagation())}>
                <div className="header">Delete Product</div>
                <div className="content header"> Are you sure you want delete <strong style={{textDecorationLine: 'underline'}}>{productToBeDeleted.name}</strong> ?</div>
                <div className="actions">
                    <button onClick={() => deleteProduct(props.match.params.id)} style={styles.marginBottom} className="ui negative button right floated">Delete</button>
                    <button onClick={closeModal} style={styles.marginBottom} className="ui button right floated">Cancel</button>
                </div>
            </div>
        </div>,
        document.querySelector('#productModal')
    );
};

const mapStateToProps = (state) => {
    return {
        productToBeDeleted: state.admin.productToBeDeleted
    }
}

export default connect(mapStateToProps, { startAdminGetProductToBeDeleted, startAdminDeleteProduct } )(DeleteUser);