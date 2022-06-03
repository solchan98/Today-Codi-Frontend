import cs from './comment.module.scss';
import ProfileCircle from '../../common/ProfileCircle';

interface Props {
  nickname: string;
  profileImg: string;
  content: string;
}

const Comment = ({ nickname, profileImg, content }: Props) => {
  return (
    <div className={cs.commentsWrapper}>
      <div className={cs.commentUserInfo}>
        <ProfileCircle url={profileImg} />
        <p>{nickname}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
