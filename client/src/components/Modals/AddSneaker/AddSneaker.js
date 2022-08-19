import React, {useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

import {useAuth} from "../../../hooks/useAuth";
import {sneakersService} from "../../../services/sneakers.service";

const AddSneaker = ({show, onHide}) => {
    const {brands, types, selectedType, selectedBrand, setSelectedType, setSelectedBrand} = useAuth()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

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

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', selectedBrand.id)
        formData.append('typeId', selectedType.id)
        formData.append('info', JSON.stringify(info))
        sneakersService.create(formData).then(data => onHide())
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
                    Добавити продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{selectedType.name || 'Виберіть тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map(type =>
                                <DropdownItem
                                    key={type.id}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {type.name}
                                </DropdownItem>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{selectedBrand.name || 'Виберіть бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.map(brand =>
                                <DropdownItem
                                    key={brand.id}
                                    onClick={() => setSelectedBrand(brand)}
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