import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/store';

import cs from './userNav.module.scss';
import { DEFAULT_IMG_URL } from 'constant/base';
import { initUser } from '../../../../redux/store/slices/userSlice';

const UserNav = () => {
  const { profileImg } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const onClick = () => {
    nav('/new-post');
  };

  const onClickProfile = () => {
    dispatch(initUser());
  };

  return (
    <div className={cs.userNavWrapper}>
      <button
        className={cs.profile}
        style={{ width: '36px', height: '36px', backgroundImage: `url(${profileImg ?? DEFAULT_IMG_URL})` }}
        type='button'
        aria-label='profile_btn'
        onClick={onClickProfile}
      />
      <button type='button' onClick={onClick}>
        글쓰기
      </button>
    </div>
  );
};

export default UserNav;
