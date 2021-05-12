import '../layout/Footer.css'
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Styles from "../utilities/styles";
import pattern from "../utilities/RegexPattern";
import { startRegister, resetRegistrationMessage } from '../../store/actions/index';

const Register = (props) => {
    document.title = 'New User Registration | Shop';
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [showNameErrorMessage, setShowNameErrorMessage] = useState('hidden');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('hidden');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState('hidden');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showConfirmPasswordErrorMessage, setShowConfirmPasswordErrorMessage] = useState('hidden');
    const [picture, setPicture] = useState();
    const [previewSource, setPreviewSource] = useState();

    const [formError, setFormError] = useState('');
    const [showFormError, setShowFormError] = useState('hidden');

    const [showRegistrationErrorMessage, setShowRegistrationErrorMessage] = useState('hidden');

    const { startRegister, resetRegistrationMessage, registrationMessage } = props;

    useEffect(() => {
        if (registrationMessage) {
            setShowRegistrationErrorMessage('visible');
        }

    }, [registrationMessage]);

    useEffect(() => {
        resetRegistrationMessage('');
        setShowRegistrationErrorMessage('hidden');

    }, [resetRegistrationMessage, setShowRegistrationErrorMessage]);

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

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setConfirmPasswordError('Confirm Password must match password exactly!');
            setShowConfirmPasswordErrorMessage('visible');
            setTimeout(() => {
                setConfirmPasswordError('Confirm Password must match password exactly!');
                setShowConfirmPasswordErrorMessage('hidden');
            }, 3000);
        }

        if (email.match(pattern.email) && password.match(pattern.password) && name.match(pattern.name)) {
            const newUser = {
                name,
                email,
                password
            };

            startRegister(newUser, previewSource);

        } else {
            setFormError('Please check to confirm that each field is filled correctly!');
            setShowFormError('visible');
        }

    };

    const onNameChange = (event) => {
        setName(event.target.value);
        if (!name.match(pattern.name)) {
            setNameError('You name must have at least two characters!');
            setShowNameErrorMessage('visible');
        } else {
            setNameError('');
            setShowNameErrorMessage('hidden');

        }
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
        if (!email.match(pattern.email)) {
            setEmailError('Please, enter a valid email address.');
            setEmailErrorMessage('visible');
        } else {
            setEmailError('');
            setEmailErrorMessage('hidden');
        }
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
        if (!password.match(pattern.password)) {
            setPasswordError('Your password must be at least six characters long. Optionally, you can include special characters( * & # @ _ -).');
            setShowPasswordErrorMessage('visible');
        } else {
            setPasswordError('');
            setShowPasswordErrorMessage('hidden');
        }
    };

    return (
        <div className="ui stackable grid container">
            <div className="sixteen wide column">
                <div className="column">
                    <h1 className="ui header">SIGN UP</h1>
                    <form className="ui form" onSubmit={onFormSubmit}>
                        <div className="field">
                            <label className="label">Full Name</label>
                            <input type="text"
                                   value={name}
                                   onChange ={onNameChange}
                                   placeholder="Please, enter your full name."
                                   style={Styles.marginBottom}
                            />
                            <p className={`ui red ${showNameErrorMessage} message`}>{nameError}</p>

                            <label className="label">Email Address</label>
                            <input type="email"
                                   value={email}
                                   onChange={onEmailChange}
                                   placeholder="Please, enter a valid email address."
                                   style={Styles.marginBottom}
                            />
                            <p className={`ui red ${emailErrorMessage} message`}>{emailError}</p>

                            <label className="label">Password</label>
                            <input type="password"
                                   value={password}
                                   onChange={onPasswordChange}
                                   placeholder="Please, enter your password."
                                   style={Styles.marginBottom}
                            />
                            <p className={`ui red ${showPasswordErrorMessage} message`}>{passwordError}</p>

                            <label className="label">ConfirmPassword</label>
                            <input type="password"
                                   value={confirmPassword}
                                   placeholder="Please, confirm your password"
                                   onChange={(event => setConfirmPassword(event.target.value))}
                                   style={Styles.marginBottom}
                            />
                            <p className={`ui red ${showConfirmPasswordErrorMessage} message`}>{confirmPasswordError}</p>

                            <label className="label">
                                <input type="file"
                                       onChange={(event => setPicture(event.target.files[0]))}
                                />
                            </label>
                        </div>
                        <div className="centerElement" style={{width: '250px'}}>
                            <button style={Styles.marginBottom} className="fluid ui black button">Sign Up</button>
                        </div>
                    </form>
                    <p className={`ui red ${showFormError} message header`}>{formError}</p>
                    <p className={`ui red ${showRegistrationErrorMessage} message header`}>{registrationMessage}</p>
                    { previewSource && (
                        <img src={previewSource} alt="chosen"
                             width="180px"/>
                    )}
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        registrationMessage: state.newUser.registrationMessage
    }
}

export default connect(mapStateToProps, { startRegister, resetRegistrationMessage })(Register);