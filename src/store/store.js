import {configureStore} from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import productReducer from "./productSlice";


const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        product: productReducer,
    }
});

export default store;