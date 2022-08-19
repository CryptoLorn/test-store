import React, {useEffect} from 'react';
import {createContext, useState} from "react";

import {brandsService} from "../services/brands.service";
import {typeService} from "../services/type.service";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [brands, setBrands] = useState([])
    const [types, setTypes] = useState([])
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [selectedType, setSelectedType] = useState({})
    const [selectedBrand, setSelectedBrand] = useState({})
    const [orders, setOrders] = useState([]);
    const [loginVisible, setLoginVisible] = useState(false)
    const [registrationVisible, setRegistrationVisible] = useState(false)

    useEffect(() => {
        brandsService.getAll().then(data => setBrands([...data]))
        typeService.getAll().then(data => setTypes([...data]))
    }, [])

    const value = {
        user,
        setUser,
        page,
        setPage,
        totalCount,
        setTotalCount,
        selectedType,
        setSelectedType,
        selectedBrand,
        setSelectedBrand,
        types,
        setBrands,
        setTypes,
        brands,
        orders,
        setOrders,
        loginVisible,
        setLoginVisible,
        registrationVisible,
        setRegistrationVisible
    }

    return (
        <div>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;