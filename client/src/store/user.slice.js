import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        isAuth: null,
        status: null,
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        }
    }
})

const userReducer = userSlice.reducer;

export const {setUser, setIsAuth} = userSlice.actions;
export default userReducer;