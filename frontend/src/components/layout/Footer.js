import './Footer.css'
import React, { Fragment } from 'react';

const Footer = () => {
    return (
        <Fragment>

            <div className="ui grid">
                <div className="ui sixteen column">
                    <footer>
                        <div className="ui container">
                            <div className="centerElement">Copyright &copy; All Rights Reserved - ProShop</div>
                        </div>
                    </footer>
                </div>
            </div>

        </Fragment>
    );
};

export default Footer;