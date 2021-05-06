import '../layout/Footer.css'
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import Styles from '../utilities/styles';
import history from "../../history";
import { startLogIn } from '../../store/actions/index';
import {Link} from "react-router-dom";


const LogIn = (props) => {
    document.title = 'Login | Shop';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [showFormError, setShowFormError] = useState('hidden');
    const [showLoginError, setShowLoginError] = useState('hidden');
    const { startLogIn, login, error, loginMessage } = props;

    useEffect(() => {
        if (login) {
            history.push('/');
        }

    }, [login]);

    useEffect(() => {
        if (error) {
            setShowLoginError('visible')
        }
    }, [error]);


    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setFormError('Please, enter both your email and password.');
            setShowFormError('visible');
        }

        const userCredentials = {
            email,
            password
        }

        startLogIn(userCredentials);
    }

    return (
        <Fragment>
            <div className="ui stackable grid container">
                <div className="sixteen wide column">
                    <div className="column">
                        <h1 className="header">LOG IN</h1>
                            <form className="ui form" onSubmit={onFormSubmit}>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <input style={Styles.marginBottom}
                                           type="email"
                                           value={email}
                                           onChange={(event) => setEmail(event.target.value)}
                                    />

                                    <label className="label">Password</label>
                                    <input style={Styles.marginBottom}
                                           type="password"
                                           value={password}
                                           onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <div style={{width: '250px'}} className="centerElement">
                                        <button type="submit" className="ui fluid black button">Log In</button>
                                    </div>
                                </div>
                            </form>
                        <div className={`ui ${showFormError} red message header`}>{formError}</div>
                        <div className={`ui ${showLoginError} red message header`}>{loginMessage}</div>
                        <p className="ui header">New Customer ? <Link to="/users/register">Sign Up</Link></p>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        login: state.authentication.login,
        error: state.authentication.error,
        loginMessage: state.authentication.loginMessage,
        user: state.authentication.user
    }
}

export default connect(mapStateToProps, { startLogIn })(LogIn);