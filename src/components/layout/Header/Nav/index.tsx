import { NavLink } from 'react-router-dom';
import cs from './nav.module.scss';

const Nav = () => {
  return (
    <nav className={cs.nav}>
      <NavLink to='/trend' className={(prop) => (prop.isActive ? cs.navLinkOn : cs.navLinkOff)}>
        트렌드
      </NavLink>
      <NavLink to='/following' className={(prop) => (prop.isActive ? cs.navLinkOn : cs.navLinkOff)}>
        팔로잉
      </NavLink>
    </nav>
  );
};

export default Nav;
