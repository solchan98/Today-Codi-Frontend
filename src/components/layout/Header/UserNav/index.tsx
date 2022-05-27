import { NavLink } from 'react-router-dom';

import cs from './userNav.module.scss';

const UserNav = () => {
  return (
    <nav className={cs.userNavWrapper}>
      <NavLink className={cs.userNavLink} to='login'>
        로그인
      </NavLink>
      <NavLink className={cs.userNavLink} to='sign-up'>
        회원가입
      </NavLink>
    </nav>
  );
};

export default UserNav;
