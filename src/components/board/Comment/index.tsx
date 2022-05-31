import cs from './comment.module.scss';
import ProfileCircle from '../../common/ProfileCircle';

const IMG_URL =
  'https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/160493273035082504.jpeg?gif=1&w=36&h=36&c=c';

interface Props {
  content: string;
}

const Comment = ({ content }: Props) => {
  return (
    <div className={cs.commentsWrapper}>
      <div className={cs.commentUserInfo}>
        <ProfileCircle url={IMG_URL} />
        <p>sund_home</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
