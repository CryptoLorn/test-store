import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {basketService} from "../../services/basket.service";

export const getBasketById = createAsyncThunk(
    'basketSlice/getBasketById',
    async ({id}, {dispatch}) => {
        await basketService.getById(id).then(data => dispatch(setBasket({...data})));
    }
)

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState: {
        basket: {}
    },
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        }
    }
})

const basketReducer = basketSlice.reducer;

export const {setBasket} = basketSlice.actions;
export default basketReducer;