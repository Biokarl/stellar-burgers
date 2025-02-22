import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { reducer as ingredientReducer } from '../slices/ingredientsSlice';
import { reducer as burgerConstructorSlice } from '../slices/burgerConstructorSlice';
import { reducer as orderSlice } from '../slices/ordersSlice';
import { reducer as userSlice } from '../slices/userSlice';
import { reducer as feedSlice } from '../slices/feedSlice';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  'burger-constructor': burgerConstructorSlice,
  order: orderSlice,
  user: userSlice,
  feed: feedSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
