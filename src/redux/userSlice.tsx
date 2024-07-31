import {
  PayloadAction,
  createAction,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';

type TUser = {
  id: string;
  title: string;
  author: string;
};

const addUser = createAction<TUser, 'ADD_USER'>('ADD_USER');
const removeUser = createAction<string, 'REMOVE_USER'>('REMOVE_USER');

type TUserWithKey = TUser & { key: string };

type TUsersState = {
  users: any;
};

const initialState: TUsersState = {
  users: {}
};

type TMoveParams = {
  from: number;
  to: number;
};
const moveUser = createAction<TMoveParams, 'MOVE_USER'>('MOVE_USER');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: {
      reducer: (state, action: PayloadAction<TUserWithKey>) => {
        state.users.push(action.payload);
      },
      prepare: (user: TUser) => {
        const key = nanoid();
        return { payload: { ...user, key } };
      }
    }
    // removeUser: (state, action: PayloadAction<string>) => {
    //   state.users = state.users.filter((b) => b.id !== action.payload);
    // }
  }
  //   selectors: {
  //     getUsers: (state) => state.users,
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(removeUser, (state, action) => {
  //     state.users.splice(
  //       action.payload.to,
  //       0,
  //       state.users.splice(action.payload.from, 1)[0]
  //     );
  //   })
  // }
});

// export const { getUsers } = userSlice.selectors;
