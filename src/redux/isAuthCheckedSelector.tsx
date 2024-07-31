// import { createAction, createReducer } from '@reduxjs/toolkit';

// type TIngredient = {
//   id: string;
//   title: string;
//   author: string;
// };

// const addIngredient = createAction<TIngredient, 'ADD_INGREDIENT'>(
//   'ADD_INGREDIENT'
// );
// const removeIngredient = createAction<string, 'REMOVE_INGREDIENT'>(
//   'REMOVE_INGREDIENT'
// );

// type TUserState = {
//     user: any;
// };

// const initialState: TUserState = {
//   user: {}
// };

// export const isAuthCheckedSelector = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addIngredient, (state, action) => {
//       state.user.push(action.payload);
//     })
//     .addCase(removeIngredient, (state, action) => {
//       state.user = state.user.filter(
//         (b) => b.id !== action.payload
//       );
//     });
// });
