import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {sneakersService} from "../../services/sneakers.service";
import baseURL from "../../configs/urls";

const SneakerDetailsPage = () => {
    const {id} = useParams();
    const [sneaker, setSneaker] = useState(null);

    useEffect(() => {
        sneakersService.getById(id).then(value => setSneaker({...value}))
    }, [])

    return (
        <div>
            {sneaker && (
                <div>
                    <div><img src={baseURL + sneaker.img} alt={sneaker.name} width={400}/></div>
                    <div>{sneaker.name}</div>
                    <div>{sneaker.price}</div>
                </div>
            )}
        </div>
    );
};

export default SneakerDetailsPage;