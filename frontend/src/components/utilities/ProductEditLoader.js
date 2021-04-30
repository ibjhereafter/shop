import './Loader.css'
import React, { Fragment } from 'react';

const ProductEditLoader = () => {
    return (
        <Fragment>
            <div className="ui grid">
                <div className="ui sixteen column">

                    <div className="ui segment">
                        <div className="increaseSize">
                            <div className="ui active dimmer increaseSize">
                                <div className="ui massive text loader">PRODUCT IS BEING UPDATED ...</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>


    );
};

export default ProductEditLoader;