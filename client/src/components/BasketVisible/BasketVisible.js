import React, {useState} from 'react';
import {FaShoppingBag} from "react-icons/fa";

import Basket from "../Modals/Basket/Basket";

const BasketVisible = () => {
    const [basketVisible, setBasketVisible] = useState(false)

    return (
        <>
            <FaShoppingBag onClick={() => setBasketVisible(true)}/>
            <Basket show={basketVisible} onHide={() => setBasketVisible(false)}/>
        </>
    );
};

export default BasketVisible;