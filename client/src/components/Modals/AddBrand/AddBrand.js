import React, {useState} from 'react';
import {Button, Form, FormControl, Modal} from "react-bootstrap";

import {brandsService} from "../../../services/brands.service";

const AddBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addBrand = () => {
        brandsService.create({name: value}).then(data => setValue(''))
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
                    Добавити бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                        type={'text'}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={'Назва бренду'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addBrand}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddBrand;