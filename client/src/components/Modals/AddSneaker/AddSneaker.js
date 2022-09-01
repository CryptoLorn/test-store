import React, {useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

import {useAuth} from "../../../hooks/useAuth";
import {sneakersService} from "../../../services/sneaker.service";
import {useDispatch, useSelector} from "react-redux";

import {setSelectedBrand} from "../../../store/brand.slice";
import {setSelectedType} from "../../../store/type.slice";
import {useNavigate} from "react-router-dom";
import {createSneaker} from "../../../store/sneaker.slice";

const AddSneaker = ({show, onHide}) => {
    // const {brands, types, selectedBrand, selectedType, setSelectedBrand, setSelectedType} = useAuth();
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    const [selectedTypeAdd, setSelectedTypeAdd] = useState(null)
    const [selectedBrandAdd, setSelectedBrandAdd] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {brands, selectedBrand} = useSelector(state => state.brandReducer);
    const {types, selectedType} = useSelector(state => state.typeReducer);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const deleteInfo = (number) => {
        setInfo(info.filter(value => value.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    // const addProduct = () => {
    //     const formData = new FormData()
    //     formData.append('name', name)
    //     formData.append('price', `${price}`)
    //     formData.append('img', file)
    //     formData.append('brandId', selectedBrandAdd.id)
    //     formData.append('typeId', selectedTypeAdd.id)
    //     formData.append('info', JSON.stringify(info))
    //     sneakersService.create(formData).then(data => {
    //         navigate('/')
    //         onHide()
    //     })
    // }

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', selectedBrandAdd.id)
        formData.append('typeId', selectedTypeAdd.id)
        dispatch(createSneaker({data: formData}))
        navigate('/')
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
                    Add Sneaker
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{selectedTypeAdd?.name || 'Виберіть тип'}</Dropdown.Toggle>
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
                        <Dropdown.Toggle>{selectedBrandAdd?.name || 'Виберіть бренд'}</Dropdown.Toggle>
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
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={'Вкажать модель'}
                    />
                    <Form.Control
                        className={'my-3'}
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        type={'number'}
                        placeholder={'Вкажать ціну'}
                    />
                    <Form.Control
                        className={'my-3'}
                        type={'file'} onChange={selectFile}
                    />
                    <Button onClick={addInfo}>Добавити інформацію</Button>
                    {info.map(value =>
                    <Row key={value.number}>
                        <Col>
                            <Form.Control
                                placeholder={'Назва'}
                                value={value.title}
                                onChange={(e) => changeInfo('title', e.target.value, value.number)}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder={'Характеристика'}
                                value={value.description}
                                onChange={(e) => changeInfo('description', e.target.value, value.number)}
                            />
                        </Col>
                        <Col>
                            <Button onClick={() => deleteInfo(value.number)}>Видалити</Button>
                        </Col>
                    </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addProduct}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddSneaker;