import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from 'src/redux/userSlice';
import { liveTableReducer } from 'src/redux/reducer';
import { reducer as ingredientReducer } from '../redux/ingredientsSlice';
import { selectOrders } from '../redux/ordersSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import { ingredientsSlice } from '../redux/ingredientsSlice';
// import { ordersSlice } from '../redux/ordersSlice';

// const rootReducer = {
//   ingredients: ingredientsSlice.reducer,
//   orders: ordersSlice.reducer
// };

// const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== 'production'
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
