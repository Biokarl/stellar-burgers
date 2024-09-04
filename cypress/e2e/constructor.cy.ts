import { deleteCookie, setCookie } from '../../src/utils/cookie';

before(() => {
  //Создаем моковые токены авторизации
  setCookie('accessToken', 'accessToken');
  localStorage.setItem(
    'refreshToken',
    '24bac94e3f91b83ccd7ad414662ca4500d3a8b9e646fc7d5149dcace9db8139872300de7185a5536'
  );
});

after(() => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

describe('Проверка оформления заказа', () => {
  it('Проверяем страницу бургер конструктора', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4000/');

    //Перехватываем запрос на получение ингридиентов и заменяем ответ своими данными
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    });

    //Перехватываем запрос на получение данных пользователя
    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'authUser.json'
    });

    //Перехватываем запрос на создание заказа
    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    });

    //Проверка добавления ингридиентов в конструктор
    const bunAddButton = cy
      .get('[data-cy=643d69a5c3f7b9001cfa093c]>button')
      .contains('Добавить');
    const mainAddButton = cy
      .get('[data-cy=643d69a5c3f7b9001cfa0941]>button')
      .contains('Добавить');
    const sauceAddButton = cy
      .get('[data-cy=643d69a5c3f7b9001cfa0942]>button')
      .contains('Добавить');

    bunAddButton.click();
    mainAddButton.click();
    sauceAddButton.click();

    //Проверка закрытия модального окна
    const ingredientLink = cy.get('[data-cy=643d69a5c3f7b9001cfa0942]>a');

    ingredientLink.click();

    cy.get('body').click(0, 0);

    ingredientLink.click();

    let closeModalButton = cy.get('[data-cy=modal-close]');

    closeModalButton.click();

    //Проверка оформления заказа
    const confirmOrder = cy
      .get('[data-cy=burger-constructor]')
      .find('button')
      .contains('Оформить заказ');

    confirmOrder.click();

    const modalOrder = cy.get('[data-cy=modal]');

    modalOrder.should('be.visible');

    const orderNumber = cy.get('[data-cy=order-number]');

    orderNumber.should('have.text', '44829');

    closeModalButton = cy.get('[data-cy=modal-close]');

    closeModalButton.click();

    modalOrder.should('not.exist');

    const constructorEmptyElements = cy.get('[data-cy=constructor-empty]');

    constructorEmptyElements.should('have.length', 3);
  });
});
