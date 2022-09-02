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

export const deleteById = createAsyncThunk(
    'sneakerSlice/deleteById',
    async ({id}, {dispatch}) => {
        try {
            await sneakersService.deleteById(id);
            dispatch(deleteSneaker({id}));
        } catch (e) {
            console.log(e);
        }

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
        deleteSneaker: (state, action) => {
            state.sneakers = state.sneakers.filter(sneaker => sneaker.id !== action.payload.id)
        },
        setSneakerId: (state, action) => {
            state.sneakerId = (action.payload)
        }
    }
})

const {reducer: sneakerReducer} = sneakerSlice;

export const {
    setSneakers,
    setSneaker,
    setTotalCount,
    addSneaker,
    deleteSneaker,
    setSneakerId
} = sneakerSlice.actions;

export {
    sneakerReducer
}