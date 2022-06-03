import cs from './profileCircle.module.scss';

interface Props {
  url: string;
}

const DEFAULT_IMG_URL =
  'https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?w=72&h=72&c=c';

const ProfileCircle = ({ url }: Props) => {
  // TODO: 클릭 시, 해당 유저의 프로필로 이동하기
  return (
    <button
      style={{ backgroundImage: `url(${url ?? DEFAULT_IMG_URL})` }}
      className={cs.profileCircle}
      type='button'
      aria-label='profile_img'
    />
  );
};

export default ProfileCircle;
