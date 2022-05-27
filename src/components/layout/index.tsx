import { Outlet } from 'react-router-dom';

import cs from './layout.module.scss';
import Header from './Header';

const Layout = () => {
  return (
    <div className={cs.layoutWrapper}>
      <div className={cs.headerWrapper}>
        <Header />
      </div>
      <div className={cs.bodyWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
