import './Loader.css'
import React, { Fragment } from 'react';

const Loader = () => {
    return (
        <Fragment>
            <div className="ui grid">
                <div className="ui sixteen column">

                    <div className="ui segment">
                        <div className="increaseSize">
                            <div className="ui active dimmer increaseSize">
                                <div className="ui massive text loader">Loading</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>


    );
};

export default Loader;