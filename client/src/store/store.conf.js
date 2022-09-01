import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./user.slice";
import brandReducer from "./brand.slice";
import typeReducer from "./type.slice";
import pageReducer from "./page.slice";
import visibleReducer from "./visible.slice";
import ordersReducer from "./orders.slice";
import {sneakerReducer} from "./sneaker.slice";
import basketReducer from "./basket.slice";

const store = configureStore({
    reducer: {
        userReducer,
        brandReducer,
        typeReducer,
        pageReducer,
        visibleReducer,
        ordersReducer,
        sneakerReducer,
        basketReducer
    }
})

export default store;