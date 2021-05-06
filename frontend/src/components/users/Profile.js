import React, {useEffect, Fragment } from "react";
import { connect } from 'react-redux';
import history from "../../history";

import { startGetUserProfile, startGetUserMyOrders, startUploadProfileImage } from '../../store/actions/index';
import Loader from "../utilities/Loader";
import Error from "../utilities/Error";
import { Link } from "react-router-dom";

const Profile = (props) => {
    document.title = 'Procfile & Orders | Shop';
    const { startGetUserProfile, userProfile, user, startGetUserMyOrders, userOrders, loading, error } = props;

    useEffect(() => {
        if (user.name) {
            startGetUserProfile();
        } else {
            history.push('/users/login');
        }

    }, [user, startGetUserProfile]);

    useEffect(() => {
        if (user.name) {
            startGetUserMyOrders();
        } else {
            history.push('/users/login');
        }
    }, [user, startGetUserMyOrders]);

    const onUpdateClick = () => {
        history.push('/users/update/profile');
    }

    return (
        <Fragment>
            <div className="ui stackable grid container">
                    <div className="four wide column">
                        <div className="column">
                            <h1 className="ui header">{userProfile.name}</h1>

                            <img src={`https://jalloh-proshop.s3.eu-central-1.amazonaws.com/${userProfile.image}`}
                                 alt={userProfile.name}
                                 width="180px"
                            />
                            <h3>{userProfile.email}</h3>
                            <div>
                                <button onClick={onUpdateClick} className="ui black button">UPDATE PROFILE</button>
                            </div>
                        </div>
                    </div>
                    <div className="twelve wide column">
                        <div className="column">
                            <h1 className="ui headers">ORDERS</h1>
                            {
                                loading && <Loader />
                            }
                            {
                                error ? <Error /> : (
                                    userOrders.map((order) => {
                                        return (
                                            <Fragment key={order._id}>
                                                <table className="ui celled table">
                                                    <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>DATE</th>
                                                        <th>TOTAL</th>
                                                        <th>PAID</th>
                                                        <th>DELIVERED</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td data-label="Id">{order._id}</td>
                                                        <td data-label="Date">{order.createdAt.substr(0, 10)}</td>
                                                        <td data-label="Total">$ {order.totalPrice.toFixed(2)}</td>
                                                        <td data-label="Paid">{order.isPaid ? order.paymentResult.update_time.substr(0, 10) : (<div className="ui red visible message">Not paid</div>)}</td>
                                                        <td data-label="Delivered">{order.isDelivered ? <div className="ui visible green message">Delivered</div> : (<div className="ui red visible message">Not Delivered</div>)}</td>
                                                        <td>
                                                            <Link to={`/orders/${order._id}`}>
                                                                <button className="ui black button">Order Details</button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <hr/>
                                            </Fragment>
                                        )
                                    }))
                            }
                        </div>
                    </div>

                </div>)

        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfile: state.userProfile,
        user: state.authentication.user,
        userOrders: state.order.userOrders,
        loading: state.order.loading,
        error: state.order.error,
        errorMessage: state.order.errorMessage
    }
};

export default connect(mapStateToProps, { startGetUserProfile, startGetUserMyOrders, startUploadProfileImage })(Profile);