import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import "./Brands.css"
import {useAuth} from "../../hooks/useAuth";
import {getAll, setSelectedBrand, setElementBrand} from "../../store/brand.slice";
import {setPage} from "../../store/page.slice";

const Brands = () => {
    // const {brands, setSelectedBrand, setPage} = useAuth();
    // const [element, setElement] = useState(null);

    const {brands, elementBrand, status, error} = useSelector(state => state.brandReducer); //state['brandReducer']
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, [])

    const handleClick = (brand, e) => {
        if (elementBrand === e) {
            // setSelectedBrand([])
            dispatch(setSelectedBrand({}))
            dispatch(setElementBrand(null))
        } else {
            // setSelectedBrand(brand)
            dispatch(setSelectedBrand(brand))
            dispatch(setPage(1))
            dispatch(setElementBrand(e))
        }
    }

    return (
        <div className={'brand_menu'}>
            {status === 'pending'&& <h1>Loading...</h1>}
            {error&& <h2>{error}</h2>}
            {brands.map((brand, e) =>
                <div
                    className={elementBrand === e ? 'active_brand' : 'brand_item'}
                    key={brand.id}
                    onClick={() => handleClick(brand, e)}
                >
                    <span>{brand.name}</span>
                </div>
            )}
        </div>
    );
};

export default Brands;