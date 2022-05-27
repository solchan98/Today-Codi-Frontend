import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import Trend from './routes/trend';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Trend />} />
        <Route path='following' element={<div>Following</div>} />
      </Route>
      <Route path='login' element={<div>Login</div>} />
      <Route path='sign-up' element={<div>SignUp</div>} />
    </Routes>
  );
};

export default App;
