import React from 'react';
import store from 'store';
import { useMount } from 'react-use';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Layout from './components/layout';
import Trend from './routes/trend';
import Board from './routes/board';
import Login from './routes/login';
import { useAppDispatch, useAppSelector } from './redux/store';
import { getUserInfo } from './redux/thunk/userThunk';

const App = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useMount(() => {
    const accessToken = store.get('accessToken');
    if (!isLoggedIn && accessToken) {
      dispatch(getUserInfo(accessToken));
    }
  });

  return (
    <Routes>
      <Route index element={!isLoggedIn ? <div>Index Page!!!</div> : <Navigate to='/trend' />} />
      <Route path='sign-up' element={!isLoggedIn ? <div>SignUp</div> : <Navigate to='/trend' />} />
      <Route path='login/*' element={!isLoggedIn ? <Login /> : <Navigate to='/trend' />} />
      <Route element={isLoggedIn ? <Layout /> : <Navigate to='/login' />}>
        <Route path='trend'>
          <Route index element={<Trend />} />
          <Route path='post' element={<Board />} />
        </Route>
        <Route path='following' element={<div>Following</div>} />
      </Route>
    </Routes>
  );
};

export default App;
