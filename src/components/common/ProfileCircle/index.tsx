import cs from './profileCircle.module.scss';

interface Props {
  url: string;
}

const ProfileCircle = ({ url }: Props) => {
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
