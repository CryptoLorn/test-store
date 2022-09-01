import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {basketService} from "../services/basket.service";

export const getAllBaskets = createAsyncThunk(
    'basketSlice/getAllBaskets',
    async (_, {dispatch}) => {
        await basketService.getAll().then(data => dispatch(setBaskets([...data])))
    }
)

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState: {
        baskets: [],
        basketId: null
    },
    reducers: {
        setBaskets: (state, action) => {
            state.baskets = action.payload
        },
        setBasketId: (state, action) => {
            state.basketId = (action.payload)
        }
    }
})

const basketReducer = basketSlice.reducer;

export const {setBaskets, setBasketId} = basketSlice.actions;
export default basketReducer;