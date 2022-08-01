import React, {useEffect, useState} from 'react';

import {sneakersService} from "../../services/sneakers.service";
import SneakerCard from "../../components/SneakerCard/SneakerCard";
import "./HomePage.css";
import {brandsService} from "../../services/brands.service";
import Brand from "../../components/Brand/Brand";
import Pages from "../../components/Pages/Pages";
import {useAuth} from "../../hooks/useAuth";

const HomePage = () => {
    const [sneakers, setSneakers] = useState([]);
    const [brands, setBrands] = useState([]);
    const {setTotalCount, page, selectedType, selectedBrand} = useAuth()

    useEffect(() => {
        sneakersService.getAll(null, null, 1, 2).then(data => {
                setSneakers([...data.rows])
                setTotalCount(data.count)
            }
        )
        brandsService.getAll().then(data => setBrands([...data]))
    }, [page])

    // useEffect(() => {
    //     sneakersService.getAll(selectedType.id, selectedBrand.id, page, 2).then(data => {
    //             setSneakers([...data.rows])
    //             setTotalCount(data.count)
    //         }
    //     )
    // }, [page, selectedType, selectedBrand])

    return (
        <div className={'home_wrapper'}>
            <div className={'item'}>
                <div className={'brands_menu'}>
                    {brands.map(brand => <Brand key={brand.id} brand={brand}/>)}
                </div>
                <div className={'sneaker_cards_wrapper'}>
                    {sneakers.map(sneaker => <SneakerCard key={sneaker.id} sneaker={sneaker}/>)}
                </div>
            </div>
            <div><Pages/></div>
        </div>
    );
};

export default HomePage;