import React, {useEffect, useState} from 'react';

import {sneakersService} from "../../services/sneakers.service";
import SneakerCard from "../../components/SneakerCard/SneakerCard";
import "./HomePage.css";
import {Link} from "react-router-dom";

const HomePage = () => {
    const [sneakers, setSneakers] = useState([]);

    useEffect(() => {
        sneakersService.getAll().then(data => setSneakers([...data.rows]))
    }, [])

    return (
        <div className={'sneaker_cards_wrapper'}>
            {sneakers.map(sneaker => <SneakerCard key={sneaker.id} sneaker={sneaker}/>)}
        </div>
    );
};

export default HomePage;