import React from 'react';
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {Button, Form, FormControl, Modal} from "react-bootstrap";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useNavigate} from "react-router-dom";

import "../../../validators/validator.css";
import {createType} from "../../../store/type.slice";
import {TypeBrandValidator} from "../../../validators/typeBrand.validator";

const AddType = ({show, onHide}) => {
    const {handleSubmit, register, reset, formState: {errors}} = useForm({resolver: joiResolver(TypeBrandValidator)});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addType = (data) => {
        dispatch(createType({data}));
        onHide();
        reset();
    }

    const hide = () => {
        onHide();
        reset();
        navigate('/');
    }

    return (
        <Modal
            show={show}
            onHide={hide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl type={'text'} placeholder={'name'} {...register('name')}/>
                </Form>
                {errors.name && <span className={'validation'}>{errors.name.message}</span>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit(addType)}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddType;