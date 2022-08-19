import React, {useEffect, useState} from 'react';

import "./HomePage.css";
import {sneakersService} from "../../services/sneakers.service";
import SneakerCard from "../../components/SneakerCard/SneakerCard";
import Brand from "../../components/Brand/Brand";
import Pages from "../../components/Pages/Pages";
import {useAuth} from "../../hooks/useAuth";
import Type from "../../components/Type/Type";

const HomePage = () => {
    const [sneakers, setSneakers] = useState([]);
    const {setTotalCount, page, selectedType, selectedBrand} = useAuth()

    useEffect(() => {
        sneakersService.getAll(null, null, 1).then(data => {
                setSneakers([...data.rows])
                setTotalCount(data.count)
            }
        )
    }, [])

    useEffect(() => {
        sneakersService.getAll(selectedType.id, selectedBrand.id, page).then(data => {
                setSneakers([...data.rows])
                setTotalCount(data.count)
            }
        )
    }, [page, selectedType, selectedBrand])

    return (
        <div className={'home_wrapper'}>
            <div>
                <Brand/>
            </div>
            <div className={'home_type_cards'}>
                <div>
                    <Type/>
                </div>
                <div className={'sneaker_list'}>
                    {sneakers.map(sneaker => <SneakerCard key={sneaker.id} sneaker={sneaker}/>)}
                </div>
                <div><Pages/></div>
            </div>
        </div>
    );
};

export default HomePage;