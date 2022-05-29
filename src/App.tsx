import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import Trend from './routes/trend';
import Board from './routes/board';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='trend'>
          <Route index element={<Trend />} />
          <Route path=':id' element={<Board />} />
        </Route>
        <Route path='following' element={<div>Following</div>} />
      </Route>
      <Route path='login' element={<div>Login</div>} />
      <Route path='sign-up' element={<div>SignUp</div>} />
    </Routes>
  );
};

export default App;
