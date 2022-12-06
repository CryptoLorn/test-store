import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FaTrashAlt} from "react-icons/fa";

import './Orders.css';
import baseURL from "../../configs/urls";
import {deleteById} from "../../store/slices/orders.slice";
import {getAllAnalytics, updateAnalyticsById} from "../../store/slices/analytics.slice";

const Orders = ({order: {id, brand_name, model, price, img, size, sneakerId}}) => {
    // const {analytics} = useSelector(state => state.analyticsReducer);
    const dispatch = useDispatch();

    const deleteOrders = () => {
        dispatch(deleteById({id}));

        // analytics.forEach(analytic => {
        //     if (analytic.sneakerId === sneakerId) {
        //         let newBought = analytic.bought - 1;
        //         let bought = {bought: newBought};
        //         dispatch(updateAnalyticsById({id: analytic.sneakerId, analytic: bought}));
        //     }
        // })
    }

    return (
        <div className={'order_wrapper'}>
            <div><img src={baseURL + img} alt={brand_name} width={105}/></div>
            <div className={'order_title_price'}>
                <div className={'order_title'}>
                    <div>Sneakers</div>
                    <div>{brand_name}</div>
                    <div>{model}</div>
                    <div>{size}</div>
                </div>
                <div className={'order_price_delete'}>
                    <span>{price}$</span>
                    <div onClick={() => deleteOrders()}><FaTrashAlt/></div>
                </div>
            </div>
        </div>
    );
};

export default Orders;