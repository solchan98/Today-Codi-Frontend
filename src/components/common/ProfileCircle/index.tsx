import cs from './profileCircle.module.scss';

interface Props {
  url: string;
}

const ProfileCircle = ({ url }: Props) => {
  // TODO: 클릭 시, 해당 유저의 프로필로 이동하기
  return (
    <button
      style={{ backgroundImage: `url(${url})` }}
      className={cs.profileCircle}
      type='button'
      aria-label='profile_img'
    />
  );
};

export default ProfileCircle;
