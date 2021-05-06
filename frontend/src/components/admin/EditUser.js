import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import Styles from "../utilities/styles";
import { startAdminGetUserProfileToBeEdited, startAdminEditUserProfile } from '../../store/actions/index';

const EditUser = (props) => {
    document.title = 'Admin Edit User | Shop';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState('');
    const { startAdminGetUserProfileToBeEdited, userToBeEdited, startAdminEditUserProfile } = props;

    useEffect(() => {
        if (props.match.params.id) {
            startAdminGetUserProfileToBeEdited(props.match.params.id);
        }
    }, [props.match.params.id, startAdminGetUserProfileToBeEdited]);

    useEffect(() => {
        if (userToBeEdited.name) {
            setName(userToBeEdited.name);
            setEmail(userToBeEdited.email)
            setAdmin(userToBeEdited.isAdmin)
        }
    }, [userToBeEdited]);

    const onFormSubmit = (event) => {
        let isAdmin = false;
        event.preventDefault();
        if (String(admin) === 'true') {
            isAdmin = true;
        }

        const edit = {
            name,
            email,
            isAdmin
        };

        startAdminEditUserProfile(props.match.params.id, edit);

    }



    return(
        <Fragment>
            <div className="ui stackable grid container">
                <div className="sixteen wide column">
                    <div className="column">
                        <h1 className="ui header">EDIT USER</h1>
                        <form className="ui form" onSubmit={onFormSubmit}>
                            <div className="field">
                                <label className="label">Full Name</label>
                                <input type="text"
                                       value={name}
                                       placeholder="Please, enter your full name."
                                       onChange={(event => setName(event.target.value))}
                                       style={Styles.marginBottom}
                                />
                                <label className="label">Email Address</label>
                                <input type="email"
                                       value={email}
                                       onChange={(event => setEmail(event.target.value))}
                                       placeholder="Please, enter a valid email address."
                                       style={Styles.marginBottom}
                                />

                                <label className="label">Is Admin ? (<strong>true or false</strong>)</label>
                                <input type="text"
                                       value={admin}
                                       placeholder="Is this user an admin or Not?"
                                       onChange={(event => setAdmin(event.target.value.toLowerCase()))}
                                />

                            </div>

                            <div className="centerElement" style={{width: '250px'}}>
                                <button style={Styles.marginBottom} className="fluid ui black button">EDIT USER</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        userToBeEdited: state.admin.singleUserToBeEdited
    }
}

export default connect(mapStateToProps, { startAdminGetUserProfileToBeEdited, startAdminEditUserProfile })(EditUser);