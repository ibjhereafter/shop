import React, { Fragment } from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import history from "../../history";

import { startLogOut } from '../../store/actions/index';

const Header = (props) => {
    const { user, startLogOut } = props;

    const onProfileClick = () => {
        history.push(`/users/${user._id}`);
    };

    const onLogOutClick = () => {
        startLogOut();
    }

    const adminDashboard = () => {
        if (user.isAdmin) {
            return (
                <Link to="/admin">
                    <div style={{color: 'black'}}>Dashboard</div>
                </Link>
            )

        } else {
            return (
                <div>{}</div>
            )
        }
    }

    const userOrLogin = () => {
        if (user.name) {
            return (
                <Fragment>
                    <div className="ui simple dropdown">
                        {user.name.toUpperCase()}
                        <i className='dropdown icon'>{}</i>
                        <div className="menu">
                            <div style={{width: '210px', color: 'black'}} className="item" onClick={onProfileClick}>Profile</div>
                            <div className="item black" onClick={onLogOutClick}>Log Out</div>
                            <div className="item">{adminDashboard()}</div>
                        </div>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Link to="/users/login">
                            <i className="user icon">{}</i>
                            Login
                    </Link>
                </Fragment>
            )
        }
    };

    return (
        <Fragment>
            <nav style={{marginBottom: '0px'}}>
                <div className="ui stackable grid">
                    <div className="ui sixteen column">
                        <div className="ui inverted segment">
                            <div className="ui stackable inverted huge secondary pointing menu container">
                                <div className="left menu">
                                    <Link to="/">
                                        <div className="active item">
                                            ProShop
                                        </div>
                                    </Link>
                                </div>

                                <div className="right menu">
                                    <div className="item stackable">
                                        <Link to="/cart">
                                            <div className="item">
                                                <i className="shopping cart icon">{}</i>
                                                <div>Shopping Cart</div>
                                            </div>
                                        </Link>
                                        {userOrLogin()}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
            </nav>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user
    }
}

export default connect(mapStateToProps, { startLogOut })(Header);