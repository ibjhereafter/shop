import React, { Fragment } from "react";
import ProductList from "./products/ProductList";

const HomePage = () => {
    document.title = 'Welcome to Shop';
    return (
        <Fragment>
            <ProductList />
        </Fragment>
    )
};

export default HomePage;