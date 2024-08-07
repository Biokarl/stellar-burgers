import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthCheck: boolean;
  isLoadingUser: boolean;
  error: string | undefined;
};

const initialState: TUserState = {
  user: null,
  isAuthCheck: false,
  isLoadingUser: false,
  error: undefined
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    try {
      const res = await loginUserApi(data);
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    } catch (error) {
      throw new Error((error as { message: string }).message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    try {
      const res = await registerUserApi(data);
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    } catch (error) {
      throw new Error((error as { message: string }).message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => {
    try {
      const res = await updateUserApi(user);
      return res;
    } catch (error) {
      throw new Error((error as { message: string }).message);
    }
  }
);

export const checkAuthUser = createAsyncThunk('user/check', async () => {
  try {
    const res = await getUserApi();
    return res;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    const res = await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return res;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
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
      });
  }
});

export const reducer = userSlice.reducer;
export const { authChecked } = userSlice.actions;
