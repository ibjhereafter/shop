import '../layout/Footer.css'
import React, { useEffect, useState, Fragment } from "react";
import { connect } from 'react-redux';
import history from "../../history";
import Styles from "../utilities/styles";
import { startUpdateProfile } from '../../store/actions/index';

const UpdateProfile = (props) => {
    document.title = 'Update Procfile | Shop';
    const { userProfile, loggedInUser, startUpdateProfile } = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState();
    const [previewSource, setPreviewSource] = useState();

    useEffect(() => {
        if (!loggedInUser.name) {
            history.push('/users/login');
        } else {
            setName(userProfile.name);
            setEmail(userProfile.email)
        }

    }, [loggedInUser, userProfile]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', picture);
        const update = {
            name,
            email
        };

        startUpdateProfile(update, data);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    useEffect(() => {
        if (picture) {
            previewFile(picture)
        }
    }, [picture]);

    return (
        <Fragment>
            <div className="ui grid container">
                <div className="sixteen wide column">
                    <div className="column">
                        <form className="ui form" onSubmit={onFormSubmit}>
                            <div className="field">
                                <label className="label">Full Name</label>
                                <input type="text"
                                       value={name}
                                       onChange={(event => setName(event.target.value))}
                                       placeholder="Please, enter your full name."
                                       style={Styles.marginBottom}
                                       autoFocus
                                />

                                <label className="label">Email Address</label>
                                <input type="email"
                                       value={email}
                                       onChange={(event => setEmail(event.target.value))}
                                       placeholder="Please, enter a valid email address."
                                       style={Styles.marginBottom}
                                />

                                <label className="label">
                                    <input type="file"
                                           accept="image/*"
                                           onChange={(event => setPicture(event.target.files[0]))}
                                    />
                                </label>
                                <div style={{width: '250px'}} className="centerElement">
                                    <button type="submit" className="fluid ui black button">UPDATE</button>
                                </div>
                            </div>
                        </form>
                        { previewSource && (
                            <img src={previewSource} alt="chosen"
                            width="180px"/>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfile: state.userProfile,
        loggedInUser: state.authentication.user
    }
};

export default connect(mapStateToProps, { startUpdateProfile })(UpdateProfile);