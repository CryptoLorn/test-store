import React, {useState} from 'react';

import "./Brand.css"
import {useAuth} from "../../hooks/useAuth";

const Brand = () => {
    const {brands, setSelectedBrand, setPage} = useAuth();
    const [element, setElement] = useState(null);

    const handleClick = (brand, e) => {
        if (element === e) {
            setSelectedBrand([])
            setElement(null)
        } else {
            setSelectedBrand(brand)
            setPage(1)
            setElement(e)
        }
    }

    return (
        <div className={'brand_menu'}>
            {brands.map((brand, e) =>
                <div
                    className={element === e ? 'active_brand' : 'brand_item'}
                    key={brand.id}
                    onClick={() => handleClick(brand, e)}
                >
                    <span>{brand.name}</span>
                </div>
            )}
        </div>
    );
};

export default Brand;