import {createSlice} from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: 'pageSlice',
    initialState: {
        page: 1
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        }
    }
})

const pageReducer = pageSlice.reducer;

export const {setPage} = pageSlice.actions;
export default pageReducer;