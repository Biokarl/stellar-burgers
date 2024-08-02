import {
  ActionCreatorWithPayload,
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => ({
        payload: { ...item, id: nanoid() }
      })
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (e) => e.id !== action.payload.id
      );
    },
    moveUpIngredient: ({ ingredients }, { payload }: PayloadAction<number>) => {
      [ingredients[payload - 1], ingredients[payload]] = [
        ingredients[payload],
        ingredients[payload - 1]
      ];
    },
    moveDownIngredient: (
      { ingredients },
      { payload }: PayloadAction<number>
    ) => {
      [ingredients[payload + 1], ingredients[payload]] = [
        ingredients[payload],
        ingredients[payload + 1]
      ];
    },
    cleanSelectedIngredient: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  cleanSelectedIngredient
} = burgerConstructorSlice.actions;

export const reducer = burgerConstructorSlice.reducer;
