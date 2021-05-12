import React, { Fragment } from "react";

import AdminHomePageHeader from "../layout/AdminHomePageHeader";
import Users from "./Users";
import AdminOrders from "./AdminOrders";
import Styles from '../utilities/styles';

const AdminHome = () => {
    document.title = 'Admin | Shop';
    return (
        <Fragment>
                <AdminOrders />
        </Fragment>
    )
};

export default AdminHome;