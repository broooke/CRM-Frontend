import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product} from "../reducers/product";
import $api from "../../axios";

export const loadProducts = createAsyncThunk<Product[]>(
    'LOAD_PRODUCTS',
    async () => {
        const response = await $api.get('/products')
        return response.data
    }
)