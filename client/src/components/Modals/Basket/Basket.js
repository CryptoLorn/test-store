import React, {useEffect} from 'react';
import {Button, Modal} from "react-bootstrap";

import {useAuth} from "../../../hooks/useAuth";
import Order from "../../Order/Order";


const Basket = ({show, onHide}) => {
    const {orders} = useAuth();

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
                        {orders.map(order => <Order key={order.id} order={order}/>)}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button>Orders</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Basket;