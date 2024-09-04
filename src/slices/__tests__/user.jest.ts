import {
  authChecked,
  reducer,
  initialState,
  checkAuthUser,
  loginUser,
  registerUser,
  updateUser
} from '../userSlice';

import { configureStore } from '@reduxjs/toolkit';

const expectedResult: typeof initialState = {
  isAuthCheck: true,
  user: {
    email: 'test@gmail.com',
    name: 'Artur'
  },
  isLoadingUser: false,
  orders: [],
  error: undefined
};

describe('Тест userSlice', () => {
  test('Проверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Тест reducer userSlice', () => {
    describe('Проверка экшенов аутентификации пользователя', () => {
      test('Ожидание аутентификации', () => {
        const state = reducer(
          initialState,
          checkAuthUser.pending('user/checkUser')
        );

        expect(state.isLoadingUser).toBe(true);
      });

      test('Успешная аутентификация', () => {
        const state = reducer(
          initialState,
          checkAuthUser.fulfilled(
            { success: true, user: expectedResult.user! },
            'user/checkUser'
          )
        );

        expect(state).toEqual({ ...expectedResult, isAuthCheck: false });
      });

      test('Неудачная аутентификация', () => {
        const state = reducer(
          initialState,
          checkAuthUser.rejected(
            { message: 'Неизвестная ошибка', name: 'Ошибка' },
            'user/checkUser'
          )
        );

        expect(state).toEqual({
          isAuthCheck: false,
          user: null,
          isLoadingUser: false,
          orders: [],
          error: 'Неизвестная ошибка'
        });
      });
    });

    describe('Проверка экшенов регистрации нового пользователя', () => {
      test('Ожидание регистрации', () => {
        const state = reducer(
          initialState,
          registerUser.pending('user/registerUser', {
            name: 'Artur',
            email: 'test@gmail.com',
            password: 'qwerty'
          })
        );

        expect(state.isLoadingUser).toBe(true);
      });

      test('Успешной регистрация', () => {
        const state = reducer(
          initialState,
          registerUser.fulfilled(
            {
              success: true,
              refreshToken: '123',
              accessToken: '456',
              user: expectedResult.user!
            },
            'user/registerUser',
            {
              name: 'Artur',
              email: 'test@gmail.com',
              password: 'qwerty'
            }
          )
        );

        expect(state).toEqual({ ...expectedResult, isAuthCheck: false });
      });

      test('Неудачной регистрация', () => {
        const state = reducer(
          initialState,
          registerUser.rejected(
            { message: 'Неизвестная ошибка', name: 'Ошибка' },
            'user/registerUser',
            {
              name: 'Artur',
              email: 'test@gmail.com',
              password: 'qwerty'
            }
          )
        );

        expect(state).toEqual({
          isAuthCheck: false,
          user: null,
          isLoadingUser: false,
          orders: [],
          error: 'Неизвестная ошибка'
        });
      });
    });

    describe('Проверка экшенов входа пользователя в профиль', () => {
      test('Ожидание входа в профиль', () => {
        const state = reducer(
          initialState,
          loginUser.pending('user/loginUser', {
            email: 'test@gmail.com',
            password: 'qwerty'
          })
        );

        expect(state.isLoadingUser).toBe(true);
      });

      test('Успешный вход в профиль', () => {
        const state = reducer(
          initialState,
          loginUser.fulfilled(
            {
              success: true,
              refreshToken: '123',
              accessToken: '456',
              user: expectedResult.user!
            },
            'user/loginUser',
            {
              email: 'test@gmail.com',
              password: 'qwerty'
            }
          )
        );

        expect(state).toEqual({ ...expectedResult, isAuthCheck: false });
      });

      test('Неудачный вход в профиль', () => {
        const state = reducer(
          initialState,
          loginUser.rejected(
            { message: 'Неизвестная ошибка', name: 'Ошибка' },
            'user/loginUser',
            {
              email: 'test@gmail.com',
              password: 'qwerty'
            }
          )
        );

        expect(state).toEqual({
          isAuthCheck: false,
          user: null,
          isLoadingUser: false,
          orders: [],
          error: 'Неизвестная ошибка'
        });
      });
    });

    describe('Проверка экшенов обновления информации о пользователе', () => {
      test('Ожидание обновления', () => {
        const state = reducer(
          initialState,
          updateUser.pending('user/loginUser', {
            name: 'Artur',
            email: 'test@gmail.com',
            password: 'qwerty'
          })
        );

        expect(state.isLoadingUser).toBe(true);
      });

      test('Успешное обновление', () => {
        const state = reducer(
          initialState,
          updateUser.fulfilled(
            {
              success: true,
              user: expectedResult.user!
            },
            'user/loginUser',
            {
              name: 'Artur',
              email: 'test@gmail.com',
              password: 'qwerty'
            }
          )
        );

        expect(state).toEqual({ ...expectedResult, isAuthCheck: false });
      });

      test('ПНеудачное обновление', () => {
        const state = reducer(
          initialState,
          updateUser.rejected(
            { message: 'Неизвестная ошибка', name: 'Ошибка' },
            'user/loginUser',
            {
              name: 'Artur',
              email: 'test@gmail.com',
              password: 'qwerty'
            }
          )
        );

        expect(state).toEqual({
          isAuthCheck: false,
          user: null,
          isLoadingUser: false,
          orders: [],
          error: 'Неизвестная ошибка'
        });
      });
    });

    describe('Проверка экшенов для работы с данными пользователя', () => {
      test('Переключение флага аутентификации', () => {
        const userStore = configureStore({
          reducer: reducer,
          preloadedState: initialState
        });

        userStore.dispatch(authChecked());

        expect(userStore.getState()).toEqual({
          ...initialState,
          isAuthCheck: true
        });
      });
    });
  });
});
