import React from 'react';
import {useSelector} from "react-redux";
import {Button, Modal} from "react-bootstrap";

import "./Basket.css";
import Orders from "../../Orders/Orders";

const Basket = ({show, onHide}) => {
    const {orders} = useSelector(state => state.ordersReducer);

    let sum = 0;
    orders.forEach(el => sum += Number.parseFloat(el.price));

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    List of goods:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {orders&& (
                    <div className={'orders'}>
                        {orders.map(order => <Orders key={order.id} order={order}/>)}
                    </div>
                )}
                <div className={'to_pay'}>
                    {
                        sum ?
                            <span>To pay: <span>{new Intl.NumberFormat().format(sum)}</span><span>$</span></span>
                            :
                            null
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className={'order_button'} onClick={() => alert('Sorry, this functionality is not implemented!')}>Order</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Basket;