import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../../axios";
import {Order, StatusOrder} from "../reducers/order";
import {RootThunkConfig} from "../index";


export const loadOrders = createAsyncThunk<Order[], number>(
    'LOAD_ORDERS',
    async (ownerId: number) => {
        const response = await $api.get(`/orders/by/${ownerId}`)
        return response.data
    }
)

interface CreateOrderBody {
    productId: number;
    quantity: number;
    ownerId: number;
}

export const createOrder = createAsyncThunk<Order, CreateOrderBody, RootThunkConfig>(
    'CREATE_ORDER',
    async (body, thunk) => {
        const response = await $api.post(`/orders/${body.ownerId}`, {
            productId: body.productId,
            quantity: body.quantity
        });
        thunk.dispatch(loadOrders(body.ownerId))
        return response.data;
    }
)

export const deleteOrder = createAsyncThunk<void, number, RootThunkConfig>(
    'DELETE_ORDER',
    async (id, thunk) => {
        await $api.delete(`/orders/${id}`)
        const ownerId = thunk.getState().user.user?.id
        if (ownerId) {
            thunk.dispatch(loadOrders(ownerId))
        }
    }
)

interface UpdateOrderBody {
    productId: number;
    quantity: number;
    status: StatusOrder;
}

interface UpdateOrderProps {
    body: UpdateOrderBody;
    id: number;
}

export const updateOrder = createAsyncThunk<void, UpdateOrderProps, RootThunkConfig>(
    'UPDATE_ORDER',
    async (props, thunk) => {
        await $api.put(`/orders/${props.id}`, props.body)
        const ownerId = thunk.getState().user.user?.id
        if (ownerId) {
            thunk.dispatch(loadOrders(ownerId))
        }
    }
)