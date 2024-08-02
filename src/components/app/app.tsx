import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { fetchOrders } from '../../slices/ordersSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />

        <Routes location={background}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile'>
            <Route index element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />} />
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title={''} onClose={onClose}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингредиента'} onClose={onClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title={''} onClose={onClose}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
