import React, { Fragment } from "react";

import AdminHomePageHeader from "../layout/AdminHomePageHeader";
import Users from "./Users";

const AdminHome = () => {
    document.title = 'Admin | Shop';
    return (
        <Fragment>
            <AdminHomePageHeader />
            <Users />
        </Fragment>
    )
};

export default AdminHome;