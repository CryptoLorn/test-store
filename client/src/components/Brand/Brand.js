import React from 'react';
import {Link} from "react-router-dom";

import "./Brand.css"

const Brand = ({brand: {id, name}}) => {

    return (
        <div className={'brand_item'}>
            <Link to={`/${name.toLowerCase()}/brand/` + id.toString()}>{name}</Link>
        </div>
    );
};

export default Brand;