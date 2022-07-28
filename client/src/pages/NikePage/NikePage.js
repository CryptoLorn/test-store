import React, {useEffect, useState} from 'react';

import {sneakersService} from "../../services/sneakers.service";
import SneakerCard from "../../components/SneakerCard/SneakerCard";

const NikePage = () => {
    const [sneaker, setSneaker] = useState([]);

    useEffect(() => {
        sneakersService.getAll().then(value => setSneaker([...value.rows]))
    },[])

    let filtered = sneaker.filter(sneaker => sneaker.brandId === 1)

    return (
        <div>
            {filtered.map(sneaker => <SneakerCard key={sneaker.id} sneaker={sneaker}/>)}
        </div>
    );
};

export default NikePage;