import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {sneakersService} from "../services/sneaker.service";

export const getAll = createAsyncThunk(
    'sneakerSlice/getAll',
    async (_, {dispatch}) => {
        const {dataSneaker} = await sneakersService.getAll(null, null, 1).then(data => {
            dispatch(setSneakers([...data.rows]))
            dispatch(setTotalCount(data.count))
        })
    }
)

export const getAllWithParams = createAsyncThunk(
    'sneakerSlice/getAllWithParams',
    async ({data}, {dispatch}) => {
        await sneakersService.getAll(data.selectedType, data.selectedBrand, data.page).then(data => {
            dispatch(setSneakers([...data.rows]))
            dispatch(setTotalCount(data.count))
        })
    }
)

export const createSneaker = createAsyncThunk(
    'sneakerSlice/createSneaker',
    async ({data}, {dispatch}) => {
        try {
            const newSneaker = await sneakersService.create(data);
            dispatch(addSneaker({data: newSneaker}));
        } catch (e) {
            console.log(e);
        }
    }
)

export const getById = createAsyncThunk(
    'sneakerSlice/getById',
    async ({data}, {dispatch}) => {
        await sneakersService.getById(data).then(value => dispatch(setSneaker({...value})))
    }
)

const sneakerSlice = createSlice({
    name: 'sneakerSlice',
    initialState: {
        sneakers: [],
        sneaker: {},
        totalCount: 0,
        sneakerId: null,
        errors: null
    },
    reducers: {
        setSneakers: (state, action) => {
            state.sneakers = (action.payload)
        },
        setSneaker: (state, action) => {
            state.sneaker = (action.payload)
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload
        },
        addSneaker: (state, action) => {
            state.sneakers.push(action.payload.data);
        },
        setSneakerId: (state, action) => {
            state.sneakerId = (action.payload)
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
            state.errors = null
            state.sneakers = action.payload
        })
            .addCase(getAll.rejected, (state, action) =>{
                state.errors = action.payload
            })
})

const {reducer: sneakerReducer, actions} = sneakerSlice;

export const {setSneakers, setSneaker, setTotalCount, addSneaker, setSneakerId} = sneakerSlice.actions;

export {
    sneakerReducer
}