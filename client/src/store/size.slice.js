import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {sizesService} from "../services/size.services";

export const getAllSizes = createAsyncThunk(
    'sizeSlice/getAllSizes',
    async (_, {dispatch}) => {
        return await sizesService.getAll().then(data => dispatch(setSizes([...data])));
    }
)

const sizeSlice = createSlice({
    name: 'sizeSlice',
    initialState: {
        sizes: []
    },
    reducers: {
        setSizes: (state, action) => {
            state.sizes = action.payload;
        }
    }
})

const sizeReducer = sizeSlice.reducer;

export const {setSizes} = sizeSlice.actions;
export default sizeReducer;