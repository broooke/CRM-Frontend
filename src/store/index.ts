import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers';
import {Selector, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: rootReducer,
    /*middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
              serializableCheck: false
          })*/
});

export type RootDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export type RootThunkConfig = { state: RootState; dispatch: RootDispatch };

export type RootThunk = { getState: () => RootState; dispatch: RootDispatch };

export const useAppDispatch = (): RootDispatch => {
    return useDispatch<RootDispatch>();
};

export function useAppSelector<T>(selector: Selector<RootState, T>): T {
    return useSelector<RootState, T>(selector);
}