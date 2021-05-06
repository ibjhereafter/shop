import React, {Fragment, useEffect, useState} from "react";
import { connect } from "react-redux";

import Styles from "../utilities/styles";
import { startAdminCreateProduct } from '../../store/actions/index';
import ProductCreationLoader from "../utilities/ProductCreationLoader";

const CreateProduct = (props) => {
    document.title = 'Admin Create Product | Shop';
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState();
    const [previewSource, setPreviewSource] = useState();
    const [productCreationLoader, setProductCreationLoader] = useState(false);

    const [formError, setFormError] = useState('');
    const [showFormError, setShowFormError] = useState('hidden');

    const { startAdminCreateProduct } = props;

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    };


    useEffect(() => {
        if (picture) {
            previewFile(picture);
        }
    }, [picture]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!name || !price || !brand || !stock || !category || !description || !picture) {
            const formError = 'Please, check to conform that all the fields have been correctly field.';
            setFormError(formError);
            setShowFormError('visible');
        } else {
            const newProduct = {
                name,
                price,
                brand,
                stock,
                category,
                description
            }

            const contentType = picture.type;
            const fileType = picture.type.substr(6);

            const config = {
                contentType,
                fileType
            };

            startAdminCreateProduct(newProduct, picture, config);

            setFormError('');
            setShowFormError('hidden');
            setProductCreationLoader(true);
        }

    };

    return (
        <Fragment>
            {
                productCreationLoader ? <ProductCreationLoader /> : (  <div className="ui stackable grid container">
                    <div className="sixteen wide column">
                        <div className="column">
                            <h1 className="ui header">CREATE PRODUCT</h1>
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
                                    <button style={Styles.marginBottom} className="fluid ui black button">CREATE PRODUCT</button>
                                </div>
                            </form>
                            <p className={`ui red ${showFormError} message header`}>{formError}</p>
                        </div>
                    </div>

                </div>)
            }
            {
                previewSource && (
                    <div className="ui container">
                        <img src={previewSource}
                             alt="chosen"
                             width="180px"
                        />
                    </div>
                )
            }

        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        createProductError: state
    }
};

export default connect(mapStateToProps, { startAdminCreateProduct })(CreateProduct);