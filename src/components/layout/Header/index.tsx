import cs from './header.module.scss';
import Nav from './Nav';
import SearchBar from './SearchBar';
import UserNav from './UserNav';
import Logo from '../../../assets/pngs/logo.png';

const Header = () => {
  return (
    <section className={cs.headerWrapper}>
      <div className={cs.wrapper}>
        <div className={cs.leftHeaderWrapper}>
          <img className={cs.logo} src={Logo} alt='main_logo' />
          <Nav />
        </div>
        <div className={cs.rightHeaderWrapper}>
          <SearchBar />
          <UserNav />
        </div>
      </div>
    </section>
  );
};

export default Header;
