import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./user.slice";
import brandReducer from "./brand.slice";
import typeReducer from "./type.slice";
import pageReducer from "./page.slice";
import visibleReducer from "./visible.slice";
import ordersReducer from "./orders.slice";
import sneakersReducer from "./sneakers.slice";
import basketReducer from "./basket.slice";
import sizeReducer from "./size.slice";

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
        sizeReducer
    }
})

export default store;