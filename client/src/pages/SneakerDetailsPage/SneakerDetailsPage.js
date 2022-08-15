import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";

import "./SneakerDetailsPage.css"
import {sneakersService} from "../../services/sneakers.service";
import baseURL from "../../configs/urls";
import {useAuth} from "../../hooks/useAuth";
import {sizesService} from "../../services/size.services";

const SneakerDetailsPage = () => {
    const {id} = useParams();
    const [sneaker, setSneaker] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [selectedOrderSizes, setSelectedOrderSizes] = useState(null);

    const {orders, setOrders} = useAuth();

    useEffect(() => {
        sneakersService.getById(id).then(value => setSneaker({...value}))

        sizesService.getAll().then(data => setSizes([...data]))
    }, [])

    // const deleteSneaker = async () => {
    //     await sneakersService.deleteById(id)
    // }

    const addOrder = (item) => {
        let isOrder = false;

        orders.forEach(order => {
            if (order.id === item.id) {
                isOrder = true;
            }
        });

        if (!isOrder) {
            setOrders([...orders, item]);
        }
    }

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
                    <Button onClick={() => addOrder(sneaker)}>Order</Button>
                </div>
            )}
        </div>
    );
};

export default SneakerDetailsPage;