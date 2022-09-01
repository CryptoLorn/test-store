import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import "./SneakerDetailsPage.css";
import baseURL from "../../configs/urls";
import {sizesService} from "../../services/size.services";
import {createOrders} from "../../store/orders.slice";
import {getById} from "../../store/sneaker.slice";

const SneakerDetailsPage = () => {
    const {id} = useParams();
    const [sizes, setSizes] = useState([]);
    const [selectedOrderSizes, setSelectedOrderSizes] = useState(null);

    const {sneaker, sneakerId} = useSelector(state => state.sneakerReducer);
    const {basketId} = useSelector(state => state.basketReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getById({data: id}))
        sizesService.getAll().then(data => setSizes([...data]))
    }, [])

    const addOrders = () => {
        const data = new FormData();
        data.append('basketId', basketId)
        data.append('sneakerId', sneakerId)
        data.append('brandId', sneaker.brandId)
        data.append('name', sneaker.name)
        data.append('price', sneaker.price)
        data.append('img', sneaker.img)
        dispatch(createOrders({data}))
    }

    // const deleteSneaker = async () => {
    //     await sneakersService.deleteById(id)
    // }

    // const addOrder = (item) => {
    //     let isOrder = false;
    //
    //     orders.forEach(order => {
    //         if (order.id === item.id) {
    //             isOrder = true;
    //         }
    //     });
    //
    //     if (!isOrder) {
    //         dispatch(setOrders([...orders, item]));
    //     }
    // }

    return (
        <div>
            {sneaker && (
                <div>
                    <div><img src={baseURL + sneaker.img} alt={sneaker.name} width={400}/></div>
                    <div>{sneaker.name}</div>
                    <div className={'sizes'}>
                        {sizes.map(size =>
                            <div className={selectedOrderSizes === size ? 'size_active' : 'size'}
                                 key={size.id}
                                 onClick={() => setSelectedOrderSizes(size)}
                            >
                                {size.name}
                            </div>
                        )}
                    </div>
                    <div>{sneaker.price}</div>
                    <div>
                        {
                            sneaker.brandId === 1 ? 'Nike'
                                :
                                sneaker.brandId === 2 ? 'Puma'
                                    :
                                    sneaker.brandId === 3 ? 'Adidas'
                                        :
                                        sneaker.brandId === 4 ? 'New Balance'
                                            : null
                        }
                    </div>
                    <Button onClick={() => addOrders()}>Order</Button>
                </div>
            )}
        </div>
    );
};

export default SneakerDetailsPage;