import cs from './profileCircle.module.scss';
import { DEFAULT_IMG_URL } from 'constant/base';
import { MouseEventHandler } from 'react';

interface Props {
  url: string;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
}

const ProfileCircle = ({ url, onClickHandler }: Props) => {
  // TODO: 클릭 시, 해당 유저의 프로필로 이동하기
  return (
    <button
      style={{ backgroundImage: `url(${url ?? DEFAULT_IMG_URL})` }}
      className={cs.profileCircle}
      type='button'
      aria-label='profile_img'
      onClick={onClickHandler}
    />
  );
};

export default ProfileCircle;
