import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feed.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [orders]);
  return <ProfileOrdersUI orders={orders} />;
};
