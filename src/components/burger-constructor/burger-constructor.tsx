import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { cleanSelectedOrder, fetchOrders } from '../../slices/ordersSlice';
import { cleanSelectedIngredient } from '../../slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const { bun, ingredients } = useSelector(
    (store) => store['burger-constructor']
  );
  const { orderModalData, orderRequest } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const data = bun?._id ? [...ingredients.map((el) => el._id), bun?._id] : [];

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(fetchOrders(data));
  };

  const closeOrderModal = () => {
    dispatch(cleanSelectedIngredient());
    dispatch(cleanSelectedOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
