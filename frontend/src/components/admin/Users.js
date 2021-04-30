import React, {Fragment, useEffect, useState} from "react";
import { connect } from "react-redux";

import { startGetAdminUsers, logOut, startAdminDeleteUser, resetDeleteUserMessage } from '../../store/actions/index';
import Loader from "../utilities/Loader";
import Error from "../utilities/Error";
import history from "../../history";

const Users = (props) => {
    const [showDeleteUserMessage, setShowDeleteUserMessage] = useState('hidden');
    const { startGetAdminUsers, loading, error, users, user, logOut, deleteUserMessage  } = props;
    useEffect(() => {
        if (user && user.isAdmin) {
            resetDeleteUserMessage('');
            startGetAdminUsers();
        } else {
            logOut();
            localStorage.removeItem('user');
            history.push('/users/login');
        }

    }, [loading, logOut, startGetAdminUsers, user]);

    useEffect(() => {
        if (deleteUserMessage) {
            setShowDeleteUserMessage('visible');
        }
    }, [deleteUserMessage]);

    const onDeleteIconClick = (userId) => {
      if (userId) {
          history.push(`/admin/users/${userId}/delete`);
      }
    };

    const onEditIconClick = (userId) => {
        if (userId) {
            history.push(`/admin/users/${userId}/edit`);
        }
    }

    return (
        <Fragment>
            <div className="ui stackable grid container">
                <div className="sixteen wide column">
                    <h2 className="header">USERS</h2>
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
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>ADMIN</th>
                                            <th>{}</th>
                                            <th>{}</th>
                                        </tr>
                                        </thead>
                                        {
                                            users.map((user) => {
                                                return(
                                                    <Fragment key={user._id}>
                                                        <tbody>
                                                            <tr>
                                                                <td>{user._id}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.isAdmin ? (<i style={{color: 'green'}} className="check circle icon">{}</i>) : (
                                                                    <i className="x icon">{}</i>)}
                                                                </td>
                                                                <td>
                                                                    <button onClick={() => onEditIconClick(user._id)}>
                                                                        <i className="edit icon">{}</i>
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <button onClick={() => onDeleteIconClick(user._id)}>
                                                                        <i style={{color: 'red'}} className="trash icon">{}</i>
                                                                    </button>
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
            <p className={`ui red ${showDeleteUserMessage} message container header`}>{deleteUserMessage}</p>
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        loading: state.admin.users.loading,
        error: state.admin.users.error,
        deleteUserMessage: state.admin.deleteUserMessage,
        users: state.admin.users.users,
        user: state.authentication.user
    }
};

export default connect(mapStateToProps, { startGetAdminUsers, logOut, startAdminDeleteUser, resetDeleteUserMessage })(Users);