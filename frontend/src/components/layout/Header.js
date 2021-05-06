import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import history from "../../history";
import SearchBar from "../products/SearchBar";

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
                    <div className="ui simple dropdown stackable">
                        <div className="ui stackable" style={{marginRight: '20px', width: '200px'}}>
                            {user.name.toUpperCase()}
                            <i className='dropdown icon'>{}</i>
                        </div>

                        <div className="menu stackable">
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
                            LOGIN
                    </Link>
                </Fragment>
            )
        }
    };

    return (
        <Fragment>
            <nav style={{marginBottom: '0px'}}>
                <div className="ui stackable grid">
                    <div className="ui sixteen column stackable">
                        <div className="ui inverted segment stackable">
                            <div className="ui stackable inverted huge secondary pointing menu container">
                                <div className="left menu">
                                    <Link to="/">
                                        <div className="active item">
                                            ProShop
                                        </div>
                                    </Link>
                                </div>

                                <div className="ui five item menu stackable">
                                    <div className="item">{}</div>
                                    <div style={{width: '450px'}} className="item">
                                        <SearchBar />
                                    </div>

                                    <div className="item">
                                        <Link to="/cart">
                                            <i className="shopping cart icon">{}</i>
                                                SHOPPING CART
                                        </Link>
                                    </div>

                                        {userOrLogin()}
                                    <div className="item">{}</div>

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