import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

import { startAdminDeleteUser, startAdminGetUserProfileToBeDeleted } from '../../store/actions/index';
import styles from "../utilities/styles";
import history from "../../history";

const DeleteUser = (props) => {
    const { startAdminDeleteUser, startAdminGetUserProfileToBeDeleted, singleUser } = props;

    useEffect(() => {
        startAdminGetUserProfileToBeDeleted(props.match.params.id);
    }, [startAdminGetUserProfileToBeDeleted, props.match.params.id]);

    const closeModal = () => {
        history.push(`/admin`);
    };

    const deleteUser = (userId) => {
        startAdminDeleteUser(userId);
    }

    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active" onClick={closeModal}>
            <div className="ui standard modal visible active" onClick={(event => event.stopPropagation())}>
                <div className="header">Delete User</div>
                <div className="content header"> Are you sure you want delete <strong style={{textDecorationLine: 'underline'}}>{singleUser.name && singleUser.name}</strong> ?</div>
                <div className="actions">
                    <button onClick={() => deleteUser(props.match.params.id)} style={styles.marginBottom} className="ui negative button right floated">Delete</button>
                    <button onClick={closeModal} style={styles.marginBottom} className="ui button right floated">Cancel</button>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

const mapStateToProps = (state) => {
    return {
        singleUser: state.admin.singleUser
    }
}

export default connect(mapStateToProps, { startAdminDeleteUser, startAdminGetUserProfileToBeDeleted } )(DeleteUser);