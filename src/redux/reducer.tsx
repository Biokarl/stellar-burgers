import { createAction, createReducer } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

//  type TIngredient = {
//   id: string;
//   title: string;
//   author: string;
// };

const addIngredient = createAction<TIngredient, 'ADD_INGREDIENT'>(
  'ADD_INGREDIENT'
);
const removeIngredient = createAction<string, 'REMOVE_INGREDIENT'>(
  'REMOVE_INGREDIENT'
);

type TIngredientState = {
  ingredients: Array<TIngredient>;
};

const initialState: TIngredientState = {
  ingredients: []
};

export const liveTableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addIngredient, (state, action) => {
      state.ingredients.push(action.payload);
    })
    .addCase(removeIngredient, (state, action) => {
      state.ingredients = state.ingredients.filter(
        (b) => b._id !== action.payload
      );
    });
});
