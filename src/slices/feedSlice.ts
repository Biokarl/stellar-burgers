import { getFeedsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { stat } from 'fs';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  // error: string | undefined;
}

export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
  // error: undefined
};

export const getFeeds = createAsyncThunk('feed/getAll', async () => {
  try {
    const data = await getFeedsApi();
    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    orders: (state: FeedState, action) => {
      state.orders = action.payload;
    },
    order: (state: FeedState, action) => {
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
        // state.error = action.error.message;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          // state.error = undefined;
        }
      );
  }
});

export const { orders, total, totalToday, order } = feedSlice.actions;
export const reducer = feedSlice.reducer;
