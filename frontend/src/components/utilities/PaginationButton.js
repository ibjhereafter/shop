import './PaginationButton.css';
import '../layout/Footer.css';
import React, {Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

const PaginationButton = (props) => {
    const [numberOfProductsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(1);
    const [numberOfButtons, setNumberOfButtons] = useState([]);
    const { totalProducts, onPageClick } = props;


    useEffect(() => {
        if (totalProducts > 0) {
            setTotalPages(Math.ceil(totalProducts / numberOfProductsPerPage));
        }
        const totalButtons = [ ...Array(totalPages).keys()];
        setNumberOfButtons([...totalButtons]);

    }, [totalProducts, numberOfProductsPerPage, totalPages]);

    const buttons = numberOfButtons.map((button) => {
        return button + 1
    });

    const pages = buttons.map((page) => {
        return (
            <button
                className="ui grey button"
                autoFocus={ page? page === 1 : null}
                onClick={() => onPageClick(page)}
                key={page}>{page}
            </button>
        );
    });


    return (
        <Fragment>
            <div style={{marginTop: '20px'}} className="ui container centerElement">{pages}</div>

        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        totalProducts: state.products.totalProducts,
        products: state.products.products,
    }
}

export default connect(mapStateToProps)(PaginationButton);
