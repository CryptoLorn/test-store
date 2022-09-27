import React, {useState} from 'react';
import {FaShoppingBag} from "react-icons/fa";

import './BasketVisible.css';
import Basket from "../Modals/Basket/Basket";
import ItemInBag from "../ItemInBag/ItemInBag";

const BasketVisible = () => {
    const [basketVisible, setBasketVisible] = useState(false);

    return (
        <div>
            <div className={'shopping_bag'} onClick={() => setBasketVisible(true)}>
                <ItemInBag/>
                <FaShoppingBag/>
            </div>
            <Basket show={basketVisible} onHide={() => setBasketVisible(false)}/>
        </div>
    );
};

export default BasketVisible;