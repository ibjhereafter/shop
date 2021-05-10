import React, { Fragment, useState,useEffect } from "react";
import { connect } from "react-redux";

import Styles from "../utilities/styles";

import { startAdminGetProductToBeEdited, startAdminEditProduct } from '../../store/actions/index';
import ProductEditLoader from "../utilities/ProductEditLoader";
import history from "../../history";

const EditProduct = (props) => {
    document.title = 'Admin Edit Product | Shop';
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState();
    const [previewSource, setPreviewSource] = useState();
    const [productEditLoader, setProductEditLoader] = useState(false);

    const { startAdminGetProductToBeEdited, startAdminEditProduct, productToBeEdited } = props;

    useEffect(() => {
        if (props.match.params.id) {
            startAdminGetProductToBeEdited(props.match.params.id);
        } else {
            history.push('/users/login');
        }

    }, [props.match.params.id, startAdminGetProductToBeEdited]);

    useEffect(() => {
        if (productToBeEdited.name) {
            setName(productToBeEdited.name);
            setPrice(productToBeEdited.price);
            setBrand(productToBeEdited.brand);
            setStock(productToBeEdited.stock);
            setCategory(productToBeEdited.category);
            setDescription(productToBeEdited.description);
        }

    }, [productToBeEdited]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', picture);
        const edit = {
            name,
            price,
            brand,
            stock,
            category,
            description
        };
        setProductEditLoader(true);

        startAdminEditProduct(props.match.params.id, data, edit);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    };

    useEffect(() => {
        if (picture) {
            previewFile(picture)
        }
    }, [picture]);

    return (
        <Fragment>
            {
                productEditLoader ? <ProductEditLoader /> : (<div className="ui stackable grid container">
                    <div className="sixteen wide column">
                        <div className="column">
                            <h1 className="ui header">EDIT PRODUCT</h1>
                            <form className="ui form" onSubmit={onFormSubmit}>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <input type="text"
                                           value={name}
                                           onChange={(event => setName(event.target.value))}
                                           placeholder="Please, enter the name of the product."
                                           style={Styles.marginBottom}
                                           autoFocus
                                    />

                                    <label className="label">Price</label>
                                    <input type="number"
                                           value={price}
                                           onChange={(event => setPrice(event.target.value))}
                                           placeholder="Please, enter the price for the product."
                                           style={Styles.marginBottom}
                                    />

                                    <label className="label">Brand</label>
                                    <input type="text"
                                           value={brand}
                                           onChange={(event => setBrand(event.target.value))}
                                           placeholder="Please, enter the brand of the product."
                                           style={Styles.marginBottom}
                                    />

                                    <label className="label">Count In Stock</label>
                                    <input type="number"
                                           value={stock}
                                           onChange={(event => setStock(event.target.value))}
                                           placeholder="Please, enter the total available stock of the product."
                                           style={Styles.marginBottom}
                                    />
                                    <label className="label">Category</label>
                                    <input type="text"
                                           value={category}
                                           onChange={(event => setCategory(event.target.value))}
                                           placeholder="Please, enter the brand of the product."
                                           style={Styles.marginBottom}
                                    />
                                    <label className="label">Description</label>
                                    <input type="text"
                                           value={description}
                                           onChange={(event => setDescription(event.target.value))}
                                           placeholder="Please, enter a clear description of the product."
                                           style={Styles.marginBottom}
                                    />
                                    <label className="label">Image</label>
                                    <input type="file"
                                           accept="image/*"
                                           onChange={(event => setPicture(event.target.files[0]))}
                                           placeholder="Please, enter a clear description of the product."
                                           style={Styles.marginBottom}
                                    />
                                </div>
                                <div className="centerElement" style={{width: '250px'}}>
                                    <button style={Styles.marginBottom} className="fluid ui black button">EIDT PRODUCT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>)
            }

            { previewSource && (
                <div className="ui container">
                    <img src={previewSource} alt="chosen"
                         width="180px"/>
                </div>
            )}

        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        productToBeEdited: state.admin.productToBeEdited
    }
};

export default connect(mapStateToProps, { startAdminGetProductToBeEdited, startAdminEditProduct } )(EditProduct);