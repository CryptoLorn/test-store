import React from 'react';

import "./Type.css"
import {useAuth} from "../../hooks/useAuth";
import {useState} from "react";

const Type = () => {
    const {types, setSelectedType, setPage} = useAuth()
    const [element, setElement] = useState(null)

    const handleClick = (type, e) => {
        if (element === e) {
            setSelectedType([])
            setElement(null)
        } else {
            setSelectedType(type)
            setPage(1)
            setElement(e)
        }
    }

    return (
        <div className={'type_menu'}>
            {types.map((type, e) =>
                <div
                    className={element === e? 'active_type' : 'type_item'}
                    key={type.id}
                    onClick={() => handleClick(type, e)}
                >
                    {type.name}
                </div>
            )}
        </div>
    );
};

export default Type;