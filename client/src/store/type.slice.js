import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {typeService} from "../services/type.service";

export const getAll = createAsyncThunk(
    'typeSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            return await typeService.getAll();
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const createType = createAsyncThunk(
    'typeSlice/createBrand',
    async ({data}, {dispatch}) => {
        try {
            const newType = await typeService.create(data);
            dispatch(addType({data: newType}));
        } catch (e) {
            console.log(e);
        }
    }
)

const typeSlice = createSlice({
    name: 'typeSlice',
    initialState: {
        types: [],
        selectedType: {},
        elementBrand: null,
        status: null,
        error: null
    },
    reducers: {
        addType: (state, action) => {
            state.types.push(action.payload.data);
        },
        setSelectedType: (state, action) => {
            state.selectedType = action.payload
        },
        setElementType: (state, action) => {
            state.elementType = action.payload
        }
    },
    extraReducers: {
        [getAll.pending]: (state, action) => {
            state.status = 'pending'
            state.error = null
        },
        [getAll.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.types = action.payload
        },
        [getAll.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        }
    }
})

const typeReducer = typeSlice.reducer;

export const {addType, setSelectedType, setElementType} = typeSlice.actions;
export default typeReducer;