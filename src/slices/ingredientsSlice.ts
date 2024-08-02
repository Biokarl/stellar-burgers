import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error) {
      throw new Error((error as { message: string }).message);
    }
  }
);

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        // state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        // state.error = action.error.message || 'Произошла ошибка';
      });
  }
});

export const reducer = ingredientSlice.reducer;
