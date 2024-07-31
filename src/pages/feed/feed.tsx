import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchFeedData,
//   selectFeedData,
//   selectOrdersLoading
// } from '../../redux/ordersSlice';
// import { Preloader } from '@ui';
// import { OrderCard } from '@components';

// const Feed = () => {
//   const dispatch = useDispatch();
//   const feedData = useSelector(selectFeedData);
//   const isLoading = useSelector(selectOrdersLoading);

//   useEffect(() => {
//     dispatch(fetchFeedData());
//   }, [dispatch]);

//   if (isLoading) {
//     return <Preloader />;
//   }

//   return (
//     <div>
//       {feedData && (
//         <>
//           <h2>Лента заказов</h2>
//           <p>Всего заказов: {feedData.total}</p>
//           <p>Выполнено за сегодня: {feedData.totalToday}</p>
//           {feedData.orders.map((order: any) => (
//             <OrderCard key={order._id} order={order} />
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default Feed;
