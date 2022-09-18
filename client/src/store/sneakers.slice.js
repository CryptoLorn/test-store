import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {sneakersService} from "../services/sneaker.service";

export const getAllSneakers = createAsyncThunk(
    'sneakersSlice/getAllSneakers',
    async (_, {dispatch}) => {
        try {
            const {dataSneakers} = await sneakersService.getAll(null, null, 1).then(data => {
                dispatch(setSneakers([...data.rows]));
                dispatch(setTotalCount(data.count));
            })
        } catch (e) {
            return e.message;
        }
    }
)

export const getAllSneakersWithParams = createAsyncThunk(
    'sneakersSlice/getAllSneakersWithParams',
    async ({data}, {dispatch}) => {
        try {
            await sneakersService.getAll(data.selectedType, data.selectedBrand, data.page).then(data => {
                dispatch(setSneakers([...data.rows]));
                dispatch(setTotalCount(data.count));
            })
        } catch (e) {
            return e.message;
        }
    }
)

export const getAllFromSearch = createAsyncThunk(
    'searchSlice/getAllFromSearch',
    async (_, {rejectWithValue}) => {
        try {
            return await sneakersService.getAllFromSearch();
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const createSneakers = createAsyncThunk(
    'sneakersSlice/createSneakers',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            const newSneakers = await sneakersService.create(data);
            dispatch(addSneakers({data: newSneakers}));
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const getSneakersById = createAsyncThunk(
    'sneakersSlice/getSneakersById',
    async ({id}, {dispatch}) => {
        try {
            await sneakersService.getById(id).then(value => {
                dispatch(setSneaker({...value}));
            })
        } catch (e) {
            return e.message;
        }
    }
)

export const deleteSneakersById = createAsyncThunk(
    'sneakersSlice/deleteSneakersById',
    async ({id}, {dispatch}) => {
        try {
            await sneakersService.deleteById(id);
            dispatch(deleteSneaker({id}));
        } catch (e) {
            return e.message;
        }

    }
)

export const updateSneakersById = createAsyncThunk(
    'sneakersSlice/updateSneakersById',
    async ({id, sneaker}, {dispatch}) => {
        const newSneakers = await sneakersService.updateById(id, sneaker);
        dispatch(updateSneakers({sneaker: newSneakers}));
    }
)

const sneakersSlice = createSlice({
    name: 'sneakersSlice',
    initialState: {
        sneakers: [],
        sneaker: {},
        sneakersFound: [],
        totalCount: 0,
        errors: null,
        sneakersForUpdate: null
    },
    reducers: {
        setSneakers: (state, action) => {
            state.sneakers = action.payload.reverse();
        },
        setSneaker: (state, action) => {
            state.sneaker = action.payload;
        },
        setSneakersFound: (state, action) => {
            state.sneakersFound = action.payload.reverse();
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        addSneakers: (state, action) => {
            state.sneakers.push(action.payload.data);
        },
        deleteSneaker: (state, action) => {
            state.sneakers = state.sneakers.filter(sneaker => sneaker.id !== action.payload.id);
        },
        sneakersToUpdate: (state, action) => {
            state.sneakersForUpdate = action.payload;
        },
        updateSneakers: (state, action) => {
            const index = state.sneakers.findIndex(sneaker => sneaker.id === action.payload.sneaker.id);
            state.sneakers[index] = action.payload.sneaker;
        }
    },
    extraReducers: {
        [createSneakers.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

const sneakersReducer = sneakersSlice.reducer;

export const {
    setSneakers,
    setSneaker,
    setSneakersFound,
    setTotalCount,
    addSneakers,
    deleteSneaker,
    sneakersToUpdate,
    updateSneakers
} = sneakersSlice.actions;

export default sneakersReducer;