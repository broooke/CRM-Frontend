import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "./user";
import {productReducer} from "./product";
import {orderReducer} from "./order";


export const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    order: orderReducer,
})