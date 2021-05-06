import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { startGetAllProducts } from '../../store/actions/index';
import history from "../../history";

const SearchBar = (props) => {
    const [keyword, setKeyword] = useState('');
    const { startGetAllProducts } = props;

    useEffect(() => {
        startGetAllProducts(keyword);
    }, [keyword, startGetAllProducts])

    useEffect(() => {
        if (keyword) {
            startGetAllProducts(keyword);
        } else {
            startGetAllProducts();
        }
    }, [keyword, startGetAllProducts]);

    const onButtonClick = () => {
       startGetAllProducts(keyword);
       history.push('/');
       startGetAllProducts(keyword);
    }

    const onKeyWordChange = (event) => {
        setKeyword(event.target.value);
    }
    return (
        <Fragment>
                <div style={{borderRadius: '10px'}} className="ui action input">
                    <input type="text"
                           placeholder="Enter product name ..."
                           onChange={onKeyWordChange}
                           value={keyword}
                           style={{borderRadius: '20px'}}
                    />
                    <button style={{borderTopRightRadius: '20px', borderBottomRightRadius: '20px'}} onClick={onButtonClick} className="ui button">Go</button>
                </div>
        </Fragment>
    )
};

export default connect(null, { startGetAllProducts })(SearchBar);