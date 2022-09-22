import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

import "../../../validators/validator.css";
import {createSneakers} from "../../../store/sneakers.slice";
import {SneakersValidator} from "../../../validators/sneakers.validator";

const AddSneakers = ({show, onHide}) => {
    const [selectedTypeAdd, setSelectedTypeAdd] = useState(null);
    const [selectedBrandAdd, setSelectedBrandAdd] = useState(null);
    const [file, setFile] = useState(null);
    const {brands} = useSelector(state => state.brandReducer);
    const {types} = useSelector(state => state.typeReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {handleSubmit, register, reset, formState: {errors}} = useForm({resolver: joiResolver(SneakersValidator)});

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const addSneakers = (data) => {
        const formData = new FormData();
        formData.append('model', data.model);
        formData.append('brand_name', selectedBrandAdd.name);
        formData.append('price', `${data.price}`);
        formData.append('color', data.color);
        formData.append('material', data.material);
        formData.append('img', file);
        formData.append('description', data.description);
        formData.append('brandId', selectedBrandAdd.id);
        formData.append('typeId', selectedTypeAdd.id);
        dispatch(createSneakers({data: formData}));
        navigate('/');
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
                    Add Sneakers
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{selectedTypeAdd?.name || 'Select type'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map(type =>
                                <DropdownItem
                                    key={type.id}
                                    onClick={() => setSelectedTypeAdd(type)}
                                >
                                    {type.name}
                                </DropdownItem>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{selectedBrandAdd?.name || 'Select brand'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.map(brand =>
                                <DropdownItem
                                    key={brand.id}
                                    onClick={() => setSelectedBrandAdd(brand)}
                                >
                                    {brand.name}
                                </DropdownItem>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className={'my-3'}
                        type={'text'}
                        placeholder={'model'}
                        {...register('model')}
                    />
                    {errors.model && <span className={'validation'}>{errors.model.message}</span>}
                    <Form.Control
                        className={'my-3'}
                        type={'text'}
                        placeholder={'color'}
                        {...register('color')}
                    />
                    {errors.color && <span className={'validation'}>{errors.color.message}</span>}
                    <Form.Control
                        className={'my-3'}
                        type={'text'}
                        placeholder={'material'}
                        {...register('material')}
                    />
                    {errors.material && <span className={'validation'}>{errors.material.message}</span>}
                    <Form.Control
                        className={'my-3'}
                        type={'number'}
                        defaultValue={'0'}
                        {...register('price')}
                    />
                    {errors.price && <span className={'validation'}>{errors.price.message}</span>}
                    <Form.Control
                        className={'description'}
                        type={'text'}
                        placeholder={'description'}
                        {...register('description')}
                    />
                    {errors.description && <span className={'validation'}>{errors.description.message}</span>}
                    <Form.Control
                        className={'my-3'}
                        type={'file'}
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit(addSneakers)}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddSneakers;