import {createReducer} from "@reduxjs/toolkit";
import {Product} from "./product";
import {User} from "./user";
import {loadOrders} from "../thunks/order";

export type StatusOrder = 'Создан' | 'Отправлен' | 'Доставлен';

export interface Order {
    id: number;
    status: StatusOrder;
    quantity: number;
    summary: number;
    productId: number;
    product: Product;
    ownerId: number;
    owner: User;
    createdAt: Date;
}

interface InitialState {
    orders: Order[];
}

const INITIAL_STATE: InitialState = {
    orders: []
}

export const orderReducer = createReducer(INITIAL_STATE, ({ addCase }) => {
    addCase(loadOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
    })
})