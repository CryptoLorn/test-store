import {createSlice} from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: 'pageSlice',
    initialState: {
        page: 1,
        // totalCount: 0
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        // setTotalCount: (state, action) => {
        //     state.totalCount = action.payload
        // }
    }
})

const pageReducer = pageSlice.reducer;

export const {setPage, setTotalCount} = pageSlice.actions;
export default pageReducer;