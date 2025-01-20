import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  order: TOrder | null;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: FeedState = {
  orders: [],
  order: null,
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
};

export const getFeeds = createAsyncThunk('feed/getAll', async () => {
  const data = await getFeedsApi();
  return data;
});

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (data: number) => {
    const res = await getOrderByNumberApi(data);
    return res;
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    orders: (state: FeedState, action) => {
      state.orders = action.payload;
    },
    total: (state: FeedState, action) => {
      state.total = action.payload;
    },
    totalToday: (state: FeedState, action) => {
      state.totalToday = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          state.error = undefined;
        }
      )
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    orderSelector: (state) => state.order
  }
});

export const { orderSelector } = feedSlice.selectors;
export const { orders, total, totalToday } = feedSlice.actions;
export const reducer = feedSlice.reducer;
