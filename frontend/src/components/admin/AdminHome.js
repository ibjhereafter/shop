import React, { Fragment } from "react";

import AdminOrders from "./AdminOrders";


const AdminHome = () => {
    document.title = 'Admin | Shop';
    return (
        <Fragment>
                <AdminOrders />
        </Fragment>
    )
};

export default AdminHome;