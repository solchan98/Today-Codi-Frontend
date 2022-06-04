import { Outlet } from 'react-router-dom';

import logo from 'assets/pngs/logo.png';
import cs from './authWrapper.module.scss';

const AuthWrapper = () => {
  return (
    <div>
      <div className={cs.authWrapper}>
        <div className={cs.authHeader}>
          <img src={logo} alt='logo_img' />
          <span>오늘의 코디</span>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
      <footer className={cs.authFooter}>Copyright 2022. OFASHION all rights reserved.</footer>
    </div>
  );
};

export default AuthWrapper;
