import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {typeService} from "../../services/type.service";

const AddType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addType = () => {
        typeService.create({name: value}).then(data => setValue(''))
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавити тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={'Назва типу'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addType}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddType;