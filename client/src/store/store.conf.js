import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./user.slice";
import brandReducer from "./brand.slice";
import typeReducer from "./type.slice";
import pageReducer from "./page.slice";
import visibleReducer from "./visible.slice";
import ordersReducer from "./orders.slice";
import sneakersReducer from "./sneakers.slice";
import basketReducer from "./basket.slice";
import analyticsReducer from "./analytics.slice";

const store = configureStore({
    reducer: {
        userReducer,
        brandReducer,
        typeReducer,
        pageReducer,
        visibleReducer,
        ordersReducer,
        sneakersReducer,
        basketReducer,
        analyticsReducer
    }
})

export default store;