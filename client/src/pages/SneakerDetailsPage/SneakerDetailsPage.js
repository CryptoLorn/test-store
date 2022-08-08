import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {sneakersService} from "../../services/sneakers.service";
import baseURL from "../../configs/urls";
import {Button} from "react-bootstrap";

const SneakerDetailsPage = () => {
    const {id} = useParams();
    const [sneaker, setSneaker] = useState(null);

    useEffect(() => {
        sneakersService.getById(id).then(value => setSneaker({...value}))
    }, [])

    const deleteSneaker = async () => {
        await sneakersService.deleteById(id)
    }

    return (
        <div>
            {sneaker && (
                <div>
                    <div><img src={baseURL + sneaker.img} alt={sneaker.name} width={400}/></div>
                    <div>{sneaker.name}</div>
                    <div>{sneaker.price}</div>
                    <div>
                        {
                            sneaker.brandId === 1? 'Nike'
                                :
                                sneaker.brandId === 2? 'Puma'
                                    :
                                        sneaker.brandId === 3? 'Adidas'
                                            :
                                                sneaker.brandId === 4? 'New Balance'
                                                    : null
                        }
                    </div>
                    <Button onClick={() => deleteSneaker()}>Delete</Button>
                </div>
            )}
        </div>
    );
};

export default SneakerDetailsPage;