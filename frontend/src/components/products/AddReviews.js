import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import Styles from '../utilities/styles';
import { startCreateProductReview, startGetProductDetails } from '../../store/actions/index';

const AddReview = (props) => {
    const [rating, setRating] = useState();
    const [comment, setComment] = useState('');
    const [formError, setFormError] = useState('');
    const [showFormError, setShowFormError] = useState('hidden');
    const { startCreateProductReview, startGetProductDetails, error, errorMessage, product, match } = props;

    useEffect(() => {
        if (match.params.id) {
            startGetProductDetails(match.params.id);
        }
    }, [startGetProductDetails, match]);



    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!rating || !comment) {
            setFormError('Please, ensure that you have filled both the rating and comment fields correctly.');
            setShowFormError('visible');
        } else {
            const newRating = {
                rating: Number(rating),
                comment
            };

            startCreateProductReview(match.params.id, newRating);
        }
    };

    return (
        <Fragment>
            <div className="ui stackable grid container">
                <div className="ui sixteen wide column">
                    <div className="column">
                        <h1>WRITE A PRODUCT REVIEW</h1>
                        {
                            error ? <div style={Styles.marginTop} className="ui red visible message header">{errorMessage}</div> : null
                        }
                        {
                            product.name ? (<Fragment>
                                <div className="ui header">{product.name}</div>
                                <img style={Styles.marginBottom} src={`https://jalloh-proshop.s3.eu-central-1.amazonaws.com/${product.image}`}
                                     alt={product.description}
                                     width="300"
                                     height="300"
                                />
                            </Fragment>) : null
                        }
                        <br/>
                        <form style={Styles.marginTop} className="ui form" onSubmit={onFormSubmit}>
                            <div className="field">
                                <label className="label">Rating</label>
                                <select onChange={(event => setRating(event.target.value))} style={Styles.marginBottom} name="rating">
                                    <option value="">Select Rating</option>
                                    <option value="1">1 - POOR</option>
                                    <option value="2">2 - FAIR</option>
                                    <option value="3">3 - GOOD</option>
                                    <option value="4">4 - VERY GOOD</option>
                                    <option value="5">5 - EXCELLENT</option>
                                </select>
                                <label style={Styles.marginTop} className="label">Comment</label>
                                <textarea style={Styles.marginBottom} onChange={event => setComment(event.target.value)} cols="30" rows="10">{}</textarea>

                                <button style={Styles.marginTop} type="submit" className="ui black button">ADD COMMENT</button>

                            </div>
                        </form>
                        <div className={`ui red ${showFormError} message header`}>{formError}</div>

                    </div>
                </div>

            </div>
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        error: state.reviews.error,
        errorMessage: state.reviews.errorMessage,
        product: state.productDetails.product
    }
}

export default connect(mapStateToProps, { startCreateProductReview, startGetProductDetails })(AddReview);