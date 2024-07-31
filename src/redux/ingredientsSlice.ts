import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isIngredientsLoading: boolean;
  buns: Array<TIngredient>;
  mains: Array<TIngredient>;
  sauces: Array<TIngredient>;
};

const initialState: TIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isIngredientsLoading: false
};

type TIngredientWithKey = TIngredient & { key: string };

type TMoveParams = {
  from: number;
  to: number;
};
const moveIngredient = createAction<TMoveParams, 'MOVE_INGREDIENT'>(
  'MOVE_INGREDIENT'
);

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
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredientWithKey>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, key } };
      }
    },
    removeIngredient: (state, action: any) => {
      state.ingredients = state.ingredients.filter((b) => b._id !== action.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        // state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        const ingredients: { [key in TIngredient['type']]: TIngredient[] } = {
          bun: [],
          main: [],
          sauce: []
        };

        action.payload.forEach((item) => {
          ingredients[item.type] = [...ingredients[item.type], item];
        });
        state.buns = ingredients.bun;
        state.mains = ingredients.main;
        state.sauces = ingredients.sauce;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        // state.error = action.error.message || 'Произошла ошибка';
      });
  }
});

export const { addIngredient } = ingredientSlice.actions;
export const reducer = ingredientSlice.reducer;

// =====================================================================

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getIngredientsApi } from '../utils/burger-api';
// import { TIngredient } from '../utils/types';
// import { RootState } from '../services/store';

// type IngredientsState = {
//   items: TIngredient[];
//   isLoading: boolean;
//   error: string | null;
// };

// const initialState: IngredientsState = {
//   items: [],
//   isLoading: false,
//   error: null
// };

// export const fetchIngredients = createAsyncThunk(
//   'ingredients/fetchIngredients',
//   async () => {
//     try {
//       const data = await getIngredientsApi();
//       return data;
//     } catch (error) {
//       throw new Error((error as { message: string }).message);
//     }
//   }
// );

// export const ingredientsSlice = createSlice({
//   name: 'ingredients',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchIngredients.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchIngredients.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchIngredients.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Произошла ошибка';
//       });
//   }
// });

// export const selectIngredients = (state: RootState) => state.ingredients.items;
// export const selectIngredientsLoading = (state: RootState) =>
//   state.ingredients.isLoading;
// export const selectIngredientsError = (state: RootState) =>
//   state.ingredients.error;
