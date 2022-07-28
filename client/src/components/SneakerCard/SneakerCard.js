import React from 'react';
import {Link} from "react-router-dom";

import baseURL from "../../configs/urls";
import "./SneakerCard.css";

const SneakerCard = ({sneaker: {id, name, price, img}}) => {
    return (
        <>
            <Link to={`/${name}/` + id.toString()}>
                <div className={'sneaker_card'}>
                    <div className={'sneaker_card_poster'}><img width={200} src={baseURL + img} alt={'sneaker'}/></div>
                    <div className={'sneaker_card_short_info'}>
                        <div><b>{name}</b></div>
                        <div className={'sneaker_cars_price_basket'}>
                            <div><span>{price} ₴</span></div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default SneakerCard;