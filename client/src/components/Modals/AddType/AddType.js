import React, {useState} from 'react';
import {Button, Form, FormControl, Modal} from "react-bootstrap";

import {typeService} from "../../../services/type.service";
import {useDispatch} from "react-redux";
import {createType} from "../../../store/type.slice";
import {useForm} from "react-hook-form";
import {createBrand} from "../../../store/brand.slice";

const AddType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const {handleSubmit, register} = useForm();
    const dispatch = useDispatch();

    const submit = (data) => {
        dispatch(createType({data}))
        onHide()
    }

    // const addType = () => {
    //     typeService.create({name: value}).then(data => setValue(''))
    //     onHide()
    // }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<Form>*/}
                {/*    <Form.Control*/}
                {/*        type='text'*/}
                {/*        value={value}*/}
                {/*        onChange={e => setValue(e.target.value)}*/}
                {/*        placeholder={'Назва типу'}*/}
                {/*    />*/}
                {/*</Form>*/}

                <Form>
                    <FormControl type='text' placeholder='Type name' {...register('name')}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit(submit)}>Add</Button>
                {/*<Button onClick={addType}>Добавити</Button>*/}
            </Modal.Footer>
        </Modal>
    );
};

export default AddType;