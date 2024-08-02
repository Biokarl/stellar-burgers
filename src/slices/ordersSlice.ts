// import { orderBurgerApi } from '../utils/burger-api';
import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TIngredientsState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TIngredientsState = {
  orderRequest: false,
  orderModalData: null
};

export const fetchOrders = createAsyncThunk(
  'orders/postOrderBurger',
  async (data: string[]) => {
    try {
      const res = await orderBurgerApi(data);
      return res;
    } catch (error) {
      throw new Error((error as { message: string }).message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    cleanSelectedOrder: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.orderRequest = false;
        // state.error = action.error.message || 'Произошла ошибка';
      });
  }
});

export const { cleanSelectedOrder } = orderSlice.actions;
export const reducer = orderSlice.reducer;
