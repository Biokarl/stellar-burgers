import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '../utils/burger-api';
import { TOrder, TOrdersData } from '../utils/types';
import { RootState } from '../services/store';

type OrdersState = {
  items: TOrder[];
  feedData: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OrdersState = {
  items: [],
  feedData: null,
  isLoading: false,
  error: null
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const data = await getOrdersApi();
    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
});

export const fetchFeedData = createAsyncThunk(
  'orders/fetchFeedData',
  async () => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      throw new Error((error as { message: string }).message);
    }
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(fetchFeedData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedData = action.payload;
      })
      .addCase(fetchFeedData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  }
});

export const selectOrders = (state: { orders: OrdersState }) =>
  state.orders.items;
export const selectFeedData = (state: { orders: OrdersState }) =>
  state.orders.feedData;
export const selectOrdersLoading = (state: { orders: OrdersState }) =>
  state.orders.isLoading;
export const selectOrdersError = (state: { orders: OrdersState }) =>
  state.orders.error;
