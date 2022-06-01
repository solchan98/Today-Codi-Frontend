import cs from './comment.module.scss';
import ProfileCircle from '../../common/ProfileCircle';

const DEFAULT_IMG_URL =
  'https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?w=72&h=72&c=c';

interface Props {
  nickname: string;
  profileImg: string | null;
  content: string;
}

const Comment = ({ nickname, profileImg, content }: Props) => {
  return (
    <div className={cs.commentsWrapper}>
      <div className={cs.commentUserInfo}>
        <ProfileCircle url={profileImg ?? DEFAULT_IMG_URL} />
        <p>{nickname}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
