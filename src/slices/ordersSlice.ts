import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
};

const initialState: TOrdersState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
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

export const getOrders = createAsyncThunk('orders/getOrderBurger', async () => {
  try {
    const res = await getOrdersApi();
    return res;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
});

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
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(getOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrders.fulfilled, (state) => {
        state.orderRequest = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });
  }
});

export const { cleanSelectedOrder } = orderSlice.actions;
export const reducer = orderSlice.reducer;
