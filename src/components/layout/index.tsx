import { Outlet } from 'react-router-dom';

import cs from './layout.module.scss';
import Header from './Header';

const Layout = () => {
  return (
    <div className={cs.layoutWrapper}>
      <Header />
      LayOut
      <Outlet />
    </div>
  );
};

export default Layout;
