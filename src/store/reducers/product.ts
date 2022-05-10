import {createReducer} from "@reduxjs/toolkit";
import {loadProducts} from "../thunks/product";

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
}

interface InitialState {
    products: Product[];
}

const INITIAL_STATE: InitialState = {
    products: []
}

export const productReducer = createReducer(INITIAL_STATE, ({ addCase }) => {
    addCase(loadProducts.fulfilled, (state, action) => {
        state.products = action.payload;
    })
})