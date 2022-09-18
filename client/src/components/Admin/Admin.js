import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import './Admin.css';
import AddSneaker from "../Modals/AddSneakers/AddSneakers";
import AddBrand from "../Modals/AddBrand/AddBrand";
import AddType from "../Modals/AddType/AddType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle className={'dropdown_admin'} variant="success" id="dropdown-basic">
                    Admin
                </Dropdown.Toggle>

                <Dropdown.Menu className={'bg'}>
                    <Dropdown.Item onClick={() => setProductVisible(true)} href="#/sneakers">Add sneakers</Dropdown.Item>
                    <Dropdown.Item onClick={() => setBrandVisible(true)} href="#/brand">Add brand</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTypeVisible(true)} href="#/type">Add type</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <AddSneaker show={productVisible} onHide={() => setProductVisible(false)}/>
            <AddBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <AddType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </>
    );
};

export default Admin;