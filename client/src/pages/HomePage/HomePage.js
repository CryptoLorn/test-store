import React, {useEffect, useState} from 'react';

import {sneakersService} from "../../services/sneakers.service";
import SneakerCard from "../../components/SneakerCard/SneakerCard";
import "./HomePage.css";
import {brandsService} from "../../services/brands.service";
import Brand from "../../components/Brand/Brand";

const HomePage = () => {
    const [sneakers, setSneakers] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        sneakersService.getAll().then(data => setSneakers([...data.rows]))
        brandsService.getAll().then(data => setBrands([...data]))
    }, [])

    return (
        <div className={'home_wrapper'}>
            <div className={'brands_menu'}>
                {brands.map(brand => <Brand key={brand.id} brand={brand}/>)}
            </div>
            <div className={'sneaker_cards_wrapper'}>
                {sneakers.map(sneaker => <SneakerCard key={sneaker.id} sneaker={sneaker}/>)}
            </div>
        </div>
    );
};

export default HomePage;