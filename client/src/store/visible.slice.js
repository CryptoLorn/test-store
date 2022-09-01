import {createSlice} from "@reduxjs/toolkit";

const visibleSlice = createSlice({
    name: 'visibleSlice',
    initialState: {
        loginVisible: false,
        registrationVisible: false
    },
    reducers: {
        setLoginVisible: (state, action) => {
            state.loginVisible = action.payload
        },
        setRegistrationVisible: (state, action) => {
            state.registrationVisible = action.payload
        }
    },
})

const visibleReducer = visibleSlice.reducer;

export const {setLoginVisible, setRegistrationVisible} = visibleSlice.actions;
export default visibleReducer;