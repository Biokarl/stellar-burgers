import { reducer, initialState, fetchOrders, orderSlice } from '../ordersSlice';

import { configureStore } from '@reduxjs/toolkit';

const expectedResult: typeof initialState = {
  orderModalData: {
    _id: '66830351856777001bb1efe6',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-07-01T19:28:17.462Z',
    updatedAt: '2024-07-01T19:28:17.853Z',
    number: 44752
  },
  orderRequest: false,
  error: null
};

describe('Тест orderSlice', () => {
  test('Проверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Проверка extraReducers', () => {
    describe(' Проверка запроса fetchOrders', () => {
      test('Тест pending', () => {
        const action = { type: fetchOrders.pending.type };
        const state = reducer(initialState, action);
        expect(state.orderRequest).toBe(true);
      });

      test('Проверка экшена неудачного получения списка заказов', () => {
        const action = {
          type: fetchOrders.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = reducer(initialState, action);
        expect(state.orderRequest).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      test('Проверка экшена успешного получения списка заказов', () => {
        const orderResponse = expectedResult.orderModalData;

        const action = {
          type: fetchOrders.fulfilled.type,
          payload: {
            order: orderResponse
          }
        };
        const state = reducer(initialState, action);

        expect(state.orderRequest).toBe(false);
        expect(state.orderModalData).toEqual(orderResponse);
      });
    });
  });

  describe('Проверка cleanSelectedOrder', () => {
    let store: any;

    beforeEach(() => {
      store = configureStore({ reducer });
    });

    test('Очистка заказа, перевод состояния загрузки в false', () => {
      store.dispatch(orderSlice.actions.cleanSelectedOrder());
      const newState = store.getState();

      expect(newState.orderModalData).toBeNull();
      expect(newState.isOrderLoading).toBeFalsy();
    });
  });
});
