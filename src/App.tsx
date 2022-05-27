import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<div>Main</div>} />
        <Route path='following' element={<div>Following</div>} />
      </Route>
      <Route path='login' element={<div>Login</div>} />
      <Route path='sign-up' element={<div>SignUp</div>} />
    </Routes>
  );
};

export default App;
