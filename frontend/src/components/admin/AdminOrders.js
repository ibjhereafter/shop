import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

import AdminHomePageHeader from "../layout/AdminHomePageHeader";
import Loader from "../utilities/Loader";
import Error from "../utilities/Error";
import { startAdminGetAllOrders } from "../../store/actions";
import { Link } from "react-router-dom";

const AdminOrders = (props) => {
    document.title = 'Admin | Orders | Shop';
    const { startAdminGetAllOrders, orders, loading, error } = props;
    useEffect(() => {
        startAdminGetAllOrders();
    }, [startAdminGetAllOrders]);
    return (
        <Fragment>
            <AdminHomePageHeader />
            <h1 className='ui container'>ORDERS</h1>
            <div className="ui stackable grid container">
                <div className="sixteen wide column">
                    <div className="column">
                        {
                            loading && <Loader />
                        }
                        {
                            error ? <Error /> : (
                                <Fragment>
                                    <table className="ui celled table">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>USER</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th>{}</th>
                                        </tr>
                                        </thead>
                                        {
                                            orders.map((order) => {
                                                return(
                                                    <Fragment key={order._id}>
                                                        <tbody>
                                                        <tr>
                                                            <td>{order._id}</td>
                                                            <td>{order.user.name}</td>
                                                            <td>{order.createdAt.substr(0, 10)}</td>
                                                            <td>${order.totalPrice.toFixed(2)}</td>
                                                            <td>{order.isPaid && order.paymentResult.update_time.substr(0, 10)}</td>
                                                            <td>{order.isDelivered ?
                                                                <i style={{color: 'green'}} className="check circle icon">{}</i> :
                                                                (<i className="x icon">{}</i>)}
                                                            </td>

                                                            <td>
                                                                <Link to={{pathname:`/orders/${order._id}/details`, data: order._id}}>
                                                                    <button className="ui black button" type="button">Details</button>
                                                                </Link>

                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </table>
                                </Fragment>
                            )
                        }

                    </div>
                </div>
            </div>

        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        loading: state.admin.allOrders.loading,
        error: state.admin.allOrders.error,
        orders: state.admin.allOrders.allOrders
    }
};

export default connect(mapStateToProps, { startAdminGetAllOrders })(AdminOrders);