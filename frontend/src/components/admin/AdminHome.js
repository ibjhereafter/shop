import React, { Fragment } from "react";

import Users from "./Users";


const AdminHome = () => {
    document.title = 'Admin | Shop';
    return (
        <Fragment>
            <Users />
        </Fragment>
    )
};

export default AdminHome;