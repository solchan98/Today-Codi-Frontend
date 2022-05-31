import cs from './userNav.module.scss';
import { useAppSelector } from 'redux/store';

const UserNav = () => {
  const { profileImg } = useAppSelector((state) => state.user);
  return (
    <div className={cs.userNavWrapper}>
      <button
        className={cs.profile}
        style={{ width: '36px', height: '36px', backgroundImage: `url(${profileImg})` }}
        type='button'
        aria-label='profile_btn'
      />
      <button type='button'>글쓰기</button>
    </div>
  );
};

export default UserNav;
