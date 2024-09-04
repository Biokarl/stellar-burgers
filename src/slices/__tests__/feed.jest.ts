import { reducer, getFeeds, feedSlice, initialState } from '../feedSlice';

const expectedResult: typeof initialState = {
  orders: [
    {
      _id: '6680e12d856777001bb1ebc4',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-06-30T04:38:05.274Z',
      updatedAt: '2024-06-30T04:38:05.741Z',
      number: 44694
    },
    {
      _id: '6680e101856777001bb1ebc2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-06-30T04:37:21.607Z',
      updatedAt: '2024-06-30T04:37:22.005Z',
      number: 44693
    }
  ],
  order: null,
  total: 44368,
  totalToday: 38,
  isLoading: false,
  error: undefined
};

describe('Тест feedSlice', () => {
  test('Проверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Тест reducer feedSlice', () => {
    test('Проверка экшена ожидания запроса на получение ленты заказов', () => {
      const state = feedSlice.reducer(
        initialState,
        getFeeds.pending('feed/getAll')
      );

      expect(state.isLoading).toBe(true);
    });

    test('Проверка экшена успешного получения ленты заказов', () => {
      const state = feedSlice.reducer(
        initialState,
        getFeeds.fulfilled({ success: true, ...expectedResult }, 'feed/getAll')
      );

      expect(state).toEqual(expectedResult);
    });

    test('Проверка экшена неудачного получения ленты заказов', () => {
      const state = feedSlice.reducer(
        initialState,
        getFeeds.rejected(
          { message: 'Неизвестная ошибка', name: 'Ошибка' },
          'feed/getAll'
        )
      );

      expect(state).toEqual({
        orders: [],
        order: null,
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: 'Неизвестная ошибка'
      });
    });
  });
});
