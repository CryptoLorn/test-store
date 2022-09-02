import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {ordersService} from "../services/orders.service";

export const getAllOrdersByBasketId = createAsyncThunk(
    'ordersSlice/getAllOrdersByBasketId',
    async ({data}, {dispatch}) => {
        await ordersService.getAllById(data).then(data => dispatch(setOrders([...data])))
    }
)

export const createOrders = createAsyncThunk(
    'ordersSlice/createOrders',
    async ({data}, {dispatch}) => {
        try {
            const newOrders = await ordersService.create(data);
            dispatch(addOrders({data: newOrders}));
        } catch (e) {
            console.log(e);
        }
    }
)

export const deleteById = createAsyncThunk(
    'ordersSlice/deleteById',
    async ({id}, {dispatch}) => {
        try {
            await ordersService.deleteById(id);
            dispatch(deleteOrders({id}));
        } catch (e) {
            console.log(e);
        }
    }
)

const ordersSlice = createSlice({
    name: 'ordersSlice',
    initialState: {
        orders: [],
        errors: null
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload
        },
        addOrders: (state, action) => {
            state.orders.push(action.payload.data);
        },
        deleteOrders: (state, action) => {
            state.orders = state.orders.filter(order => order.id !== action.payload.id)
        }
    }
})

const orderReducer = ordersSlice.reducer;

export const {setOrders, addOrders, deleteOrders} = ordersSlice.actions;
export default orderReducer;