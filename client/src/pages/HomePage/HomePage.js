import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import "./HomePage.css";
import SneakerCard from "../../components/SneakerCard/SneakerCard";
import Brands from "../../components/Brands/Brands";
import Pages from "../../components/Pages/Pages";
import Type from "../../components/Types/Types";
import {getAll, getAllWithParams} from "../../store/sneaker.slice";

const HomePage = () => {
    const {selectedBrand} = useSelector(state => state.brandReducer);
    const {selectedType} = useSelector(state => state.typeReducer);
    const {sneakers} = useSelector(state => state.sneakerReducer);
    const {page} = useSelector(state => state.pageReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, [])

    useEffect(() => {
        dispatch(getAllWithParams({data: {selectedType: selectedType.id, selectedBrand: selectedBrand.id, page}}))
    }, [page, selectedType, selectedBrand])

    return (
        <div className={'home_wrapper'}>
            <div>
                <Brands/>
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