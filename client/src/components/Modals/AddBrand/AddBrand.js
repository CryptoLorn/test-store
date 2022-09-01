import React, {useState} from 'react';
import {Button, Form, FormControl, Modal} from "react-bootstrap";

import {brandsService} from "../../../services/brand.service";
import {useDispatch} from "react-redux";
import {createBrand} from "../../../store/brand.slice";
import {useForm} from "react-hook-form";

const AddBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const {handleSubmit, register} = useForm();
    const dispatch = useDispatch();

    const submit = (data) => {
        dispatch(createBrand({data}))
        onHide()
    }

    // const addBrand = () => {
    //     brandsService.create({name: value}).then(data => setValue(''))
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
                    Add brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<Form>*/}
                {/*    <FormControl*/}
                {/*        type='text'*/}
                {/*        value={value}*/}
                {/*        onChange={e => setValue(e.target.value)}*/}
                {/*        placeholder={'Назва бренду'}*/}
                {/*    />*/}
                {/*</Form>*/}

                <Form>
                    <FormControl type='text' placeholder='Brand name' {...register('name')}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit(submit)}>Add</Button>
                {/*<Button onClick={addBrand}>Добавити</Button>*/}
            </Modal.Footer>
        </Modal>
    );
};

export default AddBrand;