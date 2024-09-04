import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../utils/burger-api';
import { deleteCookie, setCookie } from '../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthCheck: boolean;
  isLoadingUser: boolean;
  orders: TOrder[];
  error: string | undefined;
};

export const initialState: TUserState = {
  user: null,
  isAuthCheck: false,
  isLoadingUser: false,
  orders: [],
  error: undefined
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const getOrders = createAsyncThunk('orders/getOrderBurger', async () => {
  const res = await getOrdersApi();
  return res;
});

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => {
    const res = await updateUserApi(user);
    return res;
  }
);

export const checkAuthUser = createAsyncThunk('user/check', async () => {
  const res = await getUserApi();
  return res;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const res = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return res;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthCheck = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoadingUser = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoadingUser = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(checkAuthUser.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoadingUser = false;
      })
      .addCase(checkAuthUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoadingUser = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoadingUser = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.error.message;
      });
  }
});

export const reducer = userSlice.reducer;
export const { authChecked } = userSlice.actions;
