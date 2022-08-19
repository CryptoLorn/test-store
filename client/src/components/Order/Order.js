import React from 'react';
import {FaTrashAlt} from "react-icons/fa";

import './Order.css'
import baseURL from "../../configs/urls";

const Order = ({order: {id, name, price, img, brandId}}) => {

    return (
        <div className={'order_wrapper'}>
            <div><img src={baseURL + img} alt={name} width={100}/></div>
            <div className={'order_title_price'}>
                <div className={'order_title'}>
                    <div>Sneaker</div>
                    <div>
                        {
                            brandId === 1? 'Nike'
                                :
                                brandId === 2? 'Puma'
                                    :
                                    brandId === 3? 'Adidas'
                                        :
                                        brandId === 4? 'New Balance'
                                            : null
                        }
                    </div>
                    <div>{name}</div>
                </div>
                <div className={'order_price_del'}>
                    <span>{price}$</span>
                    <div><FaTrashAlt/></div>
                </div>
            </div>
        </div>
    );
};

export default Order;