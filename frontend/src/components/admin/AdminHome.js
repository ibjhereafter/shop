import React, { Fragment } from "react";

import AdminHomePageHeader from "../layout/AdminHomePageHeader";
import Users from "./Users";

const AdminHome = () => {
    return (
        <Fragment>
            <AdminHomePageHeader />
            <Users />
        </Fragment>
    )
};

export default AdminHome;