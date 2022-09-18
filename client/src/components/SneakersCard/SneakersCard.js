import React from 'react';
import {Link} from "react-router-dom";

import "./SneakersCard.css";
import baseURL from "../../configs/urls";

const SneakersCard = ({sneaker: {id, model, price, img, brand_name}}) => {

    return (
        <div className={'sneakers_card_wrapper'}>
            <Link to={`/${model}/` + id.toString()}>
                <div className={'sneakers_card'}>
                    <div className={'sneakers_card_poster'}><img src={baseURL + img} alt={brand_name}/></div>
                    <div className={'sneakers_card_short_info'}>
                        <div className={'sneakers_card_name'}>
                            <span>Sneakers </span>
                            <span><b>{brand_name}</b></span>
                            <span> {model}</span>
                        </div>
                        <div className={'sneakers_cars_price_basket'}>
                            <div><span>{price} $</span></div>
                            <div className={'sneakers_buy'}>Buy now</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SneakersCard;