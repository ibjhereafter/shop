import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AdminHomePageHeader = () => {
    return (
        <Fragment>
            <nav style={{marginTop: '0px'}}>
                <div className="ui stackable grid">
                    <div className="ui sixteen column">
                        <div className="ui fluid three item menu">
                            <div className="item">
                                <Link to="/admin">ORDERS</Link>
                                </div>

                                <div className="item">
                                    <Link to="/list/products">PRODUCTS</Link>
                                </div>

                                <div className="item">
                                    <Link to="/users/admin/list">USERS</Link>
                                </div>
                        </div>
                    </div>

                </div>
            </nav>

        </Fragment>)
}

export default AdminHomePageHeader;