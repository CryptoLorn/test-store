import React from 'react';
import {Link} from "react-router-dom";

import "./SneakerCard.css";
import baseURL from "../../configs/urls";

const SneakerCard = ({sneaker: {id, name, price, img, brandId}}) => {

    return (
        <div className={'sneaker_card_wrapper'}>
            <Link to={`/${name}/` + id.toString()}>
                <div className={'sneaker_card'}>
                    <div className={'sneaker_card_poster'}><img src={baseURL + img} alt={name}/></div>
                    <div className={'sneaker_card_short_info'}>
                        <div className={'sneaker_card_name'}>
                            <span>Sneaker </span>
                            <b>
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
                            </b>
                            <span> {name}</span>
                        </div>
                        <div className={'sneaker_cars_price_basket'}>
                            <div><span>{price} $</span></div>
                            <div className={'sneaker_card_buy'}>Add to cart</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SneakerCard;