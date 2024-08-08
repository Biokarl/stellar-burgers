import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../slices/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.user.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [orders]);
  return <ProfileOrdersUI orders={orders} />;
};
