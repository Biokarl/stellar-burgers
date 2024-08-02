// import { Preloader } from '@ui';
// import { Navigate, useLocation } from 'react-router-dom';
// import { userSelectors } from '../../services/slices/userSlice';
// import { useSelector } from '../../services/store';

// type ProtectedRouteProps = {
//   children: React.ReactElement;
//   onlyUnAuth?: boolean;
// };

// export const ProtectedRoute = ({
//   children,
//   onlyUnAuth
// }: ProtectedRouteProps) => {
//   const isAuthChecked = useSelector(userSelectors.selectorIsUserChecked);
//   const user = useSelector(userSelectors.selectorUserData);
//   const location = useLocation();

//   if (!isAuthChecked) {
//     return <Preloader />;
//   }

//   if (!onlyUnAuth && !user) {
//     return <Navigate replace to='/login' state={{ from: location }} />;
//   }

//   if (onlyUnAuth && user) {
//     const from = location.state?.from || { pathname: '/' };

//     return <Navigate replace to={from} />;
//   }

//   return children;
// };
