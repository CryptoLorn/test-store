import React from 'react';
import {useSelector} from "react-redux";
import {Button, Modal} from "react-bootstrap";

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
                    <div>
                        {orders.map(order => <Orders key={order.id} order={order}/>)}
                    </div>
                )}
                {
                    sum?
                        <p>To pay: {new Intl.NumberFormat().format(sum)}$</p>
                    :
                        null
                }
            </Modal.Body>
            <Modal.Footer>
                <Button>Orders</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Basket;