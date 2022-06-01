import cs from './userNav.module.scss';
import { useAppSelector } from 'redux/store';

const DEFAULT_IMG_URL =
  'https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?w=72&h=72&c=c';

const UserNav = () => {
  const { profileImg } = useAppSelector((state) => state.user);
  return (
    <div className={cs.userNavWrapper}>
      <button
        className={cs.profile}
        style={{ width: '36px', height: '36px', backgroundImage: `url(${profileImg ?? DEFAULT_IMG_URL})` }}
        type='button'
        aria-label='profile_btn'
      />
      <button type='button'>글쓰기</button>
    </div>
  );
};

export default UserNav;
