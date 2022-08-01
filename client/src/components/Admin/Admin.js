import React, {useState} from 'react';

import './Admin.css'
import Dropdown from 'react-bootstrap/Dropdown';
import AddProduct from "../Modals/AddProduct";
import AddBrand from "../Modals/AddBrand";
import AddType from "../Modals/AddType";

const Admin = () => {
    const [productVisible, setProductVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Адмінпанель
                </Dropdown.Toggle>

                <Dropdown.Menu className={'color'}>
                    <Dropdown.Item onClick={() => setProductVisible(true)} href="#/action-1">Добавити товар</Dropdown.Item>
                    <Dropdown.Item onClick={() => setBrandVisible(true)} href="#/action-2">Добавити бренд</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeVisible(true)} href="#/action-3">Добавити тип</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <AddProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <AddBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <AddType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </div>
    );
};

export default Admin;