import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import './Admin.css'
import AddSneaker from "../Modals/AddSneaker";
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

                <Dropdown.Menu className={'bg'}>
                    <Dropdown.Item onClick={() => setProductVisible(true)} href="#/product">Добавити товар</Dropdown.Item>
                    <Dropdown.Item onClick={() => setBrandVisible(true)} href="#/brand">Добавити бренд</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeVisible(true)} href="#/type">Добавити тип</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <AddSneaker show={productVisible} onHide={() => setProductVisible(false)}/>
            <AddBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <AddType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </div>
    );
};

export default Admin;