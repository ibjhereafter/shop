import './Loader.css'
import React, { Fragment } from 'react';

const ProductCreationLoader = () => {
    return (
        <Fragment>
            <div className="ui grid">
                <div className="ui sixteen column">

                    <div className="ui segment">
                        <div className="increaseSize">
                            <div className="ui active dimmer increaseSize">
                                <div className="ui massive text loader">PRODUCT IS BEING CREATED ...</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>


    );
};

export default ProductCreationLoader;